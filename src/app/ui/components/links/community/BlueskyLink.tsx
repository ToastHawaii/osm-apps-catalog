import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { BlueskyIcon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";
import { getBluesky } from "@shared/utils/links/getBluesky";

export function BlueskyLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getBluesky(app.community.bluesky);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={link}
      title={t("app.community.bluesky")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon
        icon={BlueskyIcon}
        strokeWidth={2}
        className="inline-block"
      />
    </ExternalLink>
  );
}
