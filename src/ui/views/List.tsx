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

import React, { useState } from "react";
import { Badges } from "../components/Badges";
import { Carousel, Image } from "../components/Image";
import { Score } from "../components/Score";
import { getMatrix } from "../utilities/getMatrix";
import { App } from "../../data/App";
import { Trans, useTranslation } from "react-i18next";
import { SourceDisplay } from "../components/SourceDisplay";
import { State } from "../../State";
import { getMastodon } from "../utilities/getMastodon";
import { getLemmy } from "../utilities/getLemmy";

export function List({
  app,
  state,
  open = false,
  isInitState,
}: {
  app: App;
  open: boolean;
  state?: State;
  isInitState?: boolean;
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);
  const [carouselShown, setCarouselShown] = useState(false);

  const link = new URLSearchParams();
  link.set("app", "" + app.id);
  return (
    <div className={"app" + (open ? " app-page" : "")}>
      <div className="header">
        <div className="with-corner-badge">
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
        <div
          onClick={(e) => {
            e.preventDefault();
            setCarouselShown(true);
          }}
        >
          <Image app={app} />
        </div>
        {carouselShown && (
          <Carousel
            app={app}
            onClose={(e) => {
              e.preventDefault();
              setCarouselShown(false);
            }}
          />
        )}
      </div>

      <p>
        <span dangerouslySetInnerHTML={{ __html: app.description }}></span>
        {app.documentation && (
          <>
            {" "}
            <a href={app.documentation} target="_blank" rel="noreferrer">
              {t("list.documentation")}
            </a>
          </>
        )}
      </p>
      {(!!app.website ||
        !!app.install.asin ||
        !!app.install.fDroidID ||
        !!app.install.obtainiumLink ||
        !!app.install.googlePlayID ||
        !!app.install.huaweiAppGalleryID ||
        !!app.install.appleStoreID ||
        !!app.install.macAppStoreID ||
        !!app.install.microsoftAppID ||
        !!app.sourceCode) && (
        <span className="downloads">{t("app.getIt")}</span>
      )}
      {app.website && (
        <a
          className="download"
          href={app.website}
          target="_blank"
          rel="noreferrer"
          title={t("app.website")}
        >
          <i className="far fa-map fa-fw"></i>
        </a>
      )}

      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Android")) &&
        app.install.asin && (
          <a
            className="download"
            href={`https://www.amazon.com/dp/${app.install.asin}`}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.asin")}
          >
            <i className="fab fa-amazon fa-fw"></i>
          </a>
        )}

      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Android")) &&
        app.install.fDroidID && (
          <a
            className="download"
            href={`https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID}`}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.fDroid")}
          >
            <i className="fab fa-android fa-fw"></i>
          </a>
        )}

      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Android")) &&
        app.install.obtainiumLink && (
          <a
            className="download"
            href={app.install.obtainiumLink}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.obtainium")}
          >
            <i
              className="fas fa-gem fa-fw"
              style={{ transform: "rotate(315deg)" }}
            ></i>
          </a>
        )}

      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Android")) &&
        app.install.googlePlayID && (
          <a
            className="download"
            href={`https://play.google.com/store/apps/details?id=${app.install.googlePlayID}`}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.googlePlay")}
          >
            <i className="fab fa-google-play fa-fw"></i>
          </a>
        )}

      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Android")) &&
        app.install.huaweiAppGalleryID && (
          <a
            className="download"
            href={`https://appgallery.huawei.com/#/app/C${app.install.huaweiAppGalleryID}`}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.huaweiAppGallery")}
          >
            <i className="fas fa-shopping-bag fa-fw"></i>
          </a>
        )}

      {(state?.platforms.length === 0 || state?.platforms.includes("iOS")) &&
        app.install.appleStoreID && (
          <a
            className="download"
            href={`https://apps.apple.com/app/id${app.install.appleStoreID}`}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.appleStore")}
          >
            <i className="fab fa-app-store-ios fa-fw"></i>
          </a>
        )}

      {(state?.platforms.length === 0 || state?.platforms.includes("MacOS")) &&
        app.install.macAppStoreID && (
          <a
            className="download"
            href={`https://apps.apple.com/app/id${app.install.macAppStoreID}`}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.macAppStore")}
          >
            <i className="fab fa-app-store fa-fw"></i>
          </a>
        )}
      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Windows")) &&
        app.install.microsoftAppID && (
          <a
            className="download"
            href={`https://apps.microsoft.com/detail/${app.install.microsoftAppID}`}
            target="_blank"
            rel="noreferrer"
            title={t("app.install.microsoftApp")}
          >
            <i className="fab fa-microsoft fa-fw"></i>
          </a>
        )}
      {!app.website &&
        !app.install.asin &&
        !app.install.fDroidID &&
        !app.install.obtainiumLink &&
        !app.install.googlePlayID &&
        !app.install.huaweiAppGalleryID &&
        !app.install.appleStoreID &&
        !app.install.macAppStoreID &&
        !app.install.microsoftAppID &&
        !!app.sourceCode && (
          <a
            className="download"
            href={app.sourceCode}
            target="_blank"
            rel="noreferrer"
            title={t("app.sourceCode")}
          >
            <i className="fas fa-code fa-fw"></i>
          </a>
        )}

      <div className="badges">
        <Badges values={app.topics} />
      </div>

      <div className="more-infos"></div>
      {isOpen && <div className="more-infos-title">{t("list.moreInfos")}</div>}
      {(isOpen || (!!state?.platforms.length && !isInitState)) &&
        app.platform.length > 0 && (
          <div
            className={`more-info${
              !!state?.platforms.length && !isInitState ? " focus" : ""
            }`}
          >
            <span className="more-info-title">{t("app.platforms")}</span>
            <span className="more-info-text">{app.platform.join(", ")}</span>
          </div>
        )}
      {isOpen && (app.lastRelease || app.unmaintained) && (
        <div className="more-info">
          <span className="more-info-title">{t("app.lastRelease")}</span>
          <span className="more-info-text">
            {app.lastRelease ? app.lastRelease : "????-??-??"}
            {app.unmaintained && (
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
            )}
          </span>
        </div>
      )}

      {(isOpen ||
        (!!state?.languages.length && !isInitState) ||
        state?.contribute.includes("translate")) &&
      app.languagesUrl ? (
        <a
          className={`more-info${
            (!!state?.languages.length && !isInitState) ||
            state?.contribute.includes("translate")
              ? " focus"
              : ""
          }`}
          href={app.languagesUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="more-info-title">{t("app.languages")}</span>
          <span className="more-info-text">
            {app.languages.length > 0 ? (
              app.languages.join(", ")
            ) : (
              <i className="fas fa-language"></i>
            )}
          </span>
        </a>
      ) : (
        (isOpen || (!!state?.languages.length && !isInitState)) &&
        app.languages.length > 0 && (
          <div
            className={`more-info${
              !!state?.languages.length && !isInitState ? " focus" : ""
            }`}
          >
            <span className="more-info-title">{t("app.languages")}</span>
            <span className="more-info-text">{app.languages.join(", ")}</span>
          </div>
        )
      )}
      {(isOpen || (!!state?.coverage.length && !isInitState)) &&
        app.coverage.length > 0 && (
          <div
            className={`more-info${
              !!state?.coverage.length && !isInitState ? " focus" : ""
            }`}
          >
            <span className="more-info-title">{t("app.coverage")}</span>
            <span className="more-info-text">
              {app.coverage[app.coverage.length - 1]}
            </span>
          </div>
        )}
      {(isOpen ||
        state?.contribute.includes("discuss") ||
        state?.contribute.includes("test")) &&
        Object.values(app.community).filter((v) => v).length > 0 && (
          <div
            className={`more-info${
              state?.contribute.includes("discuss") ||
              state?.contribute.includes("test")
                ? " focus"
                : ""
            }`}
          >
            <span className="more-info-title">{t("app.community")}</span>
            <span className="more-info-text">
              {app.community.forum && (
                <a
                  className="community"
                  href={app.community.forum}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.forum")}
                >
                  <i className="fas fa-comments fa-fw"></i>
                </a>
              )}
              {app.community.forumTag && (
                <a
                  className="community"
                  href={`https://community.openstreetmap.org/tag/${app.community.forumTag}`}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.forumTag")}
                >
                  <i className="fas fa-tag fa-fw"></i>
                </a>
              )}
              {getMatrix(app.community.matrix, app.community.irc) && (
                <a
                  className="community"
                  href={`https://matrix.to/#/${getMatrix(
                    app.community.matrix,
                    app.community.irc
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.matrix")}
                >
                  <i>[m]</i>
                </a>
              )}
              {app.community.mastodon && (
                <a
                  className="community"
                  href={getMastodon(app.community.mastodon)}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.mastodon")}
                >
                  <i className="fab fa-mastodon fa-fw"></i>
                </a>
              )}
              {app.community.lemmy && (
                <a
                  className="community"
                  href={getLemmy(app.community.lemmy)}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.lemmy")}
                >
                  <img src="/icons/lemmy.svg" alt="Lemmy" height="18px" />
                </a>
              )}
              {app.community.bluesky && (
                <a
                  className="community"
                  href={`https://bsky.app/profile/${app.community.bluesky}`}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.bluesky")}
                >
                  <img src="/icons/bluesky.svg" height="18px" alt="Bluesky" />
                </a>
              )}
              {app.community.reddit && (
                <a
                  className="community"
                  href={`https://www.reddit.com/r/${app.community.reddit}`}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.reddit")}
                >
                  <i className="fab fa-reddit fa-fw"></i>
                </a>
              )}
              {app.community.slack && (
                <a
                  className="community"
                  href={app.community.slack}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.slack")}
                >
                  <i className="fab fa-slack-hash fa-fw"></i>
                </a>
              )}
              {app.community.telegram && (
                <a
                  className="community"
                  href={`https://telegram.me/${app.community.telegram}`}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.telegram")}
                >
                  <i className="fab fa-telegram fa-fw"></i>
                </a>
              )}
              {app.community.githubDiscussions && (
                <a
                  className="community"
                  href={`https://github.com/${app.community.githubDiscussions}/discussions`}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.githubDiscussions")}
                >
                  <i className="fab fa-github fa-fw"></i>
                </a>
              )}
              {app.community.issueTracker && (
                <a
                  className="community"
                  href={app.community.issueTracker}
                  target="_blank"
                  rel="noreferrer"
                  title={t("app.community.issueTracker")}
                >
                  <i className="fas fa-list fa-fw"></i>
                </a>
              )}
            </span>
          </div>
        )}

      {isOpen && app.author && (
        <div className="more-info">
          <span className="more-info-title">{t("app.author")}</span>
          <span
            className="more-info-text"
            dangerouslySetInnerHTML={{ __html: app.author }}
          ></span>
        </div>
      )}

      {isOpen && app.price && (
        <div className="more-info">
          <span className="more-info-title">{t("app.price")}</span>
          <span className="more-info-text">{app.price}</span>
        </div>
      )}
      {isOpen && app.license && app.license.length > 0 && (
        <div className="more-info">
          <span className="more-info-title">{t("app.license")}</span>
          <span
            className="more-info-text"
            dangerouslySetInnerHTML={{ __html: app.license.join(", ") }}
          ></span>
        </div>
      )}

      {(isOpen || state?.contribute.includes("develop")) && app.sourceCode && (
        <a
          className={`more-info${
            state?.contribute.includes("develop") ? " focus" : ""
          }`}
          href={app.sourceCode}
          target="_blank"
          rel="noreferrer"
        >
          <span className="more-info-title">{t("app.sourceCode")}</span>
          <span className="more-info-text">
            <i className="fas fa-code"></i>
          </span>
        </a>
      )}

      {(isOpen || state?.contribute.includes("document")) && (
        <div
          className={`more-info${
            state?.contribute.includes("document") ? " focus" : ""
          }`}
        >
          <span className="more-info-title">{t("app.source")}</span>
          <span className="more-info-text">
            <SourceDisplay app={app} />
          </span>
        </div>
      )}

      {!isOpen && (
        <a
          className="more-infos-button"
          href={`?${link.toString()}`}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          {t("list.more")} <i className="fas fa-angle-down"></i>
        </a>
      )}
    </div>
  );
}
