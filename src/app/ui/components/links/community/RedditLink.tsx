import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { RedditIcon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";
import { getReddit } from "@shared/utils/links/getReddit";

export function RedditLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getReddit(app.community.reddit);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={link}
      title={t("app.community.reddit")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon
        icon={RedditIcon}
        strokeWidth={2}
        className="inline-block"
      />
    </ExternalLink>
  );
}
