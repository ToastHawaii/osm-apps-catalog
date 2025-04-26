import React, { useEffect, useState } from "react";
import { App } from "../../../shared/data/App";
import { useTranslation } from "react-i18next";
import { calculateFilter } from "../../../shared/data/calculateFilter";
import { isImage } from "./LazyLoadImages";
import { chain } from "lodash";

function isLogo(fileName: string) {
  return (
    fileName.toUpperCase().includes(".SVG") ||
    fileName.toUpperCase().includes("ICON") ||
    fileName.toUpperCase().includes("LOGO")
  );
}

export function Carousel({
  app,
  onClose,
}: {
  app: App;
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) {
  const [images, setImages] = useState([] as string[]);

  async function processImages(images: string[]) {
    for (const image of images.filter((i) => !isLogo(i))) {
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
              .replaceAll("-", " ")
          )
          .value()
      );
    }
  }

  useEffect(() => {
    processImages(app.images.filter((image) => !image.includes("/250px-")));
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
                    "&cmtype=subcat&cmlimit=max&origin=*"
                )
              ).json()
            ).query.categorymembers.find((m: any) =>
              m.title.toUpperCase().includes("SCREENSHOT")
            )?.title;

            const result = await (
              await fetch(
                `https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=${
                  category || "Category:" + c
                }&gcmlimit=8&gcmtype=file&prop=imageinfo&&iiprop=url&format=json&origin=*`
              )
            ).json();
            return Object.entries(result.query.pages).map(
              (m: any) => m[1].imageinfo[0].url
            );
          })
        )
      ).flatMap((c) => c);

      processImages(commonsImages);
    })();
  }, [app.commons]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="carousel" onClick={onClose}>
        {images.map((i) => (
          <img key={i} src={i} />
        ))}
        {/* {(app.videos || []).map((v) => (
          <video key={v} src={v} />
        ))} */}
      </div>
      <span className="carousel-close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </span>
    </>
  );
}

export function Image({ app }: { app: App }) {
  const { t } = useTranslation();

  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  if (app.images.length > 0 || app.logos.length > 0) {
    return (
      <img
        className="img"
        src={defaultImage}
        data-dynamic-src={`${[...app.images, ...app.logos].join(
          " "
        )} ${defaultImage}`}
        alt={t("app.imageAlt", {
          name: app.name,
        })}
      />
    );
  } else {
    if (!app.cache.filter) {
      app.cache.filter = calculateFilter(app);
    }

    return (
      <img
        className="img"
        style={{ filter: app.cache.filter }}
        src={defaultImage}
        alt={t("app.imageAlt", {
          name: app.name,
        })}
      />
    );
  }
}
