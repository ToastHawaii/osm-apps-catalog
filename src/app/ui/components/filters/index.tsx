import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./styles.scss";

export function Filters({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (toggle: boolean) => void;
}) {
  const { t } = useTranslation();

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(active);
  }, [active]);

  return (
    <button
      id="more-filters"
      className={"filter" + (active ? " active" : "")}
      onClick={() => {
        setToggle(!toggle);
        onChange(!toggle);
      }}
    >
      {t("filter.moreFilters")}
    </button>
  );
}
