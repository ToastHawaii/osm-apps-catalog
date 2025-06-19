// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { Badges } from "../components/Badges";
import { Image } from "../components/Image";
import { toWikiValue } from "../utilities/toWikiTable";
import { languageValueToDisplay } from "../utilities/language";
import { getMatrix } from "../utilities/getMatrix";
import { App } from "../../../shared/data/App";
import { Score } from "../components/Score";
import { Group } from "../components/Group";
import { SourceDisplay } from "../components/SourceDisplay";
import { State } from "../State";
import { AsinLink } from "../components/links/download/AsinLink";
import { FDroidLink } from "../components/links/download/FDroidLink";
import { ObtainiumLink } from "../components/links/download/ObtainiumLink";
import { GooglePlayLink } from "../components/links/download/GooglePlayLink";
import { HuaweiAppGalleryLink } from "../components/links/download/HuaweiAppGalleryLink";
import { AppleStoreLink } from "../components/links/download/AppleStoreLink";
import { MacAppStoreLink } from "../components/links/download/MacAppStoreLink";
import { MicrosoftAppLink } from "../components/links/download/MicrosoftAppLink";
import { WebsiteLink } from "../components/links/download/WebsiteLink";
import { ForumLink } from "../components/links/community/ForumLink";
import { ForumTagLink } from "../components/links/community/ForumTagLink";
import { MatrixLink } from "../components/links/community/MatrixLink";
import { MastodonLink } from "../components/links/community/MastodonLink";
import { LemmyLink } from "../components/links/community/LemmyLink";
import { BlueskyLink } from "../components/links/community/BlueskyLink";
import { RedditLink } from "../components/links/community/RedditLink";
import { SlackLink } from "../components/links/community/SlackLink";
import { TelegramLink } from "../components/links/community/TelegramLink";
import { GitHubDiscussionsLink } from "../components/links/community/GitHubDiscussionsLink";
import { IssueTrackerLink } from "../components/links/community/IssueTrackerLink";
import { plainText } from "../../../action/crawler/wiki/plainText";
import { useGoatCounterEvents } from "../../utilities/useGoatCounterEvents";

