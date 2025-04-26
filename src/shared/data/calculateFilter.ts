import { App } from "./App";
import { textToColor } from "../utilities/string";
import { Color } from "./coloriz/Color";
import { Solver } from "./coloriz/Solver";

export function calculateFilter(app: App) {
  const defaultColor = textToColor(app.name);
  return new Solver(new Color(defaultColor.r, defaultColor.g, defaultColor.b))
    .solve()
    .filter.replace(/filter:/gi, "brightness(0%)");
}
