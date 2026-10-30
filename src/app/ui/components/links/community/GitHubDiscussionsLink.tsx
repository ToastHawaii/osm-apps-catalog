import React from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon } from "@hugeicons/core-free-icons";

import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";
import { getGitHubDiscussions } from "@shared/utils/links/getGitHubDiscussions";

export function GitHubDiscussionsLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getGitHubDiscussions(app.community.githubDiscussions);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={link}
      title={t("app.community.githubDiscussions")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <HugeiconsIcon
        icon={Github01Icon}
        strokeWidth={2}
        className="inline-block"
      />
    </ExternalLink>
  );
}
