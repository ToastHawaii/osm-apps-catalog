import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Diamond02Icon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/lib/filters";
import { ExternalLink } from "@components/common/ExternalLink";

export function ObtainiumLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.obtainiumLink) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={app.install.obtainiumLink}
      title={t("app.install.obtainium")}
      data-goatcounter-click={`/app/download${contribute(app) ? "?category=edit" : ""}`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon
        icon={Diamond02Icon}
        strokeWidth={2}
        className="inline-block rotate-315"
      />
    </ExternalLink>
  );
}
