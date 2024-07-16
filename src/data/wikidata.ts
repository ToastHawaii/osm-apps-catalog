import { languageValueToDisplay } from "../ui/language";
import { getJson } from "../ui/utilities/jsonRequest";
import { App } from "./template/utilities";

function extractGenre(result: any) {
  const genre = [];

  if (result.viewing?.value === "yes") {
    genre.push("Viewing tool");
  }

  if (result.routing?.value === "yes") {
    genre.push("Routing tool");
  }

  if (result.editor?.value === "yes") {
    genre.push("Editor tool");
  }

  if (result.comparing?.value === "yes") {
    genre.push("Comparing tool");
  }

  if (result.hashtagTool?.value === "yes") {
    genre.push("Hashtag tool");
  }

  if (result.monitoring?.value === "yes") {
    genre.push("Monitoring tool");
  }

  if (result.changsetReview?.value === "yes") {
    genre.push("Changeset review tool");
  }

  return genre;
}

export function transformWikidataResult(result: any) {
  return {
    name: result.itemLabel.value || "",
    lastRelease: (result.lastRelease?.value || "").split("T")[0] || "",
    description: result.description?.value || "",
    images: result.image?.value ? [result.image.value] : [],
    website: result.website?.value || result.websiteDefault?.value || "",
    documentation:
      result.documentation?.value || result.documentationDefault?.value || "",
    author: result.authors?.value || "",
    libre: (result.license?.value || "")?.match(
      "(?:.*GPL.*|Apache.*|.*BSD.*|PD|WTFPL|Ms-PL.*)"
    ),
    license: result.license?.value || "",
    sourceCode: result.sourceCode?.value || "",
    languages: (result.languages?.value || "")
      .split(";")
      .filter((v: any) => v)
      .map((v: any) => languageValueToDisplay(v)),
    languagesUrl: result.languagesUrl?.value || "",
    genre: extractGenre(result),
    topics: [
      ...extractGenre(result),
      ...(result.topics?.value || "").split(";").filter((v: any) => v),
    ],
    platform: (result.platforms?.value || "").split(";").filter((v: any) => v),
    coverage: [],
    install: {
      asin: result.asin?.value,
      googlePlayID: result.googlePlayID?.value,
      huaweiAppGalleryID: result.huaweiAppGalleryID?.value,
      fDroidID: result.fDroidID?.value,
      appleStoreID: result.appleStoreID?.value,
      microsoftAppID: result.microsoftAppID?.value,
    },
    source: [
      {
        name: "Wikidata",
        wiki: "",
        displayName: `Wikidata <i class="fas fa-pen"></i>`,
        url: result.item.value,
        lastChange: result.modified.value,
      },
    ],
  } as App;
}

async function request(query: string) {
  const base = "https://query.wikidata.org/sparql";

  const params: any = {};

  params["query"] = query;
  params["format"] = "json";

  return await getJson(base, params);
}

