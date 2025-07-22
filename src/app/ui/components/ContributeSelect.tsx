import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";
import { difference, isEqual } from "lodash";

export const mapping: { [value: string]: string } = {
  discuss: "app.contribute.toSoftware.discuss",
  test: "app.contribute.toSoftware.test",
  translate: "app.contribute.toSoftware.translate",
  develop: "app.contribute.toSoftware.develop",
  document: "app.contribute.toSoftware.document",

  edit: "app.contribute.toData.edit",
  resolve: "app.contribute.toData.resolve",
  review: "app.contribute.toData.review",
  photos: "app.contribute.toData.photos",
  tracks: "app.contribute.toData.tracks",
  qa: "app.contribute.toData.qa",

  welcome: "app.contribute.toCommunity.welcome",
};

export function ContributeSelect({
  selected = [],
  onChange,
}: {
  selected: string[];
  onChange: (newValues: string[]) => void;
}) {
  const { t } = useTranslation();

  function toOptions(...values: string[]) {
    return values.map((v) => ({
      text: t(mapping[v]),
      value: v,
      selected: selected.includes(v),
    }));
  }

  return (
    <SlimSelect
      className="ss-or"
      settings={{
        showSearch: false,
        placeholderText: t("app.contribute"),
        allowDeselect: true,
      }}
      multiple
      modelValue={selected}
      data={[
        {
          label: t("app.contribute.toSoftware"),
          options: toOptions(
            "discuss",
            "test",
            "translate",
            "develop",
            "document"
          ),
        },
        {
          label: t("app.contribute.toData"),
          options: toOptions(
            "edit",
            "resolve",
            "review",
            "photos",
            "tracks",
            "qa"
          ),
        },
        {
          label: t("app.contribute.toCommunity"),
          options: toOptions("welcome"),
        },
      ]}
      events={{
        afterChange: (newOptions) => {
          const newValues = newOptions.map((o) => o.value);
          if (isEqual(newValues, selected)) {
            return;
          }
          const onlyNewValues = difference(newValues, selected);
          if ((window as any).goatcounter && onlyNewValues.length > 0) {
            (window as any).goatcounter.count({
              path: `/?contribute=${onlyNewValues.join()}`,
              title: "Has selected a contribute filter.",
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
