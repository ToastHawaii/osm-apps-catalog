import React, { useEffect, useState } from "react";
import { App } from "../../data/App";
import { useTranslation } from "react-i18next";
import { calculateFilter } from "../../data/calculateFilter";
import { isImage } from "./LazyLoadImages";
import { chain } from "lodash";

export function Carousel({
  app,
  onClose,
}: {
  app: App;
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) {
  const [images, setImages] = useState(
    [] as { url: string; file: HTMLImageElement; size: number }[]
  );

  useEffect(() => {
    for (const image of chain(app.images)
      .filter((image) => !image.includes("/250px-"))
      .uniqBy((image) => image.substring(image.lastIndexOf("/") + 1))
      .value()) {
      isImage(image).then((file) => {
        if (file && file.width > 50 && file.height > 50) {
          setImages((images) =>
            chain([
              ...images,
              {
                url: image,
                file,
                size: (performance.getEntriesByName(image)[0] as any)
                  .transferSize,
              },
            ])
              .uniqBy((i) => i.url)
              .uniqBy(
                (i) =>
                  i.file.naturalWidth + "," + file.naturalHeight + "," + i.size
              )
              .value()
          );
        }
      });
    }
  }, [app.images]);

  useEffect(() => {
    (async function () {
      if (!app.commons || app.commons.length === 0) {
        return;
      }

      const commonsImages = (
        await Promise.all(
          app.commons.map(async (c) =>
            (
              await (
                await fetch(
                  "https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:" +
                    c +
                    "&gcmlimit=6&gcmtype=file&prop=imageinfo&&iiprop=url&format=json",
                  {
                    mode: "no-cors",
                  }
                )
              ).json()
            ).query.categorymembers.map((m: any) => m.imageinfo[0].url)
          )
        )
      ).flatMap((c) => c);

      for (const image of chain(commonsImages)
        .uniqBy((image) => image.substring(image.lastIndexOf("/") + 1))
        .value()) {
        isImage(image).then((file) => {
          if (file && file.width > 50 && file.height > 50) {
            setImages((images) =>
              chain([
                ...images,
                {
                  url: image,
                  file,
                  size: (performance.getEntriesByName(image)[0] as any)
                    .transferSize,
                },
              ])
                .uniqBy((i) => i.url)
                .uniqBy(
                  (i) =>
                    i.file.naturalWidth +
                    "," +
                    file.naturalHeight +
                    "," +
                    i.size
                )
                .value()
            );
          }
        });
      }
    })();
  }, [app.commons]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="carousel" onClick={onClose}>
        {images.map((i) => (
          <img key={i.url} src={i.url} />
        ))}
        {(app.video || []).map((v) => (
          <video key={v} src={v} />
        ))}
      </div>
      <span className="carousel-close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </span>
    </>
  );
}

export function Image({ app }: { app: App }) {
  const { t } = useTranslation();
  const [carouselShown, setCarouselShown] = useState(false);

  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  if (app.images.length > 0) {
    return (
      <>
        <img
          className="img"
          src={defaultImage}
          data-dynamic-src={`${app.images.join(" ")} ${defaultImage}`}
          alt={t("app.imageAlt", {
            name: app.name,
          })}
        />
        <span
          className="carousel-show"
          onClick={(e) => {
            e.preventDefault();
            return setCarouselShown(true);
          }}
        >
          <i className="fas fa-images fa-flip-horizontal"></i>
        </span>
        {carouselShown && (
          <Carousel
            app={app}
            onClose={(e) => {
              e.preventDefault();
              return setCarouselShown(false);
            }}
          />
        )}
      </>
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
