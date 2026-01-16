import React from "react";
import { App } from "../../../shared/data/App";
import { Unknown } from "./Unknown";

export function Param({
  apps,
  label,
  description,
  value,
  group = "",
  more = false,
  centered = false,
  focus = false,
}: {
  apps: App[];
  label: string | undefined;
  description: string | undefined;
  value: (app: App) => JSX.Element | null;
  group?: string | undefined;
  more?: boolean | undefined;
  centered?: boolean | undefined;
  focus?: boolean | undefined;
}) {
  const values = apps.map((app) => value(app));

  if (values.filter((v) => v).length === 0) {
    return null;
  }

  const element = (
    <div className={`row ${group} ${focus ? "focus" : ""}`}>
      <div className="cell header param-title" title={description}>
        {label}
      </div>
      {values.map((v, i) => (
        <React.Fragment key={i}>
          {more ? (
            <div
              className={`cell param-text${
                centered ? "text-center align-middle" : ""
              }`}
            >
              <div className="dynamic-more">{v || <Unknown />}</div>
            </div>
          ) : (
            <div
              className={`cell param-text${
                centered ? "text-center align-middle" : ""
              }`}
            >
              {v || <Unknown />}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return element;
}
