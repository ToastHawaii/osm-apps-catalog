import React from "react";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <title>{`OSM Apps Catalog`}</title>
      <meta
        name="description"
        content="There isn't just one, there are thousands."
      />
      <meta name="robots" content="noindex" />
      <main className="mx-auto mt-6 max-w-7xl text-center">
        <h2 className="text-xl font-semibold">{t("pageNotFound")}</h2>
      </main>
    </>
  );
}
