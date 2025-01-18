import React from "react";
import { useTranslation } from "react-i18next";

import { App } from "../../../data/App";

import "./styles.scss";

export function Search({
  apps,
  onInput,
  onBlur,
}: {
  apps: App[];
  onInput: () => void;
  onBlur: () => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <input
        type="search"
        id="search"
        className="filter hidden"
        placeholder={t("filter.search")}
        autoComplete="on"
        list="search-suggestions"
        onInput={onInput}
        onBlur={onBlur}
      />
      <datalist id="search-suggestions">
        {[...new Set(apps.flatMap((a) => a.topics))].sort().map((topic) => (
          <option value={topic} />
        ))}
      </datalist>
    </>
  );
}
