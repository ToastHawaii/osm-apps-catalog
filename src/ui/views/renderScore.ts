import { App } from "../../data/template/utilities";

export function renderScore(app: App) {
  let label;
  if (app.score >= 8) {
    label = "A";
  } else if (app.score >= 6) {
    label = "B";
  } else if (app.score >= 4) {
    label = "C";
  } else if (app.score >= 2) {
    label = "D";
  } else {
    label = "E";
  }

  let color;
  if (app.score >= 8) {
    color = "bg-dark-green";
  } else if (app.score >= 6) {
    color = "bg-green";
  } else if (app.score >= 4) {
    color = "bg-yellow";
  } else if (app.score >= 2) {
    color = "bg-orange";
  } else {
    color = "bg-red";
  }

  return `<div class="corner-badge-left ${color}" title="${app.score}">
        <a href="/docs/score">${label}</a>
      </div>`;
}
