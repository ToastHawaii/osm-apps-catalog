import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";
import { App } from "@shared/data/App";
import { prepareArrayForSelect } from "../../utilities/prepareArrayForSelect";
import { difference, isEqual } from "lodash";

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

  const data = selected.slice();

  data.push(...apps.flatMap((app) => app.topics.map((v) => v)));
  const preparedData = prepareArrayForSelect(data, selected);

  return (
    <SlimSelect
      className="ss-and"
      data={preparedData}
      multiple
      settings={{
        placeholderText: t("filter.topic"),
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
          if ((window as any).goatcounter && onlyNewValues.length > 0) {
            (window as any).goatcounter.count({
              path: `/?topics=${onlyNewValues.join()}`,
              title: "Has selected a topic.",
              referrer: "https://osm-apps.org/",
              event: true,
            });
          }
          onChange(newValues);
        },
      }}
    ></SlimSelect>
  );
}
