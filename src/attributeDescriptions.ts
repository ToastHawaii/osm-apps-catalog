import { Attribute } from "./Generator";

const template = (icon: string, description: string) =>
  `<div><i class="${icon}"></i> ${description}</div>`;

export const attributeDescriptions: Attribute<{ website?: string }>[] = [
  {
    check: (tags, _value, _model, local) =>
      !!(
        tags["amenity"] === "drinking_water" ||
        tags["amenity"] === "water_point" ||
        tags["drinking_water"] === "yes"
      ) &&
      !!(
        tags[`drinking_water:description:${local.code || "en"}`] ||
        tags["drinking_water:description"]
      ),
    template: (local, tags) =>
      template(
        "fas fa-tint",
        tags[`drinking_water:description:${local.code || "en"}`] ||
          tags["drinking_water:description"]
      )
  },
  {
    check: (tags, _value, _model, local) =>
      !!(tags["emergency"] === "defibrillator") &&
      !!(
        tags[`defibrillator:location:${local.code || "en"}`] ||
        tags["defibrillator:location"]
      ),
    template: (local, tags) =>
      template(
        "fas fa-heartbeat",
        tags[`defibrillator:location:${local.code || "en"}`] ||
          tags["defibrillator:location"]
      )
  },
  {
    check: (tags, _value, _model, local) =>
      ((!!tags.internet_access &&
        tags.internet_access !== "no" &&
        tags["internet_access:fee"] !== "customers" &&
        tags["internet_access:fee"] !== "yes") ||
        (!!tags.wifi && tags.wifi !== "no")) &&
      !!(
        tags["internet_access:ssid"] ||
        tags[`internet_access:description:${local.code || "en"}`] ||
        tags["internet_access:description"]
      ),
    template: (local, tags) =>
      template(
        "fas fa-wifi",
        [
          tags["internet_access:ssid"],
          tags[`internet_access:description:${local.code || "en"}`] ||
            tags["internet_access:description"]
        ]
          .filter(el => el)
          .join(": ")
      )
  },
  {
    check: (tags, _value, _model, local) =>
      (!!tags.changing_table &&
        tags.changing_table !== "no" &&
        tags["changing_table:fee"] !== "yes" &&
        !!(
          tags[`changing_table:description:${local.code || "en"}`] ||
          tags["changing_table:description"]
        )) ||
      (!!tags.diaper &&
        tags.diaper !== "no" &&
        tags["diaper:fee"] !== "yes" &&
        !!(
          tags[`diaper:description:${local.code || "en"}`] ||
          tags["diaper:description"]
        )),
    template: (local, tags) =>
      template(
        "fas fa-baby",
        tags[`changing_table:description:${local.code || "en"}`] ||
          tags[`diaper:description:${local.code || "en"}`] ||
          tags["changing_table:description"] ||
          tags["diaper:description"]
      )
  },
  {
    check: (tags, _value, _model, local) =>
      !!tags.wheelchair &&
      !!(
        tags[`wheelchair:description:${local.code || "en"}`] ||
        tags["wheelchair:description"]
      ),
    template: (local, tags) =>
      template(
        "fab fa-accessible-icon",
        tags[`wheelchair:description:${local.code || "en"}`] ||
          tags["wheelchair:description"]
      )
  }
];
