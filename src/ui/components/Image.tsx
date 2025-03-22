import React, { useEffect, useState } from "react";
import { App } from "../../data/App";
import { useTranslation } from "react-i18next";
import { calculateFilter } from "../../data/calculateFilter";
import { isImageWithMinSize } from "./LazyLoadImages";
import { uniq, uniqBy } from "lodash";

function Carousel({ app, onClose }: { app: App; onClose: () => void }) {
  const [images, setImages] = useState([] as string[]);

  useEffect(() => {
    for (const image of uniqBy(
      app.images.filter((image) => !image.includes("/250px-")),
      (image) => image.substring(image.lastIndexOf("/") + 1)
    )) {
      isImageWithMinSize(image, 50).then((result) => {
        if (result) {
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
          onClick={() => setCarouselShown(true)}
        />
        {carouselShown && (
          <Carousel app={app} onClose={() => setCarouselShown(false)} />
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
