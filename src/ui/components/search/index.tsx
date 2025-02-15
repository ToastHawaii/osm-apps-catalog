import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { App } from "../../../data/App";
import { equalsIgnoreCase } from "../../../utilities/string";
import { orderBy } from "lodash";

import "./styles.scss";

export function prepareArray(names: string[]) {
  names.sort(function (a, b) {
    if (a?.toUpperCase() < b?.toUpperCase()) return 1;
    if (a?.toUpperCase() > b?.toUpperCase()) return -1;
    return 0;
  });
  const nameCounts: { name: string; count: number }[] = [];
  for (const name of names) {
    const nameCountFiltered = nameCounts.filter((nc) =>
      equalsIgnoreCase(nc.name, name)
    );

    if (nameCountFiltered.length > 0) {
      nameCountFiltered[0].count++;
    } else {
      nameCounts.push({ name: name, count: 1 });
    }
  }

  return orderBy(nameCounts, "count", "desc").map((nc) => nc.name);
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

  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const topics = prepareArray(apps.flatMap((a) => a.topics));
  return (
    <>
      <input
        type="search"
        id="search"
        className="filter"
        placeholder={t("filter.search")}
        autoComplete="on"
        list="search-suggestions"
        defaultValue={innerValue}
        onChange={(e) => {
          setInnerValue(e.currentTarget.value);
          onChange(e.currentTarget.value);
        }}
        onBlur={(e) => {
          onBlur?.(e.currentTarget.value);
        }}
      />
      <datalist id="search-suggestions">
        {topics.map((topic) => (
          <option key={topic} value={topic} />
        ))}
      </datalist>
    </>
  );
}
