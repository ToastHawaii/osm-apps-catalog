import { mergeAppSources } from "@shared/lib/mergeAppSources";
import { App } from "@shared/data/App";
import { merge, mergeWith, uniqBy } from "lodash";
import { shorterThenLength } from "@shared/utils/string";

export function mergeApps(
  app: App,
  obj: App,
  options: {
    onlyAddLanguageIfEmpty: boolean;
  },
) {
  if (app.lastRelease && obj.lastRelease && app.lastRelease < obj.lastRelease) {
    app.lastRelease = obj.lastRelease;
  } else {
    app.lastRelease = app.lastRelease || obj.lastRelease;
  }

  app.unmaintained = mergeBoolean(app.unmaintained, obj.unmaintained);

  app.subtitle = app.subtitle || obj.subtitle;

  app.description = app.description || obj.description;
  // a shorter version from the app description would be useful in the overview and at other places
  const descriptionShort = shorterThenLength(
    app.descriptionShort || app.description,
    obj.description,
    60,
  );
  if (app.description !== descriptionShort) {
    app.descriptionShort = descriptionShort;
  }
  app.images = mergeValues(app.images, obj.images, { sort: false });
  app.logos = mergeValues(app.logos, obj.logos, { sort: false });
  app.imageWiki = app.imageWiki || obj.imageWiki;
  app.commons = mergeValues(app.commons, obj.commons, { sort: false });
  app.videos = mergeValues(app.videos, obj.videos, { sort: false });

  app.website = app.website || obj.website;

  app.documentation = app.documentation || obj.documentation;

  app.coverage = mergeValues(app.coverage, obj.coverage, { sort: false });

  app.source = mergeAppSources(app.source, obj.source);

  app.author = app.author || obj.author;

  app.gratis = mergeBoolean(app.gratis, obj.gratis);
  app.libre = mergeBoolean(app.libre, obj.libre);
  app.price = app.price || obj.price;

  app.license = mergeValues(app.license, obj.license, { sort: true });

  app.sourceCode = app.sourceCode || obj.sourceCode;
  app.programmingLanguages = mergeValues(
    app.programmingLanguages,
    obj.programmingLanguages,
    { sort: true },
  );

  if (!options.onlyAddLanguageIfEmpty || app.languages.length === 0) {
    app.languages = mergeValues(app.languages, obj.languages, { sort: true });
  }

  app.languagesUrl = app.languagesUrl || obj.languagesUrl;

  app.genre = mergeValues(app.genre, obj.genre, { sort: true });
  app.topics = mergeValues(app.topics, obj.topics, { sort: true });

  app.platform = mergeValues(app.platform, obj.platform, { sort: true });

  app.install = merge(app.install, obj.install);

  app.map = mergeFeatures(app.map, obj.map);
  app.routing = mergeFeatures(app.routing, obj.routing);
  app.navigating = mergeFeatures(app.navigating, obj.navigating);
  app.tracking = mergeFeatures(app.tracking, obj.tracking);
  app.monitoring = mergeFeatures(app.monitoring, obj.monitoring);
  app.editing = mergeFeatures(app.editing, obj.editing);
  app.rendering = mergeFeatures(app.rendering, obj.rendering);
  app.accessibility = mergeFeatures(app.accessibility, obj.accessibility);

  app.hasGoal = {
    crowdsourcingStreetLevelImagery: mergeBoolean(
      app.hasGoal?.crowdsourcingStreetLevelImagery,
      obj.hasGoal?.crowdsourcingStreetLevelImagery,
    ),
  };

  app.community = merge(app.community, obj.community);
}

function mergeBoolean(b1: boolean | undefined, b2: boolean | undefined) {
  if (typeof b1 === "boolean") return b1;
  return b2;
}

function mergeValues(
  v1: string[] | undefined,
  v2: string[] | undefined,
  options: { sort: boolean },
): string[] {
  const merged = uniqBy([...(v1 || []), ...(v2 || [])], (v) => v.toUpperCase());
  if (!options?.sort) {
    return merged;
  }
  return merged.sort();
}

/**
 * Merges two objects with string array values, removing duplicates.
 */
function mergeFeatures<T extends Record<string, string | string[]>>(
  o1: T | undefined,
  o2: T | undefined,
): T | undefined {
  if (!o1 && !o2) return undefined;
  if (!o1) return o2;
  if (!o2) return o1;

  return mergeWith({}, o1, o2, (objValue, srcValue) => {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      // Concatenate and remove duplicates
      return mergeValues(objValue, srcValue, { sort: false });
    }
    // Default merging otherwise
    return undefined;
  });
}
