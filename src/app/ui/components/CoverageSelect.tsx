import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";
import { App } from "../../../shared/data/App";
import { prepareArrayForSelect } from "../../utilities/prepareArrayForSelect";
import { isEqual } from "lodash";

export function CoverageSelect({
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

  data.push(...apps.flatMap((app) => app.coverage.map((v) => v)));
  const preparedData = prepareArrayForSelect(data, selected);

  return (
    <SlimSelect
      className="ss-or"
      data={preparedData}
      multiple
      settings={{
        placeholderText: t("filter.coverage"),
        allowDeselect: true,
        showSearch: preparedData.length > 9,
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
