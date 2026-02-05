import { DialpadSquare01Icon, ListViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { useTranslation } from "react-i18next";

export function ViewSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: "list" | "compare") => void;
}) {
  const { t } = useTranslation();

  return (
    <form
      id="view"
      style={{
        margin: "10px 0",
      }}
    >
      <label htmlFor="listView" className="radio-btn">
        <input
          type="radio"
          id="listView"
          name="view"
          value="List"
          checked={value === "list" || value === "app"}
          onChange={(e) => {
            onChange(e.currentTarget.checked ? "list" : "compare");
          }}
        />
        <span className="whitespace-nowrap">
          <HugeiconsIcon
            size={16}
            className="inline-block align-middle"
            icon={DialpadSquare01Icon}
            strokeWidth={2}
          />{" "}
          <span className="align-middle">{t("list")}</span>
        </span>
      </label>
      <label htmlFor="compareView" className="radio-btn">
        <input
          type="radio"
          id="compareView"
          name="view"
          value="Compare"
          checked={value === "compare"}
          onChange={(e) => {
            onChange(e.currentTarget.checked ? "compare" : "list");
          }}
        />
        <span className="whitespace-nowrap">
          <HugeiconsIcon
            size={16}
            className="inline-block rotate-90 align-middle"
            icon={ListViewIcon}
            strokeWidth={2}
          />{" "}
          <span className="align-middle">{t("compare")}</span>
        </span>
      </label>
    </form>
  );
}
