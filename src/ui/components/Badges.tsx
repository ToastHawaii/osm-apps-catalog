import React from "react";
import { textToColor } from "../../utilities/string";

function Badge({
  value,
  dangerouslySetInnerHTML,
}: {
  value: string;
  dangerouslySetInnerHTML?: boolean | undefined;
}) {
  const background = textToColor(value);

  const yiq =
    (background.r * 299 + background.g * 587 + background.b * 114) / 1000;

  const style = {
    background: `rgb(${background.r},${background.g},${background.b})`,
    color: yiq >= 128 ? "black" : "white",
  };

  return !dangerouslySetInnerHTML ? (
    <span className="badge" style={style}>
      {value}
    </span>
  ) : (
    <span
      className="badge"
      style={style}
      dangerouslySetInnerHTML={{ __html: value }}
    ></span>
  );
}

export function Badges({
  values,
  dangerouslySetInnerHTML = false,
}: {
  values: string | string[] | undefined;
  dangerouslySetInnerHTML?: boolean | undefined;
}) {
  if (!values) {
    return null;
  }

  if (typeof values === "string") {
    return (
      <Badge value={values} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
    );
  }

  return (
    <>
      {values.map((value) => (
        <Badge
          key={value}
          value={value}
          dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        />
      ))}
    </>
  );
}
