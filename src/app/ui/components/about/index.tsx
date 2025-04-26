import React from "react";
import { useTranslation } from "react-i18next";

import "./styles.scss";
import i18next from "i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <a
      id="about"
      className="info"
      href={`/docs/${
        i18next.resolvedLanguage !== "en" ? `${i18next.resolvedLanguage}/` : ""
      }`}
      title={t("about")}
    >
      <i className="fas fa-info-circle"></i>
    </a>
  );
}
