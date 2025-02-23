import React, { useEffect, useState } from "react";
import { App } from "../../data/App";
import { useTranslation } from "react-i18next";
import { calculateFilter } from "../../data/calculateFilter";
import { isImage } from "./LazyLoadImages";

function LazyImage({ src }: { src: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    isImage(src).then((result) => {
      setShow(result);
    });
  });

  if (!show) {
    return null;
  }
  return <img src={src} />;
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
          <div className="carousel" onClick={() => setCarouselShown(false)}>
            {app.images
              .filter((i) => !i.includes("/thumb/"))
              .map((i) => (
                <LazyImage src={i} />
              ))}
          </div>
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
