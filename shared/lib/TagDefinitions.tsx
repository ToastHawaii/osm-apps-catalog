import { App } from "@shared/data/App";
import { some } from "@shared/utils/array";
import { upperCase, equalsYes } from "@shared/utils/string";

export const TagDefinitions: {
  key: string;
  filter: (app: App) => boolean;
}[] = [
  {
    key: "feature.offline-maps",
    filter: (app) => some(upperCase(app.map?.datasource), ["OFFLINE", "CACHE"]),
  },
  {
    key: "feature.navigation",
    filter: (app) =>
      equalsYes(app.navigating?.navToPoint, app.navigating?.predefinedRoute) ||
      some(app.cache.topics, [
        "GLOBAL NAVIGATION SATELLITE SYSTEM",
        "GPS NAVIGATION SOFTWARE",
        "AUTOMOTIVE NAVIGATION SYSTEM",
        "MARINE NAVIGATION",
      ]),
  },
  {
    key: "feature.location-search",
    filter: (app) => equalsYes(app.navigating?.findLocation),
  },
  {
    key: "feature.voice-guidance",
    filter: (app) => equalsYes(app.navigating?.voice),
  },
  {
    key: "feature.routing-foot",
    filter: (app) =>
      some(upperCase(app.routing?.profiles), ["FOOT", "WALK", "WALKING"]),
  },
  {
    key: "feature.routing-publicTransport",
    filter: (app) =>
      some(upperCase(app.routing?.profiles), [
        "PUBLIC TRANSPORT",
        "PUBLIC_TRANSPORT",
      ]),
  },
  {
    key: "feature.routing-hike",
    filter: (app) => some(upperCase(app.routing?.profiles), ["HIKE", "HIKING"]),
  },
  {
    key: "feature.routing-car",
    filter: (app) =>
      some(upperCase(app.routing?.profiles), ["CAR", "MOTORCAR"]),
  },
  {
    key: "feature.routing-bike",
    filter: (app) => some(upperCase(app.routing?.profiles), ["BIKE"]),
  },
  {
    key: "feature.routing-wheelchair",
    filter: (app) => some(upperCase(app.routing?.profiles), ["WHEELCHAIR"]),
  },
  {
    key: "feature.routing-motorbike",
    filter: (app) =>
      some(upperCase(app.routing?.profiles), ["MOTORBIKE", "MOTORCYCLE"]),
  },
  {
    key: "feature.offline-routing",
    filter: (app) => equalsYes(app.routing?.calculateRouteOffline),
  },
  {
    key: "feature.edit-map",
    filter: (app) =>
      equalsYes(
        app.editing?.addPOI,
        app.editing?.addWay,

        app.editing?.editPOI,
        app.editing?.editGeom,
        app.editing?.editTags,
      ),
  },
  {
    key: "feature.create-notes",
    filter: (app) => equalsYes(app.editing?.createNotes),
  },
  {
    key: "feature.offline-edit",
    filter: (app) =>
      some(upperCase(app.editing?.editSource), ["OFFLINE", "CACHE"]),
  },
  {
    key: "feature.record-track",
    filter: (app) => equalsYes(app.tracking?.tracking),
  },
  {
    key: "feature.record-track",
    filter: (app) => equalsYes(app.tracking?.tracking),
  },
  {
    key: "feature.upload-track",
    filter: (app) => equalsYes(app.tracking?.uploadGPX),
  },
  {
    key: "feature.accessibility-wheelchair",
    filter: (app) =>
      some(upperCase(app.accessibility?.accessibility), ["WHEELCHAIR"]),
  },
  {
    key: "feature.accessibility-blind",
    filter: (app) =>
      some(upperCase(app.accessibility?.accessibility), ["BLIND"]),
  },
  {
    key: "property.free",
    filter: (app) => !!app.gratis,
  },
  {
    key: "property.foss",
    filter: (app) => !!app.libre,
  },
];
