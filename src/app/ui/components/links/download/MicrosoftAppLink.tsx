import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { MicrosoftIcon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/lib/filters";
import { ExternalLink } from "@components/common/ExternalLink";
import { getMicrosoftStore } from "@shared/utils/links/getMicrosoftStore";

export function MicrosoftAppLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getMicrosoftStore(app.install.microsoftAppID);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={link}
      title={t("app.install.microsoftApp")}
      data-goatcounter-click={`/app/download${contribute(app) ? "?category=edit" : ""}`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon
        icon={MicrosoftIcon}
        strokeWidth={2}
        className="inline-block"
      />
    </ExternalLink>
  );
}
