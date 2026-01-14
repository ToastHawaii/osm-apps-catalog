import { round } from "lodash";
import { App } from "../../../shared/data/App";
import {
  display,
  edit,
  mobile,
  navigation,
  web,
} from "../../../shared/utilities/filters";
import { strip } from "../../../shared/utilities/string";

export function toSchemaOrg(app: App) {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": mobile(app)
      ? "MobileApplication"
      : web(app)
        ? "WebApplication"
        : "SoftwareApplication",
    name: app.name || undefined,
    description: strip(app.description) || undefined,
    keywords: app.topics.join(","),
    image: app.logos[0] || undefined,
    screenshot: app.images[0] || undefined,
    url: app.website || undefined,
    installUrl: app.install.fDroidID
      ? "https://f-droid.org/repository/browse/?fdid=" + app.install.fDroidID
      : app.install.googlePlayID
        ? "https://play.google.com/store/apps/details?id=" +
          app.install.googlePlayID
        : app.install.asin
          ? "https://www.amazon.com/dp/" + app.install.asin
          : app.install.appleStoreID
            ? "https://apps.apple.com/app/" +
              app.install.appleStoreID?.toUpperCase().startsWith("ID")
              ? app.install.appleStoreID
              : `id${app.install.appleStoreID}`
            : app.install.macAppStoreID
              ? "https://apps.apple.com/app/" +
                app.install.macAppStoreID?.toUpperCase().startsWith("ID")
                ? app.install.macAppStoreID
                : `id${app.install.macAppStoreID}`
              : app.install.microsoftAppID
                ? "https://apps.microsoft.com/detail/" +
                  app.install.microsoftAppID
                : app.install.huaweiAppGalleryID
                  ? "https://appgallery.huawei.com/#/app/" +
                    app.install.huaweiAppGalleryID
                  : undefined,
    datePublished: app.lastRelease || undefined,
    license: app.license?.map((l) => strip(l))?.join(",") || undefined,
    applicationCategory: display(app)
      ? "TravelApplication"
      : navigation(app)
        ? "DriverApplication"
        : edit(app)
          ? "UtilitiesApplication"
          : "TravelApplication",
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
