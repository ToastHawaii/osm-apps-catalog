import * as L from "leaflet";
import "leaflet-overpass-layer";
import * as opening_hours from "opening_hours";
import * as moment from "moment";
import { Solver } from "./coloriz/Solver";
import { Color, hexToRgb } from "./coloriz/Color";
import { setHashParams, getHashParams } from "./utilities/url";
import { Attribute } from "./Generator";
import { getJson } from "./utilities/jsonRequest";
import { get, set } from "./utilities/storage";
import { groupBy } from "./utilities/data";
import {
  getHtmlElement,
  getHtmlElements,
  createElement
} from "./utilities/html";
import { createOverPassLayer, shareLink } from "./createOverPassLayer";
import BigNumber from "bignumber.js";
import { funding } from "./funding";

declare var taginfo_taglist: any;

let map: L.Map;
const layers: { [name: string]: L.Layer } = {};
let offers: string[] = [];

export function initMap<M>(
  filterOptions: {
    id: number;
    group: string;
    subgroup?: string;
    order?: number;
    value: string;
    icon: string;
    button?: string;
    query: string;
    color: string;
    edit: string[];
    tags: string[];
  }[],
  attributes: Attribute<M>[],
  local: any
) {
  getHtmlElement(".search").addEventListener("submit", ev => {
    ev.preventDefault();
    search();
    return false;
  });

  getHtmlElement(".geo").addEventListener("click", () => {
    map.stopLocate();
    map.locate({ setView: true, maxZoom: 16 });

    return false;
  });

  getHtmlElement(".about").addEventListener("click", () => {
    window.location.href = `https://osm-apps.zottelig.ch${
      local.code ? `/${local.code}` : ""
    }/docs`;
  });

  getHtmlElement(".donate").addEventListener("click", () => {
    window.open(funding[local.code] || funding.en);
  });

  const shareButton = getHtmlElement(".share");
  shareButton.addEventListener("click", e => {
    e.preventDefault();

    const bbox = map.getBounds();
    shareLink(
      `${window.location.origin}${window.location.pathname}#o=${offersToShort(
        offers,
        filterOptions
      )}&b=${toString(bbox.getSouth(), 4)},${toString(
        bbox.getWest(),
        4
      )},${toString(bbox.getNorth(), 4)},${toString(bbox.getEast(), 4)}`,
      shareButton,
      local,
      local.title,
      local.description
    );
  });

  getHtmlElement(".note").addEventListener("click", () => {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    window.location.href = `https://www.openstreetmap.org/note/new#map=${zoom}/${latlng.lat}/${latlng.lng}`;
  });

  getHtmlElement(".edit").addEventListener("click", () => {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    let presets = "";
    document.querySelectorAll(`#filters input`).forEach(e => {
      if ((e as HTMLInputElement).checked) {
        const p = filterOptions
          .filter(
            o => `${o.group}/${o.value}` === (e as HTMLInputElement).value
          )
          .map(o => o.edit.map(t => t.replace(/=/gi, "/")).join(","))
          .filter(o => o)
          .join(",");
        presets += (presets && p ? "," : "") + p;
      }
    });

    window.location.href = `https://www.openstreetmap.org/edit#editor=id&map=${zoom}/${
      latlng.lat
    }/${latlng.lng}${presets ? `&presets=${presets}` : ``}`;
  });

  moment.locale(local.code || "en");

  const attribution = [
    'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors',
    'POI via <a href="https://www.overpass-api.de/">Overpass API</a>'
  ];

  const osm = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      opacity: 0.7,
      attribution: attribution.join(" | ")
    }
  );

  type State = { lat: number; lng: number; zoom: number };

  const state = get<State>("position") || { lat: 47.37, lng: 8.54, zoom: 14 };

  map = new L.Map("map")
    .addLayer(osm)
    .setView(new L.LatLng(state.lat, state.lng), state.zoom);

  // placeholders for the L.marker and L.circle representing user's current position and accuracy
  let currentPosition: L.Layer | L.Marker<any>;
  let currentAccuracy: L.Layer | L.Circle<any>;

  map.on("moveend zoomend", () => {
    updateCount(local);
    const center = map.getCenter();
    const state = { lat: center.lat, lng: center.lng, zoom: map.getZoom() };
    set<State>("position", state);
  });

  function partAreaVisible() {
    const visibles = getHtmlElements(`.external-link`);
    let hasPrev = false;
    for (const e of visibles) {
      if (!e.classList.contains("part-area-visible")) {
        if (
          e.previousElementSibling?.className === "external-separator" &&
          hasPrev
        )
          (e.previousElementSibling as HTMLElement).style.display = "";

        hasPrev = true;
        continue;
      }

      const c = (e.getAttribute("part-area-visible") || "")
        .split(",")
        .map(n => parseFloat(n));

      (e.previousElementSibling as HTMLElement).style.display = "none";

      if (e.nextElementSibling as HTMLElement)
        (e.nextElementSibling as HTMLElement).style.display = "none";

      if (
        map
          .getBounds()
          .intersects(
            L.latLngBounds(L.latLng(c[0], c[1]), L.latLng(c[2], c[3]))
          )
      ) {
        if (
          e.previousElementSibling?.className === "external-separator" &&
          hasPrev
        )
          (e.previousElementSibling as HTMLElement).style.display = "";

        e.classList.remove("part-area-hidden");
        hasPrev = true;
      } else {
        e.classList.add("part-area-hidden");
      }
    }
    const hiddens = getHtmlElements(`.part-area-hidden`);
    if (visibles.length === hiddens.length) {
      getHtmlElements(".external-label").forEach(
        l => (l.style.display = "none")
      );
    } else {
      getHtmlElements(".external-label").forEach(l => (l.style.display = ""));
    }
  }

  map.on("moveend zoomend", partAreaVisible);

  map.on(
    "locationfound",
    (e: { accuracy: number; latlng: L.LatLngExpression }) => {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (currentPosition) {
        map.removeLayer(currentPosition);
        map.removeLayer(currentAccuracy);
      }

      const radius = e.accuracy / 2;

      currentPosition = L.marker(e.latlng).addTo(map);

      currentAccuracy = L.circle(e.latlng, radius).addTo(map);

      map.locate({ watch: false, maxZoom: 16 });
    }
  );

  function search(value?: string) {
    value =
      value ||
      (document.getElementById("osm-search") as HTMLInputElement).value;

    setHashParams(
      {
        offers: offers.toString(),
        location: value
      },
      hashchange
    );

    getJson("https://nominatim.openstreetmap.org/search", {
      format: "json",
      q: value,
      limit: 1
    }).then(r => {
      const result = r[0];
      if (!result) return;
      map.flyToBounds([
        [result.boundingbox[0], result.boundingbox[2]],
        [result.boundingbox[1], result.boundingbox[3]]
      ]);
    });
  }

  function hashchange() {
    const params = getHashParams();

    let offersParams: string[] = [];

    if (params["offers"]) offersParams = params["offers"].split(",");
    else if (params["o"])
      offersParams = offersfromShort(params["o"], filterOptions);

    for (const o of offersParams)
      if (offers.indexOf(o) === -1)
        for (const f of filterOptions)
          if (f.group + "/" + f.value === o) {
            offers.push(f.group + "/" + f.value);
            init(f.group, f.value, f.icon, f.query, attributes, local, f.color);

            (getHtmlElement(
              `#filters input[value='${f.group + "/" + f.value}']`
            ) as HTMLInputElement).checked = true;
          }

    if (params["location"]) search(params["location"]);
    else if (params["b"]) {
      const bounds = params["b"].split(",").map(b => parseFloat(b));
      map.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
      ]);
    }
  }

  window.addEventListener("hashchange", hashchange);

  setTimeout(() => {
    offers = [];
    hashchange();
  }, 0);

  const params = getHashParams();

  let offersParams: string[] = [];

  if (params["offers"]) offersParams = params["offers"].split(",");

  if (params["o"]) offersParams = offersfromShort(params["o"], filterOptions);

  for (const o of offersParams)
    if (offers.indexOf(o) === -1)
      for (const f of filterOptions)
        if (f.group + "/" + f.value === o) offers.push(f.group + "/" + f.value);

  if (params["location"]) {
    search(params["location"]);
    map.locate({ setView: false, maxZoom: 16 });
  } else if (params["b"]) {
    const bounds = params["b"].split(",").map(b => parseFloat(b));
    map.fitBounds([
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]]
    ]);
    map.locate({ setView: false, maxZoom: 16 });
  } else map.locate({ setView: true, maxZoom: 16 });

  map.on("popupopen", e => {
    const marker = (e as L.PopupEvent & { popup: { _source: L.Marker } }).popup
      ._source;
    const latLng = marker.getLatLng();
    setHashParams(
      {
        offers: offers.toString(),
        location: `${latLng.lat},${latLng.lng}`
      },
      hashchange
    );
  });

  const groups = groupBy(
    filterOptions
      .sort((a, b) =>
        local.type[a.value].name.localeCompare(local.type[b.value].name)
      )
      .sort((a, b) => local.group[a.group].localeCompare(local.group[b.group]))
      .sort((a, b) => (a.subgroup || "").localeCompare(b.subgroup || ""))
      .sort((a, b) => (b.order || 1000) - (a.order || 1000)),
    "group"
  );
  let iconColors = "";
  for (const k in groups) {
    const group = groups[k];
    const detailsElement = createElement("details");
    const summaryElement = createElement(
      "summary",
      `<span>${local.group[k]}</span>`
    );
    detailsElement.appendChild(summaryElement);

    for (const f of group) {
      let contentElement: HTMLLabelElement;
      if (f.color) {
        const rgb = hexToRgb(f.color);
        const color = new Color(rgb[0], rgb[1], rgb[2]);
        const solver = new Solver(color);
        const result = solver.solve();

        iconColors += `.${f.value}-icon{${result.filter.replace(
          /filter:/gi,
          "filter: brightness(0%)"
        )}}`;
      }

      if (!f.subgroup) {
        contentElement = createElement(
          "label",
          `
          <input value="${k + "/" + f.value}" type="checkbox" />
          <div class="filter-background"></div>
          <div class="filter-label">
            <img class="${f.value}-icon"
              src="${f.icon}"
            />
            <span>${local.type[f.value].name}</span>
          </div>`,
          ["filter", "filter-" + k + "-" + f.value]
        );

        const aElement = createElement(
          "a",
          `<i class="fas fa-info-circle"></i>`
        );

        aElement.addEventListener("click", () => {
          getHtmlElement(".info-container").style.display = "block";
          getHtmlElement(".info-container .info h4").innerText =
            local.type[f.value].name;
          (getHtmlElement(
            ".info-container .info .link"
          ) as HTMLAnchorElement).href = `http://overpass-turbo.eu/?Q=${encodeURI(
            `[out:json][timeout:30][bbox:{{bbox}}];
(
  ${f.query.trim()}
);
out center;`
          )}`;
          getHtmlElement(
            ".info-container .info .query"
          ).innerText = f.query.trim();

          const wikiElement = getHtmlElement(".info-container .info .wiki");

          wikiElement.innerHTML = `<div class="taglist"
  data-taginfo-taglist-tags="${f.tags.join()}"
  data-taginfo-taglist-options='{"with_count": true, "lang": "${local.code}"}'>
</div>`;

          taginfo_taglist.convert_to_taglist(".taglist");

          const input = getHtmlElement("input", contentElement);
          if (!input.checked) {
            input.checked = true;
            offers.push(k + "/" + f.value);
            init(f.group, f.value, f.icon, f.query, attributes, local, f.color);

            const params = getHashParams();
            params["offers"] = offers.toString();
            setHashParams(params, hashchange);
          }

          getHtmlElement(".info-container .info .text").innerText = "";

          if (local.type[f.value].description) {
            getHtmlElement(".info-container .info .text").innerText =
              local.type[f.value].description;
          } else {
            if (f.tags) {
              const tags = [];
              const keys = [];

              for (const t of f.tags) {
                if (/=/gi.test(t)) {
                  tags.push(`Tag:${t}`);
                  keys.push(`Key:${t.split(/=/gi)[0]}`);
                } else keys.push("Key:" + t);
              }
              getJson("https://wiki.openstreetmap.org/w/api.php", {
                format: "json",
                action: "wbgetentities",
                languages: local.code || "en",
                languagefallback: "0",
                props: "descriptions",
                origin: "*",
                sites: "wiki",
                titles: [tags.join("|"), keys.join("|")]
                  .filter(t => t)
                  .join("|")
              }).then(r => {
                if (r && r.error) return;

                let description = "";
                for (const prop in r.entities) {
                  if (!r.entities.hasOwnProperty(prop)) continue;

                  const entity = r.entities[prop];

                  if (
                    entity.descriptions &&
                    Object.keys(entity.descriptions).length > 0
                  ) {
                    description =
                      entity.descriptions[Object.keys(entity.descriptions)[0]]
                        .value;

                    break;
                  }
                }
                getHtmlElement(
                  ".info-container .info .text"
                ).innerText = description;
              });
            }
          }

          getHtmlElement(".info-container .info .external").innerText = "";

          if (
            local.type[f.value].externalResources &&
            local.type[f.value].externalResources.length > 0
          ) {
            const links = [];
            for (const external of local.type[f.value].externalResources) {
              links.push(
                `<a class="external-link${
                  external.bounds ? " part-area-visible" : ""
                }" href="${external.url}" target="_blank"${
                  external.bounds
                    ? ` part-area-visible="${external.bounds.join(",")}"`
                    : ""
                } href="${external.url}">${external.name}</a>`
              );
            }

            getHtmlElement(
              ".info-container .info .external"
            ).innerHTML = `<br/><span class="external-label">${
              local.externalResources
            }: </span>${links.join(
              `<span class="external-separator">, </span>`
            )}`;
          }

          for (const a of getHtmlElements(".external-link")) {
            a.addEventListener("click", () => {
              const latlng = map.getCenter();
              const zoom = map.getZoom();
              const bounds = map.getBounds();

              window.open(
                (a as HTMLAnchorElement).href
                  .replace(/\{lat\}/i, latlng.lat + "")
                  .replace(/\{lng\}/i, latlng.lng + "")
                  .replace(/\{zoom\}/i, zoom + "")
                  .replace(
                    /\{bbox\}/i,
                    `${bounds.getNorthWest().lat},${
                      bounds.getNorthWest().lng
                    },${bounds.getSouthEast().lat},${bounds.getSouthEast().lng}`
                  ),
                "_blank"
              );
              return false;
            });
          }

          partAreaVisible();

          return false;
        });
        detailsElement.appendChild(aElement);
        getHtmlElement(".info-container .close-button").addEventListener(
          "click",
          () => {
            getHtmlElement(".info-container").style.display = "none";
          }
        );

        detailsElement.appendChild(contentElement);
      } else {
        const group = getHtmlElement(
          ".filter-" + k + "-" + f.subgroup,
          detailsElement
        );

        contentElement = createElement(
          "label",
          `<input value="${k + "/" + f.value}" type="checkbox" />
              <div class="filter-sub-background"></div>
              <i class="${f.button}" style="color: ${f.color}" title="${
            local.type[f.value].name
          }"></i>`,
          ["filter", "filter-sub", "filter-" + k + "-" + f.value]
        );

        detailsElement.insertBefore(contentElement, group);
      }
      getHtmlElement("input", contentElement).addEventListener(
        "change",
        function () {
          if (this.checked) {
            offers.push(k + "/" + f.value);
            init(f.group, f.value, f.icon, f.query, attributes, local, f.color);
          } else {
            const index = offers.indexOf(k + "/" + f.value);
            if (index > -1) offers.splice(index, 1);

            map.removeLayer(layers[f.value]);
          }

          const params = getHashParams();
          params["offers"] = offers.toString();
          setHashParams(params, hashchange);

          updateCount(local);
        }
      );
    }
    getHtmlElement("#filters").appendChild(detailsElement);
  }

  const style = createElement("style", iconColors);
  document.head.appendChild(style);
}

