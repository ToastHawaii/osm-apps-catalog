import { utilQsString } from "./utilities/url";
import { Generator, Attribute } from "./Generator";
import { links } from "./links";
import { isImage } from "./utilities/image";
import { toTitle, toLevel, toOpenOrClose } from "./view";
import { getJson } from "./utilities/jsonRequest";
import { getHtmlElement, createElement } from "./utilities/html";
import { parseOpeningHours,  updateCount } from "./map";
import * as L from "leaflet";
import { attributeDescriptions } from "./attributeDescriptions";
import {
  extractName,
  extractType,
  extractOperator,
  extractImage,
  extractLocality,
  extractStreet
} from "./data";
import { equalsIgnoreCase } from "./utilities/string";

export function createOverPassLayer<M>(
  group: string,
  value: string,
  icon: string,
  query: string,
  attributes: Attribute<M>[],
  local: any,
  color: string
) {
  return new (L as any).OverPassLayer({
    markerIcon: L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color:${
        color || "#000000"
      };" class="marker-pin"></div><div class="marker-icon ${value}-icon" style="background-image:url('${icon}');"></div>`,

      iconSize: [36, 48],
      iconAnchor: [18, 48]
    }),
    minZoomIndicatorEnabled: true,
    minZoomIndicatorOptions: {
      position: "bottomleft",
      minZoomMessageNoLayer: local.minZoomMessageNoLayer,
      minZoomMessage: local.minZoomMessage
    },
    minZoom: 14,
    query: `(${query});out center;`,
    timeout: 30, // Seconds
    retryOnTimeout: true,
    cacheEnabled: true,
    cacheTTL: 86400, // 24h
    onSuccess(data: { elements: any[] }) {
      for (let i = 0; i < data.elements.length; i++) {
        const e = data.elements[i];
        if (e.id in this._ids) continue;
        this._ids[e.id] = true;

        let pos: {
          lat: number;
          lng: number;
        };
        let marker;

        if (
          e.tags.fee &&
          !equalsIgnoreCase(e.tags.fee, "no") &&
          !equalsIgnoreCase(e.tags.fee, "donation") &&
          !equalsIgnoreCase(e.tags.fee, "interval") &&
          !equalsIgnoreCase(e.tags.fee, "free") &&
          !equalsIgnoreCase(e.tags.fee, "none") &&
          !parseOpeningHours(e.tags.fee, local.code || "en") &&
          !e.tags["fee:conditional"]
        )
          continue;
        if (
          e.tags.access &&
          !equalsIgnoreCase(e.tags.access, "yes") &&
          !equalsIgnoreCase(e.tags.access, "permissive")
        )
          continue;
        if (
          equalsIgnoreCase(value, "toilets") &&
          e.tags["toilets:access"] &&
          !equalsIgnoreCase(e.tags["toilets:access"], "yes") &&
          !equalsIgnoreCase(e.tags["toilets:access"], "permissive")
        )
          continue;
        if (e.type === "node") {
          pos = L.latLng(e.lat, e.lon);
        } else {
          pos = L.latLng(e.center.lat, e.center.lon);
        }
        if (this.options.markerIcon) {
          marker = L.marker(pos, { icon: this.options.markerIcon });
        } else {
          marker = L.circle(pos, 20, {
            stroke: false,
            fillColor: "#E54041",
            fillOpacity: 0.9
          });
        }
        const model = {
          name: extractName(e.tags, local.code || "en") || e.tags["piste:name"],
          type: extractType(local, e.tags, value),
          operator: extractOperator(e.tags),
          address: {
            name: "",
            postcode: e.tags["addr:postcode"] || "",
            locality: e.tags["addr:city"] || "",
            street: e.tags["addr:street"] || "",
            houseNumber: e.tags["addr:housenumber"] || "",
            level: e.tags["level"] || "",
            latitude: pos.lat,
            longitude: pos.lng
          },
          opening:
            parseOpeningHours(e.tags.service_times, local.code || "en") ||
            parseOpeningHours(e.tags.opening_hours, local.code || "en"),
          conditionalFee:
            e.tags.fee &&
            (parseOpeningHours(e.tags.fee, local.code || "en") ||
              e.tags["fee:conditional"]),
          img: "",
          description: "",
          wikimediaDescription: "",
          wikipedia: { summary: "", url: "", image: "" }
        };
        model.img = model.img || extractImage(e.tags) || "";
        model.description =
          e.tags[`description:${local.code || "en"}`] || e.tags.description;
        const attributesGenerator = new Generator<M>(attributes);
        const linksGenerator = new Generator(links);
        const attributDescriptionGenerator = new Generator(
          attributeDescriptions
        );
        let isLoaded = false;
        const contentElement = createElement(
          "div",
          `<div id="hcard-Name" class="vcard">
          <a style="float:right;padding: 0 0 0 3px;" href="https://www.openstreetmap.org/edit?${
            e.type
          }=${e.id}"><i class="fas fa-pencil-alt"></i></a>
          <a style="float:right;padding: 0 3px;" href="" class="share"><i class="fas fa-share-alt"></i></a>
          <strong class="name" title="${toTitle(model)}">${toTitle(
            model
          )}</strong>
        <div class="adr">

        ${attributesGenerator.render(local, e.tags, value, {} as M)}

         <div class="street-address">${model.address.street} ${
            model.address.houseNumber
          } ${toLevel(parseFloat(model.address.level), local)}</div>
            <span class="postal-code">${model.address.postcode}</span>
         <span class="region">${model.address.locality}</span>
        </div>
        ${
          model.opening
            ? `<br><div>${toOpenOrClose(model.opening, local)}</div>`
            : ``
        }
        ${
          model.conditionalFee ? `<br><div>${local.conditionalFee}</div>` : ``
        } <br/>
        <div class="geo">
         <small>
         <a href="https://maps.apple.com/?${utilQsString({
           ll: `${model.address.latitude},${model.address.longitude}`,
           q: toTitle(model)
         })}">
           ${local.route}
         </a>
         </small>
        </div>
        <div class="img-container">
        ${
          model.img || model.wikipedia.image
            ? `
          <br />
          <img class="img" dynamic-src="${
            model.img || model.wikipedia.image
          }"/>`
            : ``
        }
        </div>
        <div class="description">
        ${generateHtmlDescription(model)}
        </div>
        <div>
          ${
            !attributDescriptionGenerator.empty(e.tags, value, {}, local)
              ? `
          <br />
          <small>
            ${attributDescriptionGenerator.render(
              local,
              e.tags,
              value,
              {},
              `<br />`
            )}
          </small>`
              : ``
          }
        </div>
        <div class="contact">
          ${
            !linksGenerator.empty(e.tags, value, {}, local)
              ? `
          <br />
          ${linksGenerator.render(local, e.tags, value, {})}`
              : ``
          }
        </div>
        </div>`
        );
        const share = contentElement.querySelector(".share") as HTMLLinkElement;
        share.addEventListener("click", function (e) {
          e.preventDefault();
          shareLink(
            `${window.location.origin}${window.location.pathname}#offers=${group}/${value}&location=${model.address.latitude},${model.address.longitude}`,
            share,
            local,
            toTitle(model),
            model.description ||
              model.wikipedia.summary ||
              model.wikimediaDescription
          );
        });
        const popup = L.popup({
          minWidth: 200,
          autoPanPaddingTopLeft: [10, 85],
          autoPanPaddingBottomRight: [10, 10]
        }).setContent(() => {
          if (!isLoaded) {
            isLoaded = true;
            const img = contentElement.querySelector(
              ".img"
            ) as HTMLImageElement;
            if (img) img.src = img.getAttribute("dynamic-src") || img.src;
            {
              // Enrich Address
              getJson("https://nominatim.openstreetmap.org/reverse", {
                format: "json",
                addressdetails: "1",
                namedetails: "1",
                lat: pos.lat,
                lon: pos.lng
              }).then(result => {
                model.address.name = extractName(
                  result.namedetails,
                  local.code || "en"
                );
                model.address.postcode =
                  model.address.postcode || result.address.postcode || "";
                model.address.locality =
                  model.address.locality ||
                  extractLocality(result.address) ||
                  "";
                if (!model.address.street) {
                  model.address.street = extractStreet(result, local) || "";
                  model.address.houseNumber =
                    model.address.houseNumber ||
                    result.address.house_number ||
                    "";
                }
                const name = getHtmlElement(".name", contentElement);
                name.innerHTML = toTitle(model);
                name.title = toTitle(model);
                getHtmlElement(
                  ".street-address",
                  contentElement
                ).innerHTML = `${model.address.street} ${
                  model.address.houseNumber
                } ${toLevel(parseFloat(model.address.level), local)}`;
                getHtmlElement(".postal-code", contentElement).innerHTML =
                  model.address.postcode;
                getHtmlElement(".region", contentElement).innerHTML =
                  model.address.locality;
                popup.update();
              });
            }
            {
              // Enrich Data
              const qid = e.tags.wikidata || e.tags["species:wikidata"];

              if (qid)
                getJson("https://www.wikidata.org/w/api.php", {
                  format: "json",
                  action: "wbgetentities",
                  formatversion: "2",
                  ids: qid,
                  props: "labels|descriptions|claims|sitelinks",
                  sitefilter: (local.code || "en") + "wiki",
                  languages: local.code || "en",
                  languagefallback: "0",
                  origin: "*"
                }).then(async r => {
                  if (r && r.error) return;
                  if (!r.entities[qid]) return;
                  const entity = r.entities[qid];
                  let i;
                  let description;
                  if (
                    entity.descriptions &&
                    Object.keys(entity.descriptions).length > 0
                  ) {
                    description =
                      entity.descriptions[Object.keys(entity.descriptions)[0]]
                        .value;
                  }
                  let label;
                  if (entity.labels && Object.keys(entity.labels).length > 0) {
                    label = entity.labels[Object.keys(entity.labels)[0]].value;
                  }
                  const result: {
                    title: string;
                    description: string;
                    imageURL?: string;
                    wiki?: {
                      title: string;
                      url: string;
                    };
                  } = {
                    title: label,
                    description: description
                  };
                  // add image
                  if (entity.claims) {
                    const imageroot =
                      "https://commons.wikimedia.org/w/index.php";
                    const props = ["P154", "P18"]; // logo image, image
                    let prop;
                    let image;
                    for (i = 0; i < props.length; i++) {
                      prop = entity.claims[props[i]];
                      if (prop && Object.keys(prop).length > 0) {
                        image =
                          prop[Object.keys(prop)[0]].mainsnak.datavalue.value;
                        if (image) {
                          result.imageURL = `${imageroot}?${utilQsString({
                            title: "Special:Redirect/file/" + image,
                            width: 300
                          })}`;
                        }
                        break;
                      }
                    }
                  }
                  if (entity.sitelinks) {
                    // check each, in order of preference
                    const w = (local.code || "en") + "wiki";
                    if (entity.sitelinks[w]) {
                      const title = entity.sitelinks[w].title || "";
                      const url = `https://${
                        local.code || "en"
                      }.wikipedia.org/wiki/${title.replace(/ /g, "_")}`;
                      result.wiki = {
                        title: title,
                        url: url
                      };
                      loadWikipediaSummary(title, local.code || "en").then(
                        wikipedia => {
                          model.wikipedia = wikipedia;

                          getHtmlElement(
                            ".description",
                            contentElement
                          ).innerHTML = generateHtmlDescription(model);
                          popup.update();
                        }
                      );
                    }
                  }
                  model.name =
                    model.name ||
                    result.title ||
                    (result.wiki && result.wiki.title);
                  model.wikimediaDescription = result.description;
                  model.img =
                    model.img || model.wikipedia.image || result.imageURL || "";
                  getHtmlElement(".name", contentElement).innerHTML = toTitle(
                    model
                  );
                  getHtmlElement(".name", contentElement).title = toTitle(
                    model
                  );
                  getHtmlElement(
                    ".description",
                    contentElement
                  ).innerHTML = generateHtmlDescription(model);
                  getHtmlElement(".img-container", contentElement).innerHTML =
                    model.img || model.wikipedia.image
                      ? `<br /><img class="img" src="${
                          model.img || model.wikipedia.image
                        }"/>`
                      : ``;
                  getHtmlElement(
                    ".contact",
                    contentElement
                  ).innerHTML = !linksGenerator.empty(
                    e.tags,
                    value,
                    {
                      website: model.wikipedia.url
                        ? model.wikipedia.url
                        : result.wiki
                        ? result.wiki.url
                        : undefined
                    },
                    local
                  )
                    ? `
    <br />
    ${linksGenerator.render(local, e.tags, value, {
      website: model.wikipedia.url
        ? model.wikipedia.url
        : result.wiki
        ? result.wiki.url
        : undefined
    })}`
                    : ``;

                  popup.update();
                  if (model.img || model.wikipedia.image) {
                    if (!(await isImage(model.img || model.wikipedia.image))) {
                      getHtmlElement(
                        ".img",
                        contentElement
                      ).outerHTML = `<a class="img" href="${
                        model.img || model.wikipedia.image
                      }" target="_blank"><i class="far fa-image fa-2x"></i></a>`;
                    }
                    popup.update();
                  }
                });

              const wikipediaUrl =
                e.tags[`wikipedia:${local.code || "en"}`] ||
                e.tags.wikipedia ||
                e.tags[`brand:wikipedia:${local.code || "en"}`] ||
                e.tags["brand:wikipedia"] ||
                e.tags[`network:wikipedia:${local.code || "en"}`] ||
                e.tags["network:wikipedia"] ||
                e.tags[`operator:wikipedia:${local.code || "en"}`] ||
                e.tags["operator:wikipedia"];
              if (wikipediaUrl)
                loadWikipediaSummary(wikipediaUrl, local.code || "en").then(
                  wikipedia => {
                    model.wikipedia = wikipedia;

                    getHtmlElement(
                      ".description",
                      contentElement
                    ).innerHTML = generateHtmlDescription(model);
                    popup.update();
                  }
                );
            }
            if (model.img || model.wikipedia.image) {
              isImage(model.img || model.wikipedia.image).then(
                (loaded: boolean) => {
                  if (!loaded)
                    getHtmlElement(
                      ".img",
                      contentElement
                    ).outerHTML = `<a class="img" href="${
                      model.img || model.wikipedia.image
                    }" target="_blank"><i class="far fa-image fa-2x"></i></a>`;
                  popup.update();
                }
              );
            }
          }
          return contentElement;
        });
        marker.bindPopup(popup);
        this._markers.addLayer(marker);
      }
      updateCount(local);
    }
  });
}

