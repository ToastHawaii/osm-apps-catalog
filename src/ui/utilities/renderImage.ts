import { App } from "../../data/template/utilities";

export function renderImage(obj: App) {
  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  if (obj.images.length > 0) {
    return `<img class="img" src="${defaultImage}" dynamic-src="${obj.images.join(
      " "
    )} ${defaultImage}"/>`;
  } else {
    return `<img class="img" style="${obj.filter}" src="${defaultImage}"/>`;
  }
}
