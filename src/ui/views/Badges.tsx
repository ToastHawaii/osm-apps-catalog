import React from "react";
import { textToColor } from "../../utilities/string";

function Badge({ topic: t }: { topic: string }) {
  const background = textToColor(t);

  const yiq =
    (background.r * 299 + background.g * 587 + background.b * 114) / 1000;

  return (
    <span
      className="badge"
      style={{
        background: `rgb(${background.r},${background.g},${background.b})`,
        color: yiq >= 128 ? "black" : "white",
      }}
    >
      {t}
    </span>
  );
}

export function Badges({ topics }: { topics: string | string[] | undefined }) {
  if (!topics) {
    return null;
  }

  if (typeof topics === "string") {
    return <Badge topic={topics} />;
  }

  return (
    <>
      {topics.map((topic) => (
        <Badge topic={topic} />
      ))}
    </>
  );
}
