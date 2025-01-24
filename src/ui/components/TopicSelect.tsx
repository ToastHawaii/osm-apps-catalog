import React from "react";
import { useTranslation } from "react-i18next";
import { SlimSelect } from "./SlimSelect";
import { App } from "../../data/App";
import { prepareArrayForSelect } from "../../utilities/prepareArrayForSelect";

export function TopicSelect({
  apps,
  selected = [],
  onChange,
}: {
  apps: App[];
  selected: string[];
  onChange: (newValues: string[]) => void;
}) {
  const { t } = useTranslation();

  const data: string[] = selected.slice();

  data.push(...apps.flatMap((a) => a.topics.map((t) => t)));

  return (
    <SlimSelect
      className="filter hidden"
      data={prepareArrayForSelect(data, selected)}
      selected={selected}
      multiple
      settings={{
        placeholderText: t("filter.topic"),
      }}
      events={{
        afterChange: (newValues) => {
          onChange(newValues.map((v) => v.value));
        },
      }}
    ></SlimSelect>
  );
}
