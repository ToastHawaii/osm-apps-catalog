import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./styles.scss";

export function Filters({ onChange }: { onChange: (toggle: boolean) => void }) {
  const { t } = useTranslation();

  const [toggle, setToggle] = useState(false);
  return (
    <button
      id="more-filters"
      className="filter hidden"
      onClick={() => {
        setToggle(!toggle);
        onChange(!toggle);
      }}
    >
      {t("filter.moreFilters")}
    </button>
  );
}
