import {
  BlueskyIcon,
  Copy01Icon,
  MastodonIcon,
  NeuralNetworkIcon,
  RedditIcon,
  Share03Icon,
  Share05Icon,
  TelegramIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Activity, Links } from "@app/app/contribute/Activity";
import { useRoute } from "@hooks/useRoute";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utils/plainText";

export function Share({ app }: { app: App }) {
  const { t } = useTranslation();
  const { home } = useRoute();

  const [copyFeedback, setCopyFeedback] = useState(false);

  const name = app.name;
  const description = plainText(app.descriptionShort || app.description);
  const link = home({ app: app.id }, { full: true });

  const text = t("app.contribute.activity.share.textToShare", {
    name,
    description,
    link,
  });
  const textEncoded = encodeURIComponent(text);

  const titleEncoded = encodeURIComponent(name);
  const linkEncoded = encodeURIComponent(link);

  const shareData = {
    title: name,
    text,
    url: link,
  };

  // Inspired by shareon (https://github.com/kytta/shareon). Thanks a lot.
  const links = [
    {
      icon: MastodonIcon,
      title: t("app.contribute.activity.share.mastodon"),
      href: `https://toot.kytta.dev/?text=${textEncoded}`,
    },
    {
      icon: BlueskyIcon,
      title: t("app.contribute.activity.share.bluesky"),
      href: `https://bsky.app/intent/compose?text=${textEncoded}`,
    },
    {
      icon: NeuralNetworkIcon,
      title: t("app.contribute.activity.share.fediverse"),
      href: `https://s2f.kytta.dev/?text=${textEncoded}`,
    },
    {
      icon: RedditIcon,
      title: t("app.contribute.activity.share.reddit"),
      href: `https://www.reddit.com/submit?title=${titleEncoded}&url=${linkEncoded}`,
    },
    {
      icon: TelegramIcon,
      title: t("app.contribute.activity.share.telegram"),
      href: `https://telegram.me/share/url?url=${linkEncoded}&text=${textEncoded}`,
    },
    {
      icon: copyFeedback ? Tick01Icon : Copy01Icon,
      title: copyFeedback
        ? t("app.contribute.activity.share.copied")
        : t("app.contribute.activity.share.copy"),
      onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        navigator.clipboard.writeText(text);
        setCopyFeedback(true);
        setTimeout(() => {
          setCopyFeedback(false);
        }, 1000);
      },
    },
    navigator.canShare && navigator.canShare(shareData)
      ? {
          icon: Share03Icon,
          title: t("app.contribute.activity.share.more"),
          onClick: () => navigator.share(shareData),
        }
      : undefined,
  ].filter((o) => o) as Links;

  links.forEach((link) => {
    link.goatcounter = {
      click: "/app/share",
      title: "Starts sharing an app",
    };
  });

  return (
    <Activity
      title={t("app.contribute.activity.share.title")}
      description={t("app.contribute.activity.share.description", {
        app: app.name,
      })}
      icon={Share05Icon}
      links={links}
    />
  );
}
