import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { MastodonIcon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";
import { getMastodon } from "@shared/utils/links/getMastodon";

export function MastodonLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getMastodon(app.community.mastodon);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={link}
      title={t("app.community.mastodon")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon
        icon={MastodonIcon}
        strokeWidth={2}
        className="inline-block"
      />
    </ExternalLink>
  );
}
