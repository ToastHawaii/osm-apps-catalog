import { lastUpdate } from "@/action/main";
import { getLastMod } from "@/action/utilities/getLastMod";
import { App } from "@/shared/data/App";
import { Readable } from "node:stream";
import { SitemapStream, streamToPromise } from "sitemap";

export async function generateSitemap(apps: App[]) {
  // An array with your links
  const links: {
    url: string;
    priority: number;
    lastmod?: Date;
  }[] = [];

  links.push({
    url: "https://osm-apps.org",
    priority: 1.0,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/docs/",
    priority: 0.9,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=focus",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=latest",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=mobile",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=navigation",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=edit",
    priority: 0.8,
  });
  links.push(
    ...apps.map((app) => ({
      url: `https://osm-apps.org/?app=${app.id}`,
      priority: (app.score / 10) * 0.5 + 0.1,
      lastmod:
        lastUpdate > new Date(getLastMod(app.source[0]))
          ? lastUpdate
          : new Date(getLastMod(app.source[0])),
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