export function Compare({
  apps,
  lang,
  state,
}: {
  apps: App[];
  lang: string;
  state: State;
}) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  return (
    <>
      <div className="row fixed">
        <div className="cell header param-title"></div>
        {apps.map((app) => (
          <div
            key={app.id}
            className="cell header text-center with-corner-badge"
          >
            <Score app={app} />
            <h4>
              {app.website ? (
                <a href={app.website} target="_blank" rel="noreferrer">
                  {app.name}
                </a>
              ) : (
                app.name
              )}
            </h4>
          </div>
        ))}
      </div>

      {/* General */}
      <Group
        id="general"
        display={t("compare.group.header.general")}
        params={[
          {
            label: () => "",
            description: () => "",
            hasValue: (app) => app.images.length > 0,
            renderToHtml: (app) => <Image app={app} />,
            renderToWiki: (app) =>
              app.imageWiki ? `[[File:${app.imageWiki}|160px]]` : "",
            centered: true,
          },
          {
            label: () => "",
            description: () => "",
            hasValue: (app) =>
              !!(
                app.website ||
                app.install.asin ||
                app.install.fDroidID ||
                app.install.obtainiumLink ||
                app.install.googlePlayID ||
                app.install.huaweiAppGalleryID ||
                app.install.appleStoreID ||
                app.install.macAppStoreID ||
                app.install.microsoftAppID
              ),
            renderToHtml: (app) => (
              <>
                <WebsiteLink app={app} />
                <FDroidLink app={app} />
                <ObtainiumLink app={app} />
                <GooglePlayLink app={app} />
                <AsinLink app={app} />
                <HuaweiAppGalleryLink app={app} />
                <AppleStoreLink app={app} />
                <MacAppStoreLink app={app} />
                <MicrosoftAppLink app={app} />
              </>
            ),
            renderToWiki: (app, lang) =>
              [
                app.website
                  ? `[${app.website} ${t("app.website", { lng: lang })}]`
                  : "",
                app.install.fDroidID
                  ? `[https://f-droid.org/repository/browse/?fdid=${
                      app.install.fDroidID
                    } ${t("app.install.fDroid", { lng: lang })}]`
                  : "",
                app.install.obtainiumLink
                  ? `[${app.install.obtainiumLink} ${t(
                      "app.install.obtainium",
                      {
                        lng: lang,
                      }
                    )}]`
                  : "",
                app.install.googlePlayID
                  ? `[https://play.google.com/store/apps/details?id=${
                      app.install.googlePlayID
                    } ${t("app.install.googlePlay", { lng: lang })}]`
                  : "",
                app.install.asin
                  ? `[https://www.amazon.com/dp/${app.install.asin} ${t(
                      "app.install.asin",
                      { lng: lang }
                    )}]`
                  : "",
                app.install.huaweiAppGalleryID
                  ? `[https://appgallery.huawei.com/#/app/${
                      app.install.huaweiAppGalleryID
                    } ${t("app.install.huaweiAppGallery", { lng: lang })}]`
                  : "",
                app.install.appleStoreID
                  ? `[https://apps.apple.com/app/${
                      app.install.appleStoreID.toUpperCase().startsWith("ID")
                        ? app.install.appleStoreID
                        : `id${app.install.appleStoreID}`
                    } iTunes App Store]`
                  : "",
                app.install.macAppStoreID
                  ? `[https://apps.apple.com/app/${
                      app.install.macAppStoreID.toUpperCase().startsWith("ID")
                        ? app.install.macAppStoreID
                        : `id${app.install.macAppStoreID}`
                    } ${t("app.install.appleStore", { lng: lang })}]`
                  : "",
                app.install.microsoftAppID
                  ? `[https://apps.microsoft.com/detail/${
                      app.install.microsoftAppID
                    } ${t("app.install.macAppStore", { lng: lang })}]`
                  : "",
              ]
                .filter((o) => o)
                .join(", "),
          },
          {
            label: (lang) => t("app.props.genre.label", { lng: lang }),
            description: (lang) =>
              t("app.props.genre.description", { lng: lang }),
            hasValue: (app) => app.genre?.length > 0,
            renderToHtml: (app) => <Badges values={app.genre} />,
            renderToWiki: (app) => toWikiValue(app.genre?.join(", "), lang),
          },
          {
            label: (lang) => t("app.props.description.label", { lng: lang }),
            description: (lang) =>
              t("app.props.description.description", {
                lng: lang,
              }),
            hasValue: (app) => !!app.description,
            renderToHtml: (app) => (
              <>
                <span
                  dangerouslySetInnerHTML={{ __html: app.description }}
                ></span>
                {app.documentation && (
                  <>
                    {plainText(app.description)
                      ? plainText(app.description).endsWith(".")
                        ? " "
                        : " – "
                      : ""}
                    <a
                      href={app.documentation}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("list.documentation")}
                    </a>
                  </>
                )}
              </>
            ),
            renderToWiki: (app) => toWikiValue(app.description, lang),
            more: true,
          },
          {
            label: (lang) => t("app.props.platform.label", { lng: lang }),
            description: (lang) =>
              t("app.props.platform.description", { lng: lang }),
            hasValue: (app) => app.platform?.length > 0,
            renderToHtml: (app) => <Badges values={app.platform} />,
            renderToWiki: (app) => toWikiValue(app.platform.join(", "), lang),
            focus: !!state.platforms.length,
          },
          {
            label: (lang) => t("app.props.date.label", { lng: lang }),
            description: (lang) =>
              t("app.props.date.description", { lng: lang }),
            hasValue: (app) => !!(app.lastRelease || app.unmaintained),
            renderToHtml: (app) => (
              <>
                {app.lastRelease
                  ? app.lastRelease
                  : app.unmaintained
                  ? "????-??-??"
                  : ""}
                {app.unmaintained ? (
                  <>
                    {" "}
                    <span className="warning">
                      <Trans
                        i18nKey={"app.unmaintained"}
                        components={{
                          icon: <i className="fas fa-exclamation-triangle"></i>,
                        }}
                      />
                    </span>
                  </>
                ) : (
                  ""
                )}
              </>
            ),
            renderToWiki: (app, lang) =>
              toWikiValue(
                (app.unmaintained
                  ? `style="background-color: #ffc680" | `
                  : "") +
                  (app.lastRelease
                    ? app.lastRelease
                    : app.unmaintained
                    ? "????-??-??"
                    : "") +
                  (app.unmaintained
                    ? t("app.unmaintained.wiki", { icon: `⚠️`, lng: lang })
                    : ""),
                lang
              ),
          },
          {
            label: (lang) => t("app.props.languages.label", { lng: lang }),
            description: (lang) =>
              t("app.props.languages.description", {
                lng: lang,
              }),
            hasValue: (app) =>
              !!app.languagesUrl || !!(app.languages.length > 0),
            renderToHtml: (app) => (
              <>
                {app.languagesUrl ? (
                  <a
                    className="language-url"
                    href={app.languagesUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-goatcounter-click="app/translationContribution"
                    data-goatcounter-title="Go to translation contribution page from app."
                  >
                    {app.languages.length > 0 ? (
                      <Badges values={app.languages} />
                    ) : (
                      <i className="fas fa-language"></i>
                    )}
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                ) : (
                  <Badges values={app.languages} />
                )}
              </>
            ),
            renderToWiki: (app) =>
              toWikiValue(
                app.languagesUrl
                  ? `[${app.languagesUrl}${
                      app.languages.length > 0
                        ? app.languages.join(", ")
                        : languageValueToDisplay("mul")
                    }]`
                  : app.languages.join(", "),
                lang
              ),
            more: true,
            focus:
              !!state?.languages.length ||
              state?.contribute.includes("translate"),
          },
          {
            label: (lang) => t("app.props.coverage.label", { lng: lang }),
            description: (lang) =>
              t("app.props.coverage.description", { lng: lang }),
            hasValue: (app) => !!(app.coverage && app.coverage.length),
            renderToHtml: (app) => <>{app.coverage[app.coverage.length - 1]}</>,
            renderToWiki: (app) =>
              toWikiValue(app.coverage[app.coverage.length - 1], lang),
            focus: !!state?.coverage.length,
          },
          {
            label: (lang) => t("app.community", { lng: lang }),
            description: () => "",
            hasValue: (app) =>
              Object.values(app.community).filter((v) => v).length > 0,
            renderToHtml: (app) => (
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
            renderToWiki: (app, lang) =>
              [
                app.community.forum
                  ? `[${app.community.forum} ${t("app.community.forum", {
                      lng: lang,
                    })}]`
                  : "",
                app.community.forumTag
                  ? `[https://community.openstreetmap.org/tag/${
                      app.community.forumTag
                    } ${t("app.community.forumTag", { lng: lang })}]`
                  : "",
                getMatrix(app.community.matrix, app.community.irc)
                  ? `[https://matrix.to/#/${getMatrix(
                      app.community.matrix,
                      app.community.irc
                    )} ${t("app.community.matrix", { lng: lang })}]`
                  : "",
                app.community.mastodon
                  ? `[https://fedirect.toolforge.org/?id=${
                      app.community.mastodon
                    } ${t("app.community.mastodon", { lng: lang })}]`
                  : "",
                app.community.bluesky
                  ? `[https://bsky.app/profile/${app.community.bluesky} ${t(
                      "app.community.bluesky",
                      { lng: lang }
                    )}]`
                  : "",
                app.community.reddit
                  ? `[https://www.reddit.com/r/${app.community.reddit} ${t(
                      "app.community.reddit",
                      { lng: lang }
                    )}]`
                  : "",
                app.community.slack
                  ? `[${app.community.slack} ${t("app.community.slack", {
                      lng: lang,
                    })}]`
                  : "",
                app.community.telegram
                  ? `[https://telegram.me/${app.community.telegram} ${t(
                      "app.community.telegram",
                      { lng: lang }
                    )}]`
                  : "",
                app.community.githubDiscussions
                  ? `[https://github.com/${
                      app.community.githubDiscussions
                    }/discussions ${t("app.community.githubDiscussions", {
                      lng: lang,
                    })}]`
                  : "",
                app.community.issueTracker
                  ? `[${app.community.issueTracker} ${t(
                      "app.community.issueTracker",
                      { lng: lang }
                    )}]`
                  : "",
              ]
                .filter((o) => o)
                .join(", "),
            focus:
              state?.contribute.includes("discuss") ||
              state?.contribute.includes("test"),
          },
          {
            label: (lang) => t("app.props.author.label", { lng: lang }),
            description: (lang) =>
              t("app.props.author.description", { lng: lang }),
            hasValue: (app) => !!app.author,
            renderToHtml: (app) => (
              <span
                dangerouslySetInnerHTML={{ __html: app.author || "" }}
              ></span>
            ),
            renderToWiki: (app) => toWikiValue(app.author, lang),
          },
          {
            label: (lang) => t("app.props.price.label", { lng: lang }),
            description: (lang) =>
              t("app.props.price.description", { lng: lang }),
            hasValue: (app) => !!app.price,
            renderToHtml: (app) => <>{app.price}</>,
            renderToWiki: (app) =>
              toWikiValue(
                app.gratis
                  ? `{{free|{{TranslationOf gratis|{{{lang|}}}}}}}`
                  : app.price,
                lang
              ),
          },
          {
            label: (lang) => t("app.props.license.label", { lng: lang }),
            description: (lang) =>
              t("app.props.license.description", { lng: lang }),
            hasValue: (app) => !!(app.license && app.license.length > 0),
            renderToHtml: (app) => (
              <Badges values={app.license} dangerouslySetInnerHTML />
            ),
            renderToWiki: (app) =>
              app.libre
                ? `{{free|${toWikiValue(app.license, lang) || "{{?}}"}}}`
                : toWikiValue(app.license, lang),
          },
          {
            label: (lang) => t("app.props.repo.label", { lng: lang }),
            description: (lang) =>
              t("app.props.repo.description", { lng: lang }),
            hasValue: (app) => !!app.sourceCode,
            renderToHtml: (app) =>
              app.sourceCode ? (
                <a
                  href={app.sourceCode}
                  target="_blank"
                  rel="noreferrer"
                  data-goatcounter-click="app/sourceCode"
                  data-goatcounter-title="Go to source code from app."
                >
                  <i className="fas fa-code"></i>
                </a>
              ) : null,
            renderToWiki: (app) =>
              toWikiValue(
                app.sourceCode ? `[${app.sourceCode} </>]` : "",
                lang
              ),
            focus: state?.contribute.includes("develop"),
          },
          {
            label: (lang) => t("app.source", { lng: lang }),
            description: (lang) => t("app.source.description", { lng: lang }),
            hasValue: () => true,
            renderToHtml: (app) => <SourceDisplay app={app} />,
            focus: state?.contribute.includes("document"),
          },
        ]}
        apps={apps}
        lang={lang}
      />

      {/* Map display */}
      <Group
        id="map"
        display={t("compare.group.header.map")}
        params={[
          "map",
          "mapData",
          "datasource",
          "rotateMap",
          "3D",
          "showWebsite",
          "showPhoneNumber",
          "showOpeningHours",
        ]}
        apps={apps}
        lang={lang}
      />

      {/* Routing */}
      <Group
        id="routing"
        display={t("compare.group.header.routing")}
        params={[
          "routing",
          "createRouteManually",
          "calculateRoute",
          "createRouteViaWaypoints",
          "profiles",
          "turnRestrictions",
          "calculateRouteOffline",
          "routingProviders",
          "avoidTraffic",
          "trafficProvider",
        ]}
        apps={apps}
        lang={lang}
      />

      {/* Navigating */}
      <Group
        id="navigating"
        display={t("compare.group.header.navigating")}
        params={[
          "navigating",
          "findLocation",
          "findNearbyPOI",
          "navToPoint",
          "voice",
          "keepOnRoad",
          "turnLanes",
          "withoutGPS",
          "predefinedRoute",
        ]}
        apps={apps}
        lang={lang}
      />

      {/* Tracking */}
      <Group
        id="tracking"
        display={t("compare.group.header.tracking")}
        params={[
          "tracking",
          "customInterval",
          "trackFormats",
          "geotagging",
          "fastWayPointAdding",
          "uploadGPX",
        ]}
        apps={apps}
        lang={lang}
      />

      {/* Monitoring */}
      <Group
        id="monitoring"
        display={t("compare.group.header.monitoring")}
        params={[
          "monitoring",
          "showTrack",
          "showExistingTrack",
          "showAltitudeDiagram",
          "showDOP",
          "showSatellites",
          "showNMEAlive",
          "showSpeed",
          "sendPosition",
        ]}
        apps={apps}
        lang={lang}
      />

      {/* Editing */}
      <Group
        id="editing"
        display={t("compare.group.header.editing")}
        params={[
          "addPOI",
          "editPOI",
          "addWay",
          "editGeom",
          "editTags",
          "editRelations",
          "viewNotes",
          "createNotes",
          "editNotes",
          "editSource",
          "offsetDBsupport",
          "uploadOSMData",
        ]}
        apps={apps}
        lang={lang}
      />

      {/* Rendering */}
      <Group
        id="rendering"
        display={t("compare.group.header.rendering")}
        params={["rendererOutputFormats"]}
        apps={apps}
        lang={lang}
      />

      {/* Accessibility */}
      <Group
        id="accessibility"
        display={t("compare.group.header.accessibility")}
        params={[
          "accessibility",
          "textOnlyUI",
          "brailleUI",
          "explorerMode",
          "publicTransportMode",
          "dangerWarnings",
          "screenReader",
          "screenReaderLang",
        ]}
        apps={apps}
        lang={lang}
      />
    </>
  );
}
