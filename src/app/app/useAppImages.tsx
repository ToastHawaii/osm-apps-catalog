import { isImage } from "@lib/utils/isImage";
import { setWidthOnMediaWikiUrls } from "@app/ui/lib/addWidthToMediaWikiUrls";
import { isLikelyLogo } from "@lib/utils/isLikelyLogo";
import { App } from "@shared/data/App";
import { chain } from "lodash";
import { useState, useEffect } from "react";

const CommonsThumbnailWidth = 1280;

function toCommonsSpecialFilePath(title: string) {
  const fileName = title.replace(/^File:/i, "").replace(/ /g, "_");

  return (
    "https://commons.wikimedia.org/wiki/Special:FilePath/" +
    encodeURIComponent(fileName) +
    `?width=${CommonsThumbnailWidth}`
  );
}

export function useAppImages(app: App) {
  const [images, setImages] = useState<string[]>([]);

  async function processImages(imageUrls: string[]) {
    const validImages = await Promise.all(
      imageUrls.map(async (image) => {
        try {
          const file = await isImage(image);

          if (!file || file.width < 50 || file.height < 50) {
            return undefined;
          }

          return image;
        } catch {
          return undefined;
        }
      }),
    );

    setImages((currentImages) =>
      chain([
        ...currentImages,
        ...validImages.filter((image): image is string => !!image),
      ])
        .uniqBy((i) =>
          i
            .substring(i.lastIndexOf("/") + 1)
            .replaceAll("%20", " ")
            .replaceAll("_", " ")
            .replaceAll("-", " "),
        )
        .value(),
    );
  }

  useEffect(() => {
    processImages(
      setWidthOnMediaWikiUrls(
        app.images.filter((i) => !isLikelyLogo(i)),
        1280,
      ),
    );
  }, [app.images]);

  // Load Wikimedia Commons images
  useEffect(() => {
    let cancelled = false;

    (async function () {
      if (!app.commons || app.commons.length === 0) {
        return;
      }

      const commonsImages = (
        await Promise.all(
          app.commons.map(async (c) => {
            // Find subcategory containing screenshots
            const categoryParams = new URLSearchParams({
              action: "query",
              format: "json",
              list: "categorymembers",
              cmtitle: `Category:${c}`,
              cmtype: "subcat",
              cmlimit: "max",
              origin: "*",
            });

            const categoryResponse = await fetch(
              `https://commons.wikimedia.org/w/api.php?${categoryParams}`,
            );

            const categoryData = await categoryResponse.json();

            const category = categoryData.query?.categorymembers?.find(
              (m: any) => m.title.toUpperCase().includes("SCREENSHOT"),
            )?.title;

            // Load files from screenshot subcategory or original category
            const fileParams = new URLSearchParams({
              action: "query",
              format: "json",
              generator: "categorymembers",
              gcmtitle: category || `Category:${c}`,
              gcmlimit: "8",
              gcmtype: "file",
              prop: "imageinfo",
              iiprop: "url",
              origin: "*",
            });

            const fileResponse = await fetch(
              `https://commons.wikimedia.org/w/api.php?${fileParams}`,
            );

            const fileData = await fileResponse.json();

            return Object.values(fileData.query?.pages || {}).map((page: any) =>
              toCommonsSpecialFilePath(page.title),
            );
          }),
        )
      )
        .flat()
        .filter((url) => !isLikelyLogo(url));

      if (!cancelled) {
        await processImages(commonsImages);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [app.commons]);

  return images;
}
