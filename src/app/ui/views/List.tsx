import React, { useState } from "react";
import { Badges } from "../components/Badges";
import { AppImage } from "@components/common/AppImage";
import { AppImagesCarousel } from "@components/common/AppImagesCarousel";
import { Score } from "../components/Score";
import { App } from "@shared/data/App";
import { Trans, useTranslation } from "react-i18next";
import { SourceDisplay } from "../components/SourceDisplay";
import { State } from "../State";
import { WebsiteLink } from "../components/links/download/WebsiteLink";
import { AsinLink } from "../components/links/download/AsinLink";
import { FDroidLink } from "../components/links/download/FDroidLink";
import { ObtainiumLink } from "../components/links/download/ObtainiumLink";
import { GooglePlayLink } from "../components/links/download/GooglePlayLink";
import { HuaweiAppGalleryLink } from "../components/links/download/HuaweiAppGalleryLink";
import { AppleStoreLink } from "../components/links/download/AppleStoreLink";
import { MacAppStoreLink } from "../components/links/download/MacAppStoreLink";
import { MicrosoftAppLink } from "../components/links/download/MicrosoftAppLink";
import { SourceCodeLink } from "../components/links/download/SourceCodeLink";
import { IssueTrackerLink } from "../components/links/community/IssueTrackerLink";
import { GitHubDiscussionsLink } from "../components/links/community/GitHubDiscussionsLink";
import { TelegramLink } from "../components/links/community/TelegramLink";
import { SlackLink } from "../components/links/community/SlackLink";
import { RedditLink } from "../components/links/community/RedditLink";
import { BlueskyLink } from "../components/links/community/BlueskyLink";
import { LemmyLink } from "../components/links/community/LemmyLink";
import { MastodonLink } from "../components/links/community/MastodonLink";
import { MatrixLink } from "../components/links/community/MatrixLink";
import { ForumTagLink } from "../components/links/community/ForumTagLink";
import { ForumLink } from "../components/links/community/ForumLink";
import { useGoatCounterEvents } from "../../../hooks/useGoatCounterEvents";
import { plainText } from "@shared/utils/plainText";
import { ExternalLink } from "@components/common/ExternalLink";

