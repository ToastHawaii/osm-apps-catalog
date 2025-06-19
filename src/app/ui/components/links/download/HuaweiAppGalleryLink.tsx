import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function HuaweiAppGalleryLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.huaweiAppGalleryID) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://appgallery.huawei.com/#/app/${app.install.huaweiAppGalleryID}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.huaweiAppGallery")}
      data-goatcounter-click="app/download/huaweiAppGallery"
      data-goatcounter-title="Download app via Huawei App Gallery."
    >
      <i className="fas fa-shopping-bag fa-fw"></i>
    </a>
  );
}
