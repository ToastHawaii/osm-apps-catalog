import { getJson } from "@shared/utils/jsonRequest";
import { findClosingBracketIndex } from "@shared/utils/string";

type Template = Record<string, string>;

type TemplateObject = Template & {
  communicationChannels: Template;
};

interface EmbeddedPage {
  pageid: number;
  ns: number;
  title: string;
}

interface Revision {
  timestamp: string;
  slots: {
    main: {
      content: string;
    };
  };
}

interface EmbeddedInResponse {
  continue?: {
    eicontinue: string;
  };
  query: {
    embeddedin: EmbeddedPage[];
  };
}

interface PagesResponse {
  query: {
    pages: Record<
      string,
      {
        pageid: number;
        title: string;
        revisions: Revision[];
      }
    >;
  };
}

export async function requestTemplates(
  template: string,
  languageMode: "en" | "notEn",
): Promise<TemplateObject[]> {
  const objects: TemplateObject[] = [];

  let eicontinue: string | undefined;

  do {
    const params: Record<string, string> = {
      list: "embeddedin",
      eititle: `Template:${template}`,

      // Only search the main/article namespace.
      // This excludes User:, Talk:, Template:, etc.
      // User namespace is not a good source since other users may not want to
      // or may not feel comfortable editing the entries there..
      einamespace: "0",

      eilimit: "500",
    };

    if (eicontinue) {
      params.eicontinue = eicontinue;
    }

    const response = await osmMediaApiQuery<EmbeddedInResponse>(params);

    objects.push(
      ...(await processPagesByTemplateResult(response, template, languageMode)),
    );

    eicontinue = response.continue?.eicontinue;
  } while (eicontinue);

  return objects;
}

async function osmMediaApiQuery<T>(params: Record<string, string>) {
  const base = "https://wiki.openstreetmap.org/w/api.php";

  return (await getJson(base, {
    ...params,
    origin: "*",
    action: "query",
    formatversion: "2",
    format: "json",
  })) as T;
}

const languages =
  "af|ast|az|id|ms|bs|br|ca|cs|da|de|et|en|es|eo|eu|fr|fy|gl|hr|ia|is|it|ht|gcf|ku|lv|lb|lt|hu|nl|no|nn|oc|pl|pnb|pt|ro|sq|sk|sl|sr-latn|fi|sv|tl|vi|tr|diq|el|be|bg|mk|mn|ru|sr|uk|hy|he|ar|fa|ps|ne|bn|ta|ml|si|th|my|ka|ko|tzm|zh-hans|zh-hant|ja|yue";

const languagePrefixRegex = new RegExp(`^(${languages}):`, "i");

async function processPagesByTemplateResult(
  response: EmbeddedInResponse,
  template: string,
  languageMode: "en" | "notEn",
): Promise<TemplateObject[]> {
  const pages = response.query.embeddedin;

  const objects: TemplateObject[] = [];
  let ids: number[] = [];

  for (const page of pages) {
    const isLanguagePage = languagePrefixRegex.test(page.title);

    if (languageMode === "en") {
      if (!isLanguagePage) {
        ids.push(page.pageid);
      }
    } else if (isLanguagePage) {
      ids.push(page.pageid);
    }

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

async function loadPages(ids: number[], template: string) {
  const params: Record<string, string> = {
    prop: "revisions",
    rvprop: "content|timestamp",
    rvslots: "main",
    pageids: ids.join("|"),
  };

  const response = await osmMediaApiQuery<PagesResponse>(params);

  const objects: TemplateObject[] = [];

  for (const page of Object.values(response.query.pages)) {
    const content = page.revisions[0].slots.main.content;
    const pageObjects = parsePage(content, template);
    for (const object of pageObjects) {
      object.language = languagePrefixRegex.test(page.title)
        ? page.title.split(":", 1)[0]
        : "en";
      object.sourceWiki = page.title;
      object.timestamp = page.revisions[0].timestamp;
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

  content = content.replace(
    /(<!--.*?-->)|(<!--[\w\W\n\s]+?-->)|{{Historic artifact start(.|\n)*?{{Historic artifact end}}/g,
    "",
  );

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
