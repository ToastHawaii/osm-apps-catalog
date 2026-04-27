import React, { ReactNode } from "react";
import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { useRoute } from "@hooks/useRoute";
import { useIsTechDomain } from "@hooks/useIsTechDomain";
import {
  DefaultTagsReorganization,
  tagsReorganizer,
  TechDefaultTagsReorganization,
} from "@lib/tagsReorganizer";

import { Score } from "@app/ui/components/Score";
import { AppLogo } from "@components/common/AppLogo";
import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader } from "@components/ui/card";

import { useAppImages } from "@app/app/useAppImages";
import { Gallery } from "@components/common/Gallery";
import { plainText } from "@shared/utils/plainText";
import { ExternalLink } from "@components/common/ExternalLink";
import { newUrl } from "@shared/utils/url";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon } from "@hugeicons/core-free-icons";

import { BlueskyLink } from "@app/ui/components/links/community/BlueskyLink";
import { ForumLink } from "@app/ui/components/links/community/ForumLink";
import { ForumTagLink } from "@app/ui/components/links/community/ForumTagLink";
import { GitHubDiscussionsLink } from "@app/ui/components/links/community/GitHubDiscussionsLink";
import { IssueTrackerLink } from "@app/ui/components/links/community/IssueTrackerLink";
import { LemmyLink } from "@app/ui/components/links/community/LemmyLink";
import { MastodonLink } from "@app/ui/components/links/community/MastodonLink";
import { MatrixLink } from "@app/ui/components/links/community/MatrixLink";
import { RedditLink } from "@app/ui/components/links/community/RedditLink";
import { SlackLink } from "@app/ui/components/links/community/SlackLink";
import { TelegramLink } from "@app/ui/components/links/community/TelegramLink";
import { SourceDisplay } from "@app/ui/components/SourceDisplay";
import { LanguageDisplay } from "@app/app/LanguagesDisplay";
import { Contribute } from "@app/app/Contribute";
import { Download } from "@app/app/Download";
import { Formatted } from "@components/common/Formatted";
import { featureFlags } from "../../../src/featureFlags";

