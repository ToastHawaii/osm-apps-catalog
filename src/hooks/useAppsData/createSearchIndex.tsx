import { normalizeSearchText } from "@lib/utils/normalizeSearchText";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utils/plainText";
import { TFunction } from "i18next";

export function createSearchIndex(
  apps: App[],
  t: TFunction<"translation", undefined>,
): App[] {
  return apps.map((app) => ({
    ...app,
    cache: {
      ...app.cache,
      search: normalizeSearchText(
        [
          app.name,
          plainText(app.subtitle || ""),
          plainText(app.description),
          plainText(app.descriptionShort || ""),
          ...app.tags.map((tag) => t(`app.tag.${tag}`)),
          ...app.topics,
          ...app.platform,
          ...app.languages,
          ...app.coverage,
          ...(app.programmingLanguages || []),
        ].join(" "),
      ),
    },
  }));
}