function init<M>(
  group: string,
  value: string,
  icon: string,
  query: string,
  attributes: Attribute<M>[],
  local: any,
  color: string
) {
  layers[value] = createOverPassLayer(
    group,
    value,
    icon,
    query,
    attributes,
    local,
    color
  );
  map.addLayer(layers[value]);
}

export function parseOpeningHours(openingHours: string, localCode: string) {
  if (!openingHours) return undefined;

  try {
    return new opening_hours(openingHours, null, {
      locale: localCode
    });
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

let emptyIndicatorElement: HTMLDivElement | undefined;

export function updateCount(local: any) {
  const visible =
    countMarkersInView(map) === 0 && offers.length > 0 && map.getZoom() >= 14;
  if (visible && !emptyIndicatorElement) {
    emptyIndicatorElement = createElement(
      "div",
      `<div class="leaflet-control-emptyIndicator leaflet-control">${local.emptyIndicator}</div>`,
      ["leaflet-bottom", "leaflet-left"]
    );

    getHtmlElement(".leaflet-control-container").appendChild(
      emptyIndicatorElement
    );
  } else if (!visible && emptyIndicatorElement) {
    emptyIndicatorElement.remove();
    emptyIndicatorElement = undefined;
  }
}

function countMarkersInView(map: L.Map) {
  let count = 0;
  const mapBounds = map.getBounds();
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      if (mapBounds.contains(layer.getLatLng())) {
        count++;
      }
    }
  });
  return count;
}

function offersToShort(
  value: string[],
  filters: {
    id: number;
    group: string;
    value: string;
  }[]
) {
  const max = Math.max(...filters.map(f => f.id));

  let result = "0";
  for (let i = 0; i < max; i++) {
    result += "0";
  }

  for (const o of value) {
    const pos = max - filters.filter(f => o === f.group + "/" + f.value)[0].id;
    result = result.slice(0, pos) + "1" + result.slice(pos + 1, result.length);
  }

  return new BigNumber(result, 2).toString(36);
}

function offersfromShort(
  value: string,
  filters: {
    id: number;
    group: string;
    value: string;
  }[]
) {
  const v = new BigNumber(value, 36).toString(2);

  const offers: string[] = [];

  let id = v.length - 1;
  for (const o of v) {
    if (o === "1") {
      const filter = filters.filter(f => f.id === id)[0];
      offers.push(filter.group + "/" + filter.value);
    }
    id--;
  }

  return offers;
}

function toString(value: number, precision: number) {
  const power = Math.pow(10, precision || 0);
  return (Math.round(value * power) / power).toFixed(precision);
}