export function List({
  app,
  state,
  open = false,
  isInitState,
}: {
  app: App;
  open: boolean;
  state?: State;
  isInitState?: (key?: string | undefined) => boolean;
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);
  const [carouselShown, setCarouselShown] = useState(false);

  useGoatCounterEvents();

  const link = new URLSearchParams();
  link.set("view", "app");
  link.set("app", "" + app.id);
  return (
    <div className={"app" + (open ? " app-page" : "")}>
      <div className="header">
        <div className="with-corner-badge">
          <Score app={app} />
          <h4 className="font-bold">
            {app.website ? (
              <ExternalLink href={app.website}>{app.name}</ExternalLink>
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
          <AppImage app={app} />
        </div>
        {carouselShown && (
          <AppImagesCarousel
            app={app}
            onClose={(e) => {
              e.preventDefault();
              setCarouselShown(false);
            }}
          />
        )}
      </div>

      <p>
        <span
          dangerouslySetInnerHTML={{
            __html: app.description || app.subtitle || "",
          }}
        ></span>
        {app.documentation && (
          <>
            {plainText(app.description || app.subtitle || "")
              ? plainText(app.description || app.subtitle || "").endsWith(".")
                ? " "
                : " – "
              : ""}
            <ExternalLink href={app.documentation}>
              {t("list.documentation")}
            </ExternalLink>
          </>
        )}
      </p>
      {(!!app.website ||
        !!app.install.fDroidID ||
        !!app.install.obtainiumLink ||
        !!app.install.googlePlayID ||
        !!app.install.asin ||
        !!app.install.huaweiAppGalleryID ||
        !!app.install.appleStoreID ||
        !!app.install.macAppStoreID ||
        !!app.install.microsoftAppID ||
        !!app.sourceCode) && (
        <span className="downloads">{t("app.getIt")}</span>
      )}
      <WebsiteLink app={app} />
      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Android")) && (
        <>
          <FDroidLink app={app} />
          <ObtainiumLink app={app} />
          <GooglePlayLink app={app} />
          <AsinLink app={app} />
          <HuaweiAppGalleryLink app={app} />
        </>
      )}
      {(state?.platforms.length === 0 || state?.platforms.includes("iOS")) && (
        <AppleStoreLink app={app} />
      )}

      {(state?.platforms.length === 0 ||
        state?.platforms.includes("MacOS")) && <MacAppStoreLink app={app} />}
      {(state?.platforms.length === 0 ||
        state?.platforms.includes("Windows")) && <MicrosoftAppLink app={app} />}
      {!app.website &&
        !app.install.asin &&
        !app.install.fDroidID &&
        !app.install.obtainiumLink &&
        !app.install.googlePlayID &&
        !app.install.huaweiAppGalleryID &&
        !app.install.appleStoreID &&
        !app.install.macAppStoreID &&
        !app.install.microsoftAppID &&
        !!app.sourceCode && <SourceCodeLink app={app} />}

      <div className="badges">
        <Badges values={app.topics} />
      </div>

      <div className="more-infos"></div>
      {isOpen && <div className="more-infos-title">{t("list.moreInfos")}</div>}
      {(isOpen || (!!state?.platforms.length && !isInitState?.("platforms"))) &&
        app.platform.length > 0 && (
          <div
            className={`more-info ${
              !!state?.platforms.length && !isInitState?.("platforms")
                ? "focus"
                : ""
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
        (!!state?.languages.length && !isInitState?.("languages")) ||
        state?.contribute.includes("translate")) &&
      app.languagesUrl ? (
        <ExternalLink
          className={`more-info ${
            (!!state?.languages.length && !isInitState?.("languages")) ||
            state?.contribute.includes("translate")
              ? "focus"
              : ""
          }`}
          href={app.languagesUrl}
          data-goatcounter-click="/app/translation-contribution"
          data-goatcounter-title="Goes to the translation contribution page of an app."
          data-goatcounter-referrer="https://osm-apps.org/"
        >
          <span className="more-info-title">{t("app.languages")}</span>
          <span className="more-info-text">
            {app.languages.length > 0 ? (
              app.languages.join(", ")
            ) : (
              <i className="fas fa-language"></i>
            )}
          </span>
        </ExternalLink>
      ) : (
        (isOpen ||
          (!!state?.languages.length && !isInitState?.("languages"))) &&
        app.languages.length > 0 && (
          <div
            className={`more-info ${
              !!state?.languages.length && !isInitState?.("languages")
                ? "focus"
                : ""
            }`}
          >
            <span className="more-info-title">{t("app.languages")}</span>
            <span className="more-info-text">{app.languages.join(", ")}</span>
          </div>
        )
      )}
      {(isOpen || (!!state?.coverage.length && !isInitState?.("coverage"))) &&
        app.coverage.length > 0 && (
          <div
            className={`more-info ${
              !!state?.coverage.length && !isInitState?.("coverage")
                ? "focus"
                : ""
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
            className={`more-info ${
              state?.contribute.includes("discuss") ||
              state?.contribute.includes("test")
                ? "focus"
                : ""
            }`}
          >
            <span className="more-info-title">{t("app.community")}</span>
            <span className="more-info-text">
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
        <ExternalLink
          className={`more-info ${
            state?.contribute.includes("develop") ? "focus" : ""
          }`}
          href={app.sourceCode}
          data-goatcounter-click="/app/source-code"
          data-goatcounter-title="Goes to source code of an app."
          data-goatcounter-referrer="https://osm-apps.org/"
        >
          <span className="more-info-title">{t("app.sourceCode")}</span>
          <span className="more-info-text">
            <i className="fas fa-code"></i>
          </span>
        </ExternalLink>
      )}

      {(isOpen || state?.contribute.includes("document")) && (
        <div
          className={`more-info ${
            state?.contribute.includes("document") ? "focus" : ""
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
