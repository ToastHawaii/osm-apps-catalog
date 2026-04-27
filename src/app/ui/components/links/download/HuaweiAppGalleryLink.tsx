import React from "react";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/lib/filters";
import { ExternalLink } from "@components/common/ExternalLink";
import { getHuaweiAppGallery } from "@shared/utils/links/getHuaweiAppGallery";

export function HuaweiAppGalleryLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getHuaweiAppGallery(app.install.huaweiAppGalleryID);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={link}
      title={t("app.install.huaweiAppGallery")}
      data-goatcounter-click={`/app/download${
        contribute(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fas fa-shopping-bag fa-fw"></i>
    </ExternalLink>
  );
}