function generateHtmlDescription(model: {
  img: string;
  description: string;
  wikimediaDescription: string;
  wikipedia: { summary: string; url: string; image: string };
}) {
  return model.description ||
    model.wikipedia.summary ||
    model.wikimediaDescription
    ? `
          ${!(model.img || model.wikipedia.image) ? `<br />` : ``}
          <small>
            ${
              model.description ||
              generateHtmlWikipediaDescription(model.wikipedia) ||
              model.wikimediaDescription
            }
          </small>`
    : ``;
}

function generateHtmlWikipediaDescription(wikipedia: {
  summary: string;
  url: string;
}): string {
  if (!wikipedia.summary) return "";

  return `${wikipedia.summary} <a href="${wikipedia.url}" target="_blank">Wikipedia</a>`;
}

export function shareLink(
  url: string,
  target: HTMLElement,
  local: { linkCopied: string },
  title: string,
  description: string
) {
  const data = {
    url: url,
    title: title,
    text: description
  };
  if (
    (navigator as any).share &&
    (((navigator as any).canShare && (navigator as any).canShare(data)) ||
      !(navigator as any).canShare)
  ) {
    (navigator as any)
      .share(data)
      .then(() => console.log("Share was successful."))
      .catch((error: any) => console.log("Sharing failed", error));
  } else {
    console.log(
      `Your system doesn't support sharing links. Use copy to clipboard.`
    );
    copyTextToClipboard(url);

    if (target) {
      const titleElement = createElement("span", local.linkCopied, ["title"]);

      target.append(titleElement);

      setTimeout(() => {
        titleElement.remove();
      }, 2000);
    }
  }
}

