import React from "react";
import { useTranslation } from "react-i18next";

import "./styles.scss";

export function About() {
  const { t } = useTranslation();

  return (
    <a id="about" className="info" href="/docs/" title={t("about")}>
      <i className="fas fa-info-circle"></i>
    </a>
  );
}
