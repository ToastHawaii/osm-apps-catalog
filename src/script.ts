import { getJson } from "./utilities/jsonRequest";

function findClosingBracketIndex(str: string, pos: number) {
  if (str[pos] !== "{") {
    throw new Error("The position must contain an opening bracket");
  }
  let level = 1;
  for (let index = pos + 1; index < str.length; index++) {
    if (str[index] === "{") {
      level++;
    } else if (str[index] === "}") {
      level--;
    }

    if (level === 0) {
      return index;
    }
  }
  return -1;
}

loadPagesByTemplate("Service item");
loadPagesByTemplate("Software");

function parseTemplate(content: string) {
  const obj: { [name: string]: string } = {};
  const props = content.split(/\|(?![^{]*})(?![^\[]*\])/g);
  props.shift();

  for (const p in props) {
    const pair = props[p].trim();
    const start = pair.indexOf("=");
    const name = pair.substring(0, start).trim();
    const value = pair.substring(start + 1).trim();

    if (value) obj[name] = value;
  }

  console.info(obj);
}

function parsePage(content: string, template: string) {
  const start = content.indexOf("{{" + template);

  if (start === -1) return;

  let templateContent = content.substring(start);

  const closing = findClosingBracketIndex(templateContent, 0);

  const rest = templateContent.substring(closing + 1);
  templateContent = templateContent.substring(0, closing + 1);

  templateContent = templateContent
    .substring(templateContent.indexOf("|"), templateContent.length - 2)
    .trim();

  //console.info(templateContent);
  parseTemplate(templateContent);

  parsePage(rest, template);
}

async function loadPages(ids: string[], template: string) {
  const params: { [name: string]: string } = {
    prop: "revisions",
    rvprop: "content",
    pageids: ids.join("|"),
    rvslots: "*"
  };

  const response = await osmMediaApiQuery(params);

  const pages = response.query.pages;
  for (const p in pages) {
    const content = pages[p].revisions[0].slots.main.content;

    parsePage(content, template);
  }
}

async function osmMediaApiQuery(params: { [name: string]: string }) {
  const base = "https://wiki.openstreetmap.org/w/api.php";

  params["origin"] = "*";
  params["action"] = "query";
  params["formatversion"] = "2";
  params["format"] = "json";

  return await getJson(base, params);
}

async function loadPagesByTemplate(template: string) {
  const params = {
    list: "embeddedin",
    eititle: "Template:" + template,
    eilimit: "500"
  };

  const response = await osmMediaApiQuery(params);

  processPagesByTemplateResult(response, template);
}

function processPagesByTemplateResult(
  response: { continue: { eicontinue: any }; query: { embeddedin: any } },
  template: string
) {
  if (response.continue && response.continue.eicontinue)
    loadPagesByTemplatePage(response.continue.eicontinue, template);
  const pages = response.query.embeddedin;
  let ids = [];
  for (const p in pages) {
    if (!/^\w{2}:/g.test(pages[p].title)) ids.push(pages[p].pageid);

    if (ids.length >= 50) {
      loadPages(ids, template);
      ids = [];
    }
  }

  if (ids.length > 0) {
    loadPages(ids, template);
  }
}

async function loadPagesByTemplatePage(con: string, template: string) {
  const params = {
    list: "embeddedin",
    eititle: "Template:" + template,
    eicontinue: con,
    eilimit: "500"
  };

  const response = await osmMediaApiQuery(params);

  processPagesByTemplateResult(response, template);
}
