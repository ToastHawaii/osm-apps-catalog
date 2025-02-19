import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";
import { App } from "../../data/App";
import { prepareArrayForSelect } from "../../utilities/prepareArrayForSelect";
import { isEqual } from "lodash";

export function PlatformSelect({
  apps,
  selected = [],
  onChange,
}: {
  apps: App[];
  selected: string[];
  onChange: (newValues: string[]) => void;
}) {
  const { t } = useTranslation();

  const data = selected.slice();

  data.push(...apps.flatMap((app) => app.platform.map((v) => v)));

  return (
    <SlimSelect
      className="ss-or"
      data={prepareArrayForSelect(data, selected)}
      multiple
      settings={{
        placeholderText: t("filter.platform"),
        allowDeselect: true,
      }}
      events={{
        afterChange: (newOptions) => {
          const newValues = newOptions.map((o) => o.value);
          if (isEqual(newValues, selected)) {
            return;
          }
          onChange(newValues);
        },
      }}
    ></SlimSelect>
  );
}
