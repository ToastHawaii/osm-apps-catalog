import React from "react";
import { useTranslation } from "react-i18next";

export function ViewSelect({
  onChange,
}: {
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
          checked={true}
          onInput={(e) => {
            onChange(e.currentTarget.checked ? "list" : "compare");
          }}
        />
        <span>
          <i className="fas fa-th"></i> {t("list")}
        </span>
      </label>
      <label htmlFor="compareView" className="radio-btn">
        <input
          type="radio"
          id="compareView"
          name="view"
          value="Compare"
          onInput={(e) => {
            onChange(e.currentTarget.checked ? "compare" : "list");
          }}
        />
        <span>
          <i className="fas fa-bars fa-rotate-90"></i> {t("compare")}
        </span>
      </label>
    </form>
  );
}
