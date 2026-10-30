import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tag01Icon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";
import { getForumTag } from "@shared/utils/links/getForumTag";

export function ForumTagLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getForumTag(app.community.forumTag);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={link}
      title={t("app.community.forumTag")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon
        icon={Tag01Icon}
        strokeWidth={2}
        className="inline-block"
      />
    </ExternalLink>
  );
}
