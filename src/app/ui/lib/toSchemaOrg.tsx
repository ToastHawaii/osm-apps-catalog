import { round } from "lodash";

import { App } from "@shared/data/App";
import {
  contribute,
  display,
  mobile,
  navigation,
  web,
} from "@shared/lib/filters";
import { plainText } from "@shared/utils/plainText";
import { getAppleAppStore } from "@shared/utils/links/getAppleAppStore";
import { getMicrosoftStore } from "@shared/utils/links/getMicrosoftStore";
import { getAsin } from "@shared/utils/links/getAsin";
import { getFDroid } from "@shared/utils/links/getFDroid";
import { getGooglePlay } from "@shared/utils/links/getGooglePlay";
import { getHuaweiAppGallery } from "@shared/utils/links/getHuaweiAppGallery";

export function toSchemaOrg(app: App) {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type":
      (mobile(app) ? "MobileApplication" : undefined) ||
      (web(app) ? "WebApplication" : undefined) ||
      "SoftwareApplication",
    name: app.name || undefined,
    description:
      plainText(app.subtitle || app.descriptionShort || app.description) ||
      undefined,
    keywords: app.topics.join(","),
    image: app.logos[0] || undefined,
    screenshot: app.images[0] || undefined,
    url: app.website || undefined,
    installUrl:
      getFDroid(app.install.fDroidID) ||
      getGooglePlay(app.install.googlePlayID) ||
      getAppleAppStore(app.install.appleStoreID || app.install.macAppStoreID) ||
      getMicrosoftStore(app.install.microsoftAppID) ||
      getHuaweiAppGallery(app.install.huaweiAppGalleryID) ||
      getAsin(app.install.asin),
    datePublished: app.lastRelease || undefined,
    license: app.license?.map((l) => plainText(l))?.join(",") || undefined,
    applicationCategory:
      (display(app) ? "TravelApplication" : undefined) ||
      (navigation(app) ? "DriverApplication" : undefined) ||
      (contribute(app) ? "UtilitiesApplication" : undefined) ||
      "TravelApplication",
    applicationSubCategory: app.genre,
    operatingSystem: app.platform.join(", ") || undefined,
    offers: app.gratis
      ? {
          "@type": "Offer",
          price: "0",
        }
      : undefined,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        bestRating: "10",
        worstRating: "0",
        ratingValue: round(app.score),
      },
      author: {
        "@type": "Organization",
        name: "OSM Apps Catalog",
        url: "https://osm-apps.org/",
      },
    },
  });
}
