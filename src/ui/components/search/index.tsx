import React from "react";
import { useTranslation } from "react-i18next";

import { App } from "../../../data/App";

import "./styles.scss";

export function Search({
  apps,
  value,
  onInput,
  onBlur,
}: {
  value:string;
  apps: App[];
  onInput: (value: string) => void;
  onBlur?: (value: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <input
        type="search"
        id="search"
        className="filter"
        placeholder={t("filter.search")}
        autoComplete="on"
        list="search-suggestions"
        defaultValue={value}
        onInput={(e) => {
          onInput(e.currentTarget.value);
        }}
        onBlur={(e) => {
          onBlur?.(e.currentTarget.value);
        }}
      />
      <datalist id="search-suggestions">
        {[...new Set(apps.flatMap((a) => a.topics))].sort().map((topic) => (
          <option key={topic} value={topic} />
        ))}
      </datalist>
    </>
  );
}
