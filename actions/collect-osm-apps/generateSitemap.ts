import { getLastMod } from "@actions/lib/getLastMod";
import { routeFactory } from "@lib/routeFactory";
import { App } from "@shared/data/App";
import { SitemapLanguages } from "@shared/lib/SupportedLanguages";
import { Readable } from "node:stream";
import { SitemapStream, streamToPromise } from "sitemap";

// Used to inform search engines about the last update of the
// website, so they know when to crawl again.
export const lastUpdate = new Date("2026-02-19");

export async function generateSitemap(apps: App[]) {
  // An array with your links
  const links: {
    url: string;
    priority: number;
    lastmod?: Date;
    links: { lang: string; url: string }[];
  }[] = [];

  const routes = routeFactory();

  links.push({
    url: routes.home({}),
    priority: 1.0,
    lastmod: lastUpdate,
    links: SitemapLanguages.map((lang) => ({
      lang,
      url: routes.home({ lang }),
    })),
  });
  links.push({
    url: routes.docs(),
    priority: 0.9,
    lastmod: lastUpdate,
    links: SitemapLanguages.map((lang) => ({
      lang,
      url: routes.docs({ lang }),
    })),
  });
  links.push(
    ...apps.map((app) => ({
      url: routes.app({ app: app.id }),
      priority: (app.score / 10) * 0.5 + 0.1,
      lastmod:
        lastUpdate > new Date(getLastMod(app.source[0]))
          ? lastUpdate
          : new Date(getLastMod(app.source[0])),
      links: SitemapLanguages.map((lang) => ({
        lang,
        url: routes.app({ app: app.id, lang }),
      })),
    })),
  );

  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: "https://osm-apps.org",
  });

  // Return a promise that resolves with your XML string
  const data = await streamToPromise(Readable.from(links).pipe(stream));
  return data.toString();
}
