import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";
import { App } from "@shared/data/App";
import { chain, difference, isEqual } from "lodash";

export function TagSelect({
  apps,
  selected = [],
  onChange,
}: {
  apps: App[];
  selected: string[];
  onChange: (newValues: string[]) => void;
}) {
  const { t } = useTranslation();

  const tags = selected.slice();

  tags.push(...apps.flatMap((app) => app.tags));

  const preparedData = chain(tags)
    .groupBy((tag) => tag)
    .map((g) => ({ key: g[0], count: g.length }))
    .sortBy((g) => g.key)
    .map((g) => {
      if (selected.filter((s) => g.key === s).length > 0) {
        return {
          value: g.key,
          text: t(`app.tag.${g.key}`),
          html: t(`app.tag.${g.key}`),
          selected: true,
        };
      } else {
        return {
          value: g.key,
          text: t(`app.tag.${g.key}`),
          count: g.count,
          html: `<span class="select-option">(${g.count})</span>${t(`app.tag.${g.key}`)}`,
        };
      }
    })
    .value();

  return (
    <SlimSelect
      className="ss-and"
      data={preparedData}
      multiple
      settings={{
        placeholderText: t("filter.tag"),
        allowDeselect: true,
        showSearch: preparedData.length > 9,
      }}
      events={{
        afterChange: (newOptions) => {
          const newValues = newOptions.map((o) => o.value);
          if (isEqual(newValues, selected)) {
            return;
          }
          const onlyNewValues = difference(newValues, selected);
          if (window.goatcounter && onlyNewValues.length > 0) {
            window.goatcounter.count({
              path: `/?tag=${onlyNewValues.join()}`,
              title: "Has selected a tag.",
              referrer: "https://osm-apps.org/",
              event: true,
            });
          }
          onChange(newValues);
        },
      }}
    />
  );
}
