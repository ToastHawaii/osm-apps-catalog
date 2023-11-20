import { textToColor } from "../utilities/string";

export function renderBadges(values: string[] | undefined) {
  return values
    ?.map((t) => {
      const background = textToColor(t);

      const yiq =
        (background.r * 299 + background.g * 587 + background.b * 114) / 1000;

      return `<span class="badge" style="background: rgb(${background.r},${
        background.g
      },${background.b}); color:${
        yiq >= 128 ? "black" : "white"
      };">${t}</span>`;
    })
    .join("");
}
