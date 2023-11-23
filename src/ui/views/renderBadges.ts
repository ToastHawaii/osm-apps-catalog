import { textToColor } from "../utilities/string";

function renderBadge(t: string) {
  const background = textToColor(t);

  const yiq =
    (background.r * 299 + background.g * 587 + background.b * 114) / 1000;

  return `<span class="badge" style="background: rgb(${background.r},${
    background.g
  },${background.b}); color:${yiq >= 128 ? "black" : "white"};">${t}</span>`;
}

export function renderBadges(values: string | string[] | undefined) {
  if (!values) {
    return undefined;
  }

  if (typeof values === "string") {
    return renderBadge(values);
  }

  return values.map(renderBadge).join("");
}
