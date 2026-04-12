import { isImage } from "@app/ui/components/LazyImage";
import { isLikelyLogo } from "@lib/utils/isLikelyLogo";
import { App } from "@shared/data/App";
import { chain } from "lodash";
import { useState, useEffect } from "react";

export function useAppImages(app: App) {
  const [images, setImages] = useState<string[]>([]);

  async function processImages(images: string[]) {
    for (const image of images) {
      const file = await isImage(image);
      if (!file || file.width < 50 || file.height < 50) {
        continue;
      }

      setImages((images) =>
        chain([...images, image])
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
  }

  useEffect(() => {
    processImages(
      app.images.filter((i) => !isLikelyLogo(i) && !i.includes("/250px-")),
    );
  }, [app.images]);

  useEffect(() => {
    (async function () {
      if (!app.commons || app.commons.length === 0) {
        return;
      }

      const commonsImages = (
        await Promise.all(
          app.commons.map(async (c) => {
            // use subcategory that includes screenshots otherwise the given category
            const category = (
              await (
                await fetch(
                  "https://commons.wikimedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:" +
                    c +
                    "&cmtype=subcat&cmlimit=max&origin=*",
                )
              ).json()
            ).query.categorymembers.find((m: any) =>
              m.title.toUpperCase().includes("SCREENSHOT"),
            )?.title;

            const result = await (
              await fetch(
                `https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=${category || "Category:" + c}&gcmlimit=8&gcmtype=file&prop=imageinfo&&iiprop=url&format=json&origin=*`,
              )
            ).json();
            return Object.entries(result.query.pages).map(
              (m: any) => m[1].imageinfo[0].url,
            );
          }),
        )
      )
        .flatMap((c) => c)
        .filter((c) => !isLikelyLogo(c));

      processImages(commonsImages);
    })();
  }, [app.commons]);

  return images;
}