export function Details({ app }: { app: App }) {
  const { t } = useTranslation();
  const isTechView = useIsTechDomain();
  const routes = useRoute();

  const images = useAppImages(app);

  const tagItems = tagsReorganizer(
    app.tags,
    !isTechView ? DefaultTagsReorganization : TechDefaultTagsReorganization,
  );
  const metaData: { title: ReactNode; value: ReactNode }[] = [];

  if (app.languages.length > 0 || !!app.languagesUrl) {
    metaData.push({
      title: t("app.languages"),
      value: <LanguageDisplay app={app} />,
    });
  }

  if (app.coverage.length > 0) {
    metaData.push({
      title: t("app.coverage"),
      value: app.coverage[app.coverage.length - 1],
    });
  }

  if (app.price) {
    metaData.push({
      title: t("app.price"),
      value: app.price,
    });
  }

  if (app.platform.length > 0) {
    metaData.push({
      title: t("app.platforms"),
      value: app.platform.join(", "),
    });
  }

  if (app.lastRelease || app.unmaintained) {
    metaData.push({
      title: t("app.lastRelease"),
      value: (
        <>
          {app.lastRelease || "????-??-??"}
          {app.unmaintained && (
            <>
              {" "}
              <span className="text-orange-400">
                <Trans
                  i18nKey="app.unmaintained"
                  components={{
                    icon: (
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        className="inline-block"
                        strokeWidth={2}
                        size={16}
                      />
                    ),
                  }}
                />
              </span>
            </>
          )}
        </>
      ),
    });
  }

  if (app.author) {
    metaData.push({
      title: t("app.author"),
      value: <Formatted htmlText={app.author} />,
    });
  }

  if (app.license && app.license?.length > 0) {
    metaData.push({
      title: t("app.license"),
      value: <Formatted htmlText={app.license.join(", ")} />,
    });
  }

  if (
    isTechView &&
    app.programmingLanguages &&
    app.programmingLanguages?.length > 0
  ) {
    metaData.push({
      title: t("app.programmingLanguages"),
      value: <Formatted htmlText={app.programmingLanguages.join(", ")} />,
    });
  }

  if (app.sourceCode) {
    metaData.push({
      title: (
        <ExternalLink
          href={app.sourceCode}
          data-goatcounter-click="/app/source-code"
          data-goatcounter-title="Goes to source code of an app."
          data-goatcounter-referrer="https://osm-apps.org/"
        >
          {t("app.sourceCode")}
        </ExternalLink>
      ),
      value: (
        <ExternalLink
          href={app.sourceCode}
          data-goatcounter-click="/app/source-code"
          data-goatcounter-title="Goes to source code of an app."
          data-goatcounter-referrer="https://osm-apps.org/"
        >
          <i className="fas fa-code" />
        </ExternalLink>
      ),
    });
  }

  if (Object.values(app.community).some(Boolean)) {
    metaData.push({
      title: t("app.community"),
      value: (
        <>
          <ForumLink app={app} />
          <ForumTagLink app={app} />
          <MatrixLink app={app} />
          <MastodonLink app={app} />
          <LemmyLink app={app} />
          <BlueskyLink app={app} />
          <RedditLink app={app} />
          <SlackLink app={app} />
          <TelegramLink app={app} />
          <GitHubDiscussionsLink app={app} />
          <IssueTrackerLink app={app} />
        </>
      ),
    });
  }

  metaData.push({
    title: t("app.source"),
    value: <SourceDisplay app={app} />,
  });

  if (app.topics.length > 0) {
    metaData.push({
      title: t("app.keywords"),
      value: (
        <div className="flex flex-wrap justify-end gap-1 sm:justify-start">
          {app.topics.map((topic) => (
            <Badge key={topic} variant="secondary" asChild>
              <Link to={routes.search({ topics: [topic] })}>{topic}</Link>
            </Badge>
          ))}
        </div>
      ),
    });
  }

  function getDelimiter() {
    const desc = plainText(app.description || app.subtitle || "");
    return desc ? (desc.endsWith(".") ? " " : " – ") : "";
  }

  return (
    <div className="relative mx-auto max-w-3xl p-2 text-left">
      <Card className="shadow-md">
        <CardHeader className="flex flex-wrap items-center gap-6">
          <div className="size-25 place-items-center content-center">
            <AppLogo app={app} />
          </div>
          <h1 className="text-2xl font-semibold">{app.name}</h1>

          <Download app={app} />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {tagItems.map((tag) => (
              <Badge key={tag} variant="outline" asChild>
                <Link to={routes.search({ tags: [tag] })}>
                  {t(`app.tag.${tag}`)}
                </Link>
              </Badge>
            ))}
          </div>
          {images.length > 0 && <Gallery images={images} />}

          <div>
            <Formatted htmlText={app.description || app.subtitle || ""} />
            {app.documentation && (
              <>
                {getDelimiter()}
                <ExternalLink href={app.documentation} icon>
                  {t("app.learnMore", {
                    website: newUrl(app.documentation).hostname,
                  })}
                </ExternalLink>
              </>
            )}
          </div>
          {featureFlags.showContributeOptions && (
            <>
              <h2 className="mt-12 text-xl font-semibold">
                Möglichkeiten zu {app.name} beizutragen
              </h2>
              <Card>
                <CardContent>
                  <Contribute app={app} />
                </CardContent>
              </Card>
            </>
          )}

          <h2 className="mt-12 text-xl font-semibold">{t("list.moreInfos")}</h2>
          <div className="w-full text-sm sm:columns-2 sm:gap-6">
            {metaData.map((d, i) => (
              <dl
                key={i}
                className="mb-4 flex break-inside-avoid items-center justify-between gap-4 border-b py-2 last:border-b-0 sm:block sm:border-0 sm:py-0"
              >
                <dt className="text-muted-foreground">{d.title}</dt>
                <dd className="text-right sm:text-left">{d.value}</dd>
              </dl>
            ))}
          </div>
        </CardContent>
      </Card>
      <Score app={app} position="right" />
    </div>
  );
}
