import { App } from "@shared/data/App";
import { AppTranslation } from "@shared/data/AppTranslation";
import { mergeAppSources } from "@shared/lib/mergeAppSources";

export function applyTranslations(
  apps: App[],
  translationsLists: AppTranslation[][],
) {
  translationsLists
    .filter((t) => t.length > 0)
    .forEach((translations) => {
      const translationsMap = new Map(translations.map((t) => [t.id, t]));
      apps = apps.map((app) => {
        const translation = translationsMap.get(app.id);
        if (!translation) return app;

        return {
          ...app,
          name: translation.name || app.name,
          // It is better to have a translated text then a shorter text, so
          // we mix subtitle and description
          subtitle:
            translation.subtitle ||
            translation.descriptionShort ||
            translation.description ||
            app.subtitle,
          description: translation.description || app.description,
          descriptionShort:
            translation.descriptionShort ||
            translation.description ||
            app.descriptionShort,
          documentation: translation.documentation || app.documentation,
          community: { ...app.community, ...translation.community },
          source: mergeAppSources(app.source, translation.source),
        };
      });
    });
  return apps;
}