export function requestWikidata(language: string) {
  const base = request(
    `
SELECT DISTINCT 
  ?item ?itemLabel 
  ?description 
  (SAMPLE(?image) AS ?image) 
  (SAMPLE(?websiteDefault) AS ?websiteDefault)
  (SAMPLE(?website) AS ?website)
  (SAMPLE(?documentationDefault) AS ?documentationDefault)
  (SAMPLE(?documentation) AS ?documentation)
  (GROUP_CONCAT(DISTINCT ?authorLabel; SEPARATOR = ", ") AS ?authors)
  (SAMPLE(?sourceCode) AS ?sourceCode)
  (GROUP_CONCAT(DISTINCT ?languageCode; SEPARATOR = ";") AS ?languages)
  (SAMPLE(?languagesUrl) AS ?languagesUrl) 
  (GROUP_CONCAT(DISTINCT ?topicLabel; SEPARATOR = ";") AS ?topics)
  (GROUP_CONCAT(DISTINCT ?platformLabel; SEPARATOR = ";") AS ?platforms)
  (SAMPLE(?asin) AS ?asin) 
  (SAMPLE(?googlePlayID) AS ?googlePlayID) 
  (SAMPLE(?huaweiAppGalleryID) AS ?huaweiAppGalleryID) 
  (SAMPLE(?fDroidID) AS ?fDroidID) 
  (SAMPLE(?appleStoreID) AS ?appleStoreID) 
  (SAMPLE(?microsoftAppID) AS ?microsoftAppID) 
  ?viewing
  ?routing
  ?editor
  ?comparing
  ?hashtagTool
  ?monitoring
  ?changsetReview
  ?modified 
WHERE {
  ?item (wdt:P31/(wdt:P279*)) wd:Q7397.
  { ?item wdt:P144 wd:Q936. }
  UNION { ?item wdt:P2283 wd:Q936. }
  UNION { ?item wdt:P144 wd:Q125124940. }
  UNION { ?item wdt:P2283 wd:Q125124940. }
  UNION { ?item wdt:P144 wd:Q116859711. }
  UNION { ?item wdt:P2283 wd:Q116859711. }
  UNION { ?item wdt:P144 wd:Q25822543. }
  UNION { ?item wdt:P2283 wd:Q25822543. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  OPTIONAL {
    ?item schema:description ?description.
    FILTER((LANG(?description)) = "${language}")
  }
  OPTIONAL { ?item wdt:P18 ?image. }
  OPTIONAL { ?item wdt:P856 ?websiteDefault. }
  OPTIONAL { 
    ?item p:P856 ?websiteStatement. 
    ?websiteStatement ps:P856 ?website.
    ?websiteStatement pq:P407 ?websiteLanguage.
    ?websiteLanguage wdt:P218 ?websiteLanguageCode 
    FILTER(?websiteLanguageCode = "${language}")
  }
  OPTIONAL { 
    ?item p:P1343 ?documentationDefaultStatement. 
    ?documentationDefaultStatement pq:P2699 ?documentationDefault.
    }
  OPTIONAL { 
    ?item p:P973 ?documentationStatement. 
    ?documentationStatement ps:P973 ?documentation.
    ?documentationStatement pq:P407 ?documentaionLanguage.
    ?documentaionLanguage wdt:P218 ?documentaionLanguageCode 
    FILTER(?documentaionLanguageCode = "${language}")
  }
  OPTIONAL { 
    ?item wdt:P178/rdfs:label ?authorLabel.
    FILTER(LANG(?authorLabel) = "${language}")
  }
  OPTIONAL { ?item wdt:P1324 ?sourceCode. }
  OPTIONAL { 
    ?item wdt:P407 ?language.
    ?language wdt:P218 ?languageCode.
  }
  OPTIONAL { ?item wdt:P11254 ?languagesUrl. }
  OPTIONAL { 
    ?item wdt:P366/rdfs:label ?topicLabel.
    FILTER(LANG(?topicLabel) = "${language}")
  }
  OPTIONAL { 
    ?item wdt:P306/rdfs:label ?platformLabel.
    FILTER(LANG(?platformLabel) = "${language}")
  }
  OPTIONAL { ?item wdt:P5749 ?asin. }
  OPTIONAL { ?item wdt:P3597 ?fDroidID. }
  OPTIONAL { ?item wdt:P3418 ?googlePlayID. }
  OPTIONAL { ?item wdt:P8940 ?huaweiAppGalleryID. }
  OPTIONAL { ?item wdt:P3861 ?appleStoreID. }
  OPTIONAL { ?item wdt:P5885 ?microsoftAppID. }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122264265.
    BIND("yes" AS ?viewing)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122264957.
    BIND("yes" AS ?routing)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q98163019.
    BIND("yes" AS ?editor)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122264344.
    BIND("yes" AS ?comparing)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122270779.
    BIND("yes" AS ?hashtagTool)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122270784.
    BIND("yes" AS ?monitoring)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q125191237.
    BIND("yes" AS ?changsetReview)
  }
  ?item schema:dateModified ?modified
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${language},en". }
}
GROUP BY ?item 
         ?itemLabel 
         ?description
         ?viewing 
         ?routing 
         ?editor 
         ?comparing 
         ?hashtagTool 
         ?monitoring 
         ?changsetReview 
         ?modified
`.replaceAll("  ", " ")
  );

  const lastRelease = request(
    `
SELECT DISTINCT 
  ?item ?itemLabel
  (MAX(?date) AS ?lastRelease)
  ?modified 
WHERE {
  ?item (wdt:P31/(wdt:P279*)) wd:Q7397.
  { ?item wdt:P144 wd:Q936. }
  UNION { ?item wdt:P2283 wd:Q936. }
  UNION { ?item wdt:P144 wd:Q125124940. }
  UNION { ?item wdt:P2283 wd:Q125124940. }
  UNION { ?item wdt:P144 wd:Q116859711. }
  UNION { ?item wdt:P2283 wd:Q116859711. }
  UNION { ?item wdt:P144 wd:Q25822543. }
  UNION { ?item wdt:P2283 wd:Q25822543. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
      
  ?item p:P348/pq:P577 ?date.

  ?item schema:dateModified ?modified
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${language},en". }
}
GROUP BY ?item
         ?itemLabel
         ?modified
`.replaceAll("  ", " ")
  );

  const license = request(
    `
SELECT DISTINCT 
  ?item ?itemLabel
  (GROUP_CONCAT(?licenseShortName; SEPARATOR = ", ") AS ?license)
  ?modified 
WHERE
{
  {
    SELECT DISTINCT 
      ?item ?itemLabel
      (SAMPLE(?licenseShortName) AS ?licenseShortName)
      ?modified 
    WHERE {
      ?item (wdt:P31/(wdt:P279*)) wd:Q7397.
      { ?item wdt:P144 wd:Q936. }
      UNION { ?item wdt:P2283 wd:Q936. }
      UNION { ?item wdt:P144 wd:Q125124940. }
      UNION { ?item wdt:P2283 wd:Q125124940. }
      UNION { ?item wdt:P144 wd:Q116859711. }
      UNION { ?item wdt:P2283 wd:Q116859711. }
      UNION { ?item wdt:P144 wd:Q25822543. }
      UNION { ?item wdt:P2283 wd:Q25822543. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
          
      ?item wdt:P275 ?license.
      ?license wdt:P1813 ?licenseShortName.
      
      ?item schema:dateModified ?modified
      SERVICE wikibase:label { bd:serviceParam wikibase:language "${language},en". }
    }
    GROUP BY ?item 
             ?itemLabel
             ?license
             ?modified
  }
  
  OPTIONAL { FILTER(((LANG(?licenseShortName)) = "en") || ((LANG(?licenseShortName)) = "mul")) }
}
GROUP BY ?item 
         ?itemLabel
         ?modified
`.replaceAll("  ", " ")
  );

  return [base, lastRelease, license];
}
