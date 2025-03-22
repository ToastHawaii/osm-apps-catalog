import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { App } from "../../../data/App";
import { chain } from "lodash";

import "./styles.scss";

function Suggestions({ apps }: { apps: App[] }) {
  const topics = chain(apps)
    .flatMap((a) => a.topics)
    .groupBy((t) => t.toUpperCase())
    .orderBy((t) => t.length)
    .reverse()
    .map((t) => t[0])
    .value();

  return (
    <datalist id="search-suggestions">
      {topics.map((topic) => (
        <option key={topic} value={topic} />
      ))}
    </datalist>
  );
}

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

  const [hasFocus, setHasFocus] = useState(false);
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    if (hasFocus) {
      return;
    }
    setInnerValue(value);
  }, [hasFocus, value]);

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
        onFocus={() => {
          setHasFocus(true);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          onBlur?.(e.currentTarget.value);
        }}
      />
      <Suggestions apps={apps} />
    </>
  );
}
