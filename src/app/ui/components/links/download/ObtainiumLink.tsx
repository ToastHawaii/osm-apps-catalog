import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function ObtainiumLink({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.install.obtainiumLink) {
    return null;
  }

  return (
    <a
      className="download"
      href={app.install.obtainiumLink}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.obtainium")}
    >
      <i
        className="fas fa-gem fa-fw"
        style={{ transform: "rotate(315deg)" }}
      ></i>
    </a>
  );
}
