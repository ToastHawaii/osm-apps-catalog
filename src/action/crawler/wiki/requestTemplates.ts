import { getJson } from "../../../app/utilities/jsonRequest";
import { findClosingBracketIndex } from "../../../shared/utilities/string";

type Template = Record<string, string>;

export async function requestTemplates(template: string, language: string) {
  const objects: Template[] = [];
  let con;

  do {
    const params: Record<string, string> = {
      list: "embeddedin",
      eititle: "Template:" + template,
      eilimit: "500",
    };
    if (con) params.eicontinue = con;

    const response = await osmMediaApiQuery(params);

    objects.push(
      ...(await processPagesByTemplateResult(response, template, language)),
    );

    con = response.continue?.eicontinue;
  } while (con);

  return objects;
}

async function osmMediaApiQuery(params: Record<string, string>) {
  const base = "https://wiki.openstreetmap.org/w/api.php";

  params["origin"] = "*";
  params["action"] = "query";
  params["formatversion"] = "2";
  params["format"] = "json";

  return await getJson(base, params);
}

async function processPagesByTemplateResult(
  response: { continue: { eicontinue: any }; query: { embeddedin: any } },
  template: string,
  language: string,
) {
  const pages = response.query.embeddedin;

  const objects: Template[] = [];
  let ids = [];
  for (const p in pages) {
    if (language === "en") {
      if (
        !/^(af|ast|az|id|ms|bs|br|ca|cs|da|de|et|en|es|eo|eu|fr|fy|gl|hr|ia|is|it|ht|gcf|ku|lv|lb|lt|hu|nl|no|nn|oc|pl|pt|ro|sq|sk|sl|sr-latn|fi|sv|tl|vi|tr|diq|el|be|bg|mk|mn|ru|sr|uk|hy|he|ar|fa|ps|ne|bn|ta|ml|si|th|my|ka|ko|tzm|zh-hans|zh-hant|ja|yue):/gi.test(
          pages[p].title,
        )
      )
        ids.push(pages[p].pageid);
    } else if (new RegExp(`^${language}:`, "ig").test(pages[p].title))
      ids.push(pages[p].pageid);

    if (ids.length >= 50) {
      objects.push(...(await loadPages(ids, template)));
      ids = [];
    }
  }

  if (ids.length > 0) {
    objects.push(...(await loadPages(ids, template)));
  }

  return objects;
}

async function loadPages(ids: string[], template: string) {
  const params: Record<string, string> = {
    prop: "revisions",
    rvprop: "content|timestamp",
    pageids: ids.join("|"),
    rvslots: "*",
  };

  const response = await osmMediaApiQuery(params);

  const pages = response.query.pages;

  const objects: Template[] = [];
  for (const p in pages) {
    const content = pages[p].revisions[0].slots.main.content;
    const pageObjects = parsePage(content, template);
    for (const o of pageObjects) {
      o.sourceWiki = pages[p].title;
      o.timestamp = pages[p].revisions[0].timestamp;
    }
    objects.push(...pageObjects);
  }
  return objects;
}

function parsePage(content: string, template: string) {
  const objects: (Template & { communicationChannels: Template })[] = [];

  let communicationChannels;
  if ("Communication channels" !== template) {
    communicationChannels = parsePage(content, "Communication channels")[0];
  }

  content = content.replace(/(<!--.*?-->)|(<!--[\w\W\n\s]+?-->)/g, "");

  const regexTemplate = new RegExp("{{" + template.replace(" ", "[_ ]"), "gi");
  let start = content.search(regexTemplate);

  while (start !== -1) {
    let templateContent = content.substring(start);

    const closing = findClosingBracketIndex(templateContent, 0);

    content = templateContent.substring(closing + 1);
    templateContent = templateContent.substring(0, closing + 1);

    templateContent = templateContent
      .substring(templateContent.indexOf("|"), templateContent.length - 2)
      .trim();

    const object = parseTemplateToObject(templateContent) as Template & {
      communicationChannels: Template;
    };
    object.communicationChannels = communicationChannels || {};
    objects.push(object);

    start = content.search(regexTemplate);
  }

  return objects;
}

function parseTemplateToObject(content: string) {
  const obj: Template = {};
  const props = content.split(/\|(?![^{]*})(?![^[]*\])/g);
  props.shift();

  for (const p in props) {
    const pair = props[p].trim();
    const start = pair.indexOf("=");
    const name = pair.substring(0, start).trim();
    const value = pair.substring(start + 1).trim();

    if (value) obj[name] = value;
  }

  return obj;
}
