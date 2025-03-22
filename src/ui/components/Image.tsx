import React, { useEffect, useState } from "react";
import { App } from "../../data/App";
import { useTranslation } from "react-i18next";
import { calculateFilter } from "../../data/calculateFilter";
import { isImage } from "./LazyLoadImages";
import { uniq, uniqBy } from "lodash";

export function Carousel({
  app,
  onClose,
}: {
  app: App;
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) {
  const [images, setImages] = useState([] as string[]);

  useEffect(() => {
    for (const image of uniqBy(
      app.images.filter((image) => !image.includes("/250px-")),
      (image) => image.substring(image.lastIndexOf("/") + 1)
    )) {
      isImage(image).then((size) => {
        if (size && size > 50) {
          setImages((images) => uniq([...images, image]));
        }
      });
    }
  }, [app.images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="carousel" onClick={onClose}>
        {images.map((i) => (
          <img key={i} src={i} />
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
