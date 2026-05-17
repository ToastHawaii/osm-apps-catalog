import {
  BlueskyIcon,
  CustomerService01Icon,
  Github01Icon,
  MastodonIcon,
  MessageMultiple02Icon,
  RedditIcon,
  SlackIcon,
  Tag01Icon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";
import { IconSvgElement } from "@hugeicons/react";
import React, { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { App } from "@shared/data/App";
import { getBluesky } from "@shared/utils/links/getBluesky";
import { getForumTag } from "@shared/utils/links/getForumTag";
import { getGitHubDiscussions } from "@shared/utils/links/getGitHubDiscussions";
import { getLemmy } from "@shared/utils/links/getLemmy";
import { getMastodon } from "@shared/utils/links/getMastodon";
import { getMatrix } from "@shared/utils/links/getMatrix";
import { getReddit } from "@shared/utils/links/getReddit";
import { getTelegram } from "@shared/utils/links/getTelegram";

export function Connect({ app }: { app: App }) {
  const { t } = useTranslation();

  const links: {
    icon: IconSvgElement | ReactElement;
    href: string;
    title: ReactNode;
    goatcounter?: {
      click: string;
      title: string;
    };
  }[] = [];

  if (app.community.forum) {
    links.push({
      icon: MessageMultiple02Icon,
      href: app.community.forum,
      title: t("app.contribute.activity.connect.forum"),
    });
  }
  {
    const link = getForumTag(app.community.forumTag);
    if (link) {
      links.push({
        icon: Tag01Icon,
        href: link,
        title: t("app.contribute.activity.connect.forumTag"),
      });
    }
  }
  {
    const link = getMatrix(app.community.matrix, app.community.irc);
    if (link) {
      links.push({
        icon: <span className="-ml-0.5">[m]</span>,
        href: link,
        title: t("app.contribute.activity.connect.matrix"),
      });
    }
  }
  {
    const link = getMastodon(app.community.mastodon);
    if (link) {
      links.push({
        icon: MastodonIcon,
        href: link,
        title: t("app.contribute.activity.connect.mastodon"),
      });
    }
  }
  {
    const link = getLemmy(app.community.lemmy);
    if (link) {
      links.push({
        icon: <img src="/assets/lemmy-black.svg" className="w-[19.25px]" />,
        href: link,
        title: t("app.contribute.activity.connect.lemmy"),
      });
    }
  }
  {
    const link = getBluesky(app.community.bluesky);
    if (link) {
      links.push({
        icon: BlueskyIcon,
        href: link,
        title: t("app.contribute.activity.connect.bluesky"),
      });
    }
  }
  {
    const link = getReddit(app.community.reddit);
    if (link) {
      links.push({
        icon: RedditIcon,
        href: link,
        title: t("app.contribute.activity.connect.reddit"),
      });
    }
  }
  if (app.community.slack) {
    links.push({
      icon: SlackIcon,
      href: app.community.slack,
      title: t("app.contribute.activity.connect.slack"),
    });
  }
  {
    const link = getTelegram(app.community.telegram);
    if (link) {
      links.push({
        icon: TelegramIcon,
        href: link,
        title: t("app.contribute.activity.connect.telegram"),
      });
    }
  }
  {
    const link = getGitHubDiscussions(app.community.githubDiscussions);
    if (link) {
      links.push({
        icon: Github01Icon,
        href: link,
        title: t("app.contribute.activity.connect.gitHubDiscussions"),
      });
    }
  }

  links.forEach((link) => {
    link.goatcounter = {
      click: "/app/community",
      title: "Follows a community link of an app.",
    };
  });

  return (
    <Activity
      title={t("app.contribute.activity.connect.title")}
      description={t("app.contribute.activity.connect.description", {
        app: app.name,
      })}
      icon={CustomerService01Icon}
      links={links}
      hint={t("app.contribute.activity.connect.hint")}
    />
  );
}
