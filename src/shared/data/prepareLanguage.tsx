import { uniq } from "lodash";
import { App as AppData } from "./App";
import { languageValueToDisplay } from "../../app/ui/utilities/language";

export function prepareLanguage(apps: AppData[]) {
  apps.forEach((app) => {
    app.languages = uniq(app.languages.map((l) => languageValueToDisplay(l)));
    if (app.accessibility) {
      app.accessibility.screenReaderLang =
        app.accessibility.screenReaderLang.map((l) =>
          languageValueToDisplay(l)
        );
    }
  });
}
