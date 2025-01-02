import { App } from "./data/template/utilities";
import { Color } from "./ui/utilities/coloriz/Color";
import { Solver } from "./ui/utilities/coloriz/Solver";
import { textToColor } from "./ui/utilities/string";

export function extendFilter(app: App) {
  if (app.images.length === 0 && !app.filter) {
    const defaultColor = textToColor(app.name);
    app.filter = new Solver(
      new Color(defaultColor.r, defaultColor.g, defaultColor.b)
    )
      .solve()
      .filter.replace(/filter:/gi, "filter: brightness(0%)");
  }
}
