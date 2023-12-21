import i18next from "i18next";
import { App } from "../../data/template/utilities";

export function renderFree(app: App) {
  return app.gratis || app.libre
    ? `<div class="corner-badge">
        <span title="${i18next.t("app.free")}"><i class="fas fa-fw fa-gift"></i></span>
        ${
          app.libre
            ? `<span title="${i18next.t("libre")}"><i class="fas fa-fw fa-book-open"></i></span>`
            : app.gratis
            ? `<span title="${i18next.t("proprietary")}"><i class="fas fa-wine-bottle"></i></span>`
            : ""
        }
      </div>`
    : "";
}
