import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { App } from "../../../data/App";

import "./styles.scss";

export function Search({
  apps,
  value,
  onChange,
  onBlur,
}: {
  value: string;
  apps: App[];
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
}) {
  const { t } = useTranslation();

  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <>
      <input
        type="search"
        id="search"
        className="filter"
        placeholder={t("filter.search")}
        autoComplete="on"
        list="search-suggestions"
        value={innerValue}
        onChange={(e) => {
          setInnerValue(e.currentTarget.value);
          onChange(e.currentTarget.value);
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
