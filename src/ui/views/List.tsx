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
import { Image } from "../components/Image";
import { Score } from "../components/Score";
import { getMatrix } from "../utilities/getMatrix";
import { App } from "../../data/App";
import { Trans, useTranslation } from "react-i18next";
import { SourceDisplay } from "../components/SourceDisplay";
import { State } from "../../State";

export function List({
  app,
  state,
  open = false,
}: {
  app: App;
  open: boolean;
  state?: State;
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);

  const link = new URLSearchParams();
  link.set("app", "" + app.id);
  return (
    <div className={"app" + (open ? " app-page" : "")}>
      <div className="header">
        <div className="with-corner-badge">
          <Score app={app} />
          <h4>
            {app.website ? (
              <a href={app.website} target="_blank">
                {app.name}
              </a>
            ) : (
              app.name
            )}
          </h4>
        </div>
        {app.website ? (
          <a href={app.website} target="_blank" title={app.name}>
            <Image app={app} />
          </a>
        ) : (
          <Image app={app} />
        )}
      </div>

      <p>
        <span dangerouslySetInnerHTML={{ __html: app.description }}></span>
        {app.documentation && (
          <>
            {" "}
            <a href={app.documentation} target="_blank">
              {t("list.documentation")}
            </a>
          </>
        )}
      </p>

      {app.website && (
        <a className="download" href={app.website} title={t("app.website")}>
          <i className="far fa-map fa-fw"></i>
        </a>
      )}

      {app.install.asin && (
        <a
          className="download"
          href={`https://www.amazon.com/dp/${app.install.asin}`}
          title={t("app.install.asin")}
        >
          <i className="fab fa-amazon fa-fw"></i>
        </a>
      )}

      {app.install.fDroidID && (
        <a
          className="download"
          href={`https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID}`}
          title={t("app.install.fDroid")}
        >
          <i className="fab fa-android fa-fw"></i>
        </a>
      )}

      {app.install.obtainiumLink && (
        <a
          className="download"
          href={app.install.obtainiumLink}
          title={t("app.install.obtainium")}
        >
          <i
            className="fas fa-gem fa-fw"
            style={{ transform: "rotate(315deg)" }}
          ></i>
        </a>
      )}

      {app.install.googlePlayID && (
        <a
          className="download"
          href={`https://play.google.com/store/apps/details?id=${app.install.googlePlayID}`}
          title={t("app.install.googlePlay")}
        >
          <i className="fab fa-google-play fa-fw"></i>
        </a>
      )}

      {app.install.huaweiAppGalleryID && (
        <a
          className="download"
          href={`https://appgallery.huawei.com/#/app/${app.install.huaweiAppGalleryID}`}
          title={t("app.install.huaweiAppGallery")}
        >
          <i className="fas fa-shopping-bag fa-fw"></i>
        </a>
      )}

      {app.install.appleStoreID && (
        <a
          className="download"
          href={`https://apps.apple.com/app/${
            app.install.appleStoreID.toUpperCase().startsWith("ID")
              ? app.install.appleStoreID
              : `id${app.install.appleStoreID}`
          }`}
          title={t("app.install.appleStore")}
        >
          <i className="fab fa-app-store-ios fa-fw"></i>
        </a>
      )}

      {app.install.macAppStoreID && (
        <a
          className="download"
          href={`https://apps.apple.com/app/${
            app.install.macAppStoreID.toUpperCase().startsWith("ID")
              ? app.install.macAppStoreID
              : `id${app.install.macAppStoreID}`
          }`}
          title={t("app.install.macAppStore")}
        >
          <i className="fab fa-app-store fa-fw"></i>
        </a>
      )}
      {app.install.microsoftAppID && (
        <a
          className="download"
          href={`https://apps.microsoft.com/detail/${app.install.microsoftAppID}`}
          title={t("app.install.microsoftApp")}
        >
          <i className="fab fa-microsoft fa-fw"></i>
        </a>
      )}

      <div className="badges">
        <Badges values={app.topics} />
      </div>

      {!isOpen ? (
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
      ) : (
        <div className="more-infos">
          <div className="more-infos-title">{t("list.moreInfos")}</div>

          {app.platform.length > 0 && (
            <div
              className={`more-info${
                !!state?.platforms.length ? " focus" : ""
              }`}
            >
              <span className="more-info-title">{t("app.platforms")}</span>
              <span className="more-info-text">{app.platform.join(", ")}</span>
            </div>
          )}
          {(app.lastRelease || app.unmaintained) && (
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

          {app.languagesUrl ? (
            <a
              className={`more-info${
                !!state?.languages.length || state?.contribute === "translate"
                  ? " focus"
                  : ""
              }`}
              href={app.languagesUrl}
              target="_blank"
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
            app.languages.length > 0 && (
              <div
                className={`more-info${
                  !!state?.languages.length ? " focus" : ""
                }`}
              >
                <span className="more-info-title">{t("app.languages")}</span>
                <span className="more-info-text">
                  {app.languages.join(", ")}
                </span>
              </div>
            )
          )}
          {app.coverage && app.coverage.length > 0 && (
            <div
              className={`more-info${!!state?.coverage.length ? " focus" : ""}`}
            >
              <span className="more-info-title">{t("app.coverage")}</span>
              <span className="more-info-text">
                {app.coverage[app.coverage.length - 1]}
              </span>
            </div>
          )}
          {Object.values(app.community).filter((v) => v).length > 0 && (
            <div
              className={`more-info${
                state?.contribute === "discuss" || state?.contribute === "test"
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
                    title={t("app.community.forum")}
                  >
                    <i className="fas fa-comments fa-fw"></i>
                  </a>
                )}
                {app.community.forumTag && (
                  <a
                    className="community"
                    href={`https://community.openstreetmap.org/tag/${app.community.forumTag}`}
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
                    title={t("app.community.matrix")}
                  >
                    <i>[m]</i>
                  </a>
                )}
                {app.community.mastodon && (
                  <a
                    className="community"
                    href={`https://fedirect.toolforge.org/?id=${app.community.mastodon}`}
                    title={t("app.community.mastodon")}
                  >
                    <i className="fab fa-mastodon fa-fw"></i>
                  </a>
                )}
                {app.community.bluesky && (
                  <a
                    className="community"
                    href={`https://bsky.app/profile/${app.community.bluesky}`}
                    title={t("app.community.bluesky")}
                  >
                    <img src="/icons/bluesky.svg" height="18px" alt="Bluesky" />
                  </a>
                )}
                {app.community.reddit && (
                  <a
                    className="community"
                    href={`https://www.reddit.com/r/${app.community.reddit}`}
                    title={t("app.community.reddit")}
                  >
                    <i className="fab fa-reddit fa-fw"></i>
                  </a>
                )}
                {app.community.slack && (
                  <a
                    className="community"
                    href={app.community.slack}
                    title={t("app.community.slack")}
                  >
                    <i className="fab fa-slack-hash fa-fw"></i>
                  </a>
                )}
                {app.community.telegram && (
                  <a
                    className="community"
                    href={`https://telegram.me/${app.community.telegram}`}
                    title={t("app.community.telegram")}
                  >
                    <i className="fab fa-telegram fa-fw"></i>
                  </a>
                )}
                {app.community.githubDiscussions && (
                  <a
                    className="community"
                    href={`https://github.com/${app.community.githubDiscussions}/discussions`}
                    title={t("app.community.githubDiscussions")}
                  >
                    <i className="fab fa-github fa-fw"></i>
                  </a>
                )}
                {app.community.issueTracker && (
                  <a
                    className="community"
                    href={app.community.issueTracker}
                    title={t("app.community.issueTracker")}
                  >
                    <i className="fas fa-list fa-fw"></i>
                  </a>
                )}
              </span>
            </div>
          )}

          {app.author && (
            <div className="more-info">
              <span className="more-info-title">{t("app.author")}</span>
              <span
                className="more-info-text"
                dangerouslySetInnerHTML={{ __html: app.author }}
              ></span>
            </div>
          )}

          {app.price && (
            <div className="more-info">
              <span className="more-info-title">{t("app.price")}</span>
              <span className="more-info-text">{app.price}</span>
            </div>
          )}

          {app.license && app.license.length > 0 && (
            <div className="more-info">
              <span className="more-info-title">{t("app.license")}</span>
              <span
                className="more-info-text"
                dangerouslySetInnerHTML={{ __html: app.license.join(", ") }}
              ></span>
            </div>
          )}

          {app.sourceCode && (
            <a
              className={`more-info${
                state?.contribute === "develop" ? " focus" : ""
              }`}
              href={app.sourceCode}
              target="_blank"
            >
              <span className="more-info-title">{t("app.sourceCode")}</span>
              <span className="more-info-text">
                <i className="fas fa-code"></i>
              </span>
            </a>
          )}

          <div className={`more-info${
                state?.contribute === "document" ? " focus" : ""
              }`}>
            <span className="more-info-title">{t("app.source")}</span>
            <span className="more-info-text">
              <SourceDisplay app={app} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
