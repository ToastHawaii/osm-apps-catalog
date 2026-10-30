import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { ListIcon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";

export function IssueTrackerLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.issueTracker) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={app.community.issueTracker}
      title={t("app.community.issueTracker")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon icon={ListIcon} strokeWidth={2} className="inline-block" />
    </ExternalLink>
  );
}