async function loadWikipediaSummary(siteTitle: string, language: string) {
  const splittedSiteTitle = siteTitle.split(":");

  if (splittedSiteTitle.length >= 2) {
    siteTitle = splittedSiteTitle[1];
    language = splittedSiteTitle[0];
  }

  const cleanSiteTitle = siteTitle.replace(/ /g, "_");

  const data = await getJson(`https://${language}.wikipedia.org/w/api.php`, {
    format: "json",
    action: "query",
    prop: "extracts|pageimages|info",
    inprop: "url",
    pithumbsize: 320,
    exintro: "",
    explaintext: "",
    redirects: "1",
    titles: cleanSiteTitle,
    origin: "*"
  });
  const pages = data.query.pages;
  const keys = Object.keys(pages);
  if (keys.length > 0) {
    const firstPage = pages[keys[0]];
    return {
      url: firstPage.fullurl,
      summary: textTruncate(firstPage.extract || "", 500),
      image: firstPage.thumbnail && firstPage.thumbnail.source
    };
  } else {
    throw new Error("No summary found");
  }
}

function copyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a
  // flash, so some of these are just precautions. However in
  // Internet Explorer the element is visible whilst the popup
  // box asking the user for permission for the web page to
  // copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = "0";

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

function textTruncate(text: string, length = 200, ending = "...") {
  if (text.length > length) {
    return text.substring(0, length - ending.length) + ending;
  } else {
    return text;
  }
}
