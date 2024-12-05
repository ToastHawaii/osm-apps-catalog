import { languageValueToDisplay } from "../ui/language";
import { getJson } from "../ui/utilities/jsonRequest";
import { toValues } from "../ui/utilities/string";
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
    website:
      result.web?.value || result.webDef?.value
        ? new URL(result.web?.value || result.webDef?.value).toString()
        : "",
    documentation: result.doc?.value || result.docDef?.value || "",
    author: result.authors?.value || "",
    libre: (result.license?.value || "")?.match(
      "(?:.*GPL.*|Apache.*|.*BSD.*|PD|WTFPL|ISC.*|MIT.*|Unlicense|ODbL.*|MPL.*|CC.*|Ms-PL.*)"
    ),
    license: result.license?.value || "",
    sourceCode: result.sourceCode?.value || "",
    languages: (result.languages?.value || "")
      .split(";")
      .filter((v: any) => v)
      .map((v: any) => languageValueToDisplay(v)),
    languagesUrl: result.languagesUrl?.value || "",
    genre: extractGenre(result),
    topics: [...extractGenre(result), ...toValues(result.topics?.value)],
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
    community: {
      forum: result.forum?.value || result.forumDef?.value,
      issueTracker: result.issueTrackerUrl?.value,
      telegram: result.telegram?.value || result.telegramDef?.value,
      mastodon: result.mastodonAddress?.value,
      reddit: result.subreddit?.value,
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
  (SAMPLE(?webDef) AS ?webDef)
  (SAMPLE(?web) AS ?web)
  (SAMPLE(?docDef) AS ?docDef)
  (SAMPLE(?doc) AS ?doc)
  (SAMPLE(?forumDef) AS ?forumDef)
  (SAMPLE(?forum) AS ?forum)
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
  (SAMPLE(?issueTrackerUrl) AS ?issueTrackerUrl) 
  (SAMPLE(?telegramDef) AS ?telegramDef)
  (SAMPLE(?telegram) AS ?telegram)
  (SAMPLE(?mastodonAddress) AS ?mastodonAddress) 
  (SAMPLE(?subreddit) AS ?subreddit) 
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
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
  
  OPTIONAL {
    ?item schema:description ?description.
    FILTER((LANG(?description)) = "${language}")
  }
  OPTIONAL { ?item wdt:P18 ?image. }
  OPTIONAL { ?item wdt:P856 ?webDef. }
  OPTIONAL { 
    ?item p:P856 ?webStat. 
    ?webStat ps:P856 ?web.
    ?webStat pq:P407 ?webLang.
    ?webLang wdt:P218 ?webLangCode 
    FILTER(?webLangCode = "${language}")
  }
  OPTIONAL { 
    ?item p:P1343 ?docDefStat. 
    ?docDefStat pq:P2699 ?docDef.
    }
  OPTIONAL { 
    ?item p:P973 ?docStat. 
    ?docStat ps:P973 ?doc.
    ?docStat pq:P407 ?docLang.
    ?docLang wdt:P218 ?docLangCode 
    FILTER(?docLangCode = "${language}")
  }
  OPTIONAL { ?item wdt:P10027 ?forumDef. }
  OPTIONAL { 
    ?item p:P10027 ?forumStat. 
    ?forumStat ps:P10027 ?forum.
    ?forumStat pq:P407 ?forumLang.
    ?forumLang wdt:P218 ?forumLangCode 
    FILTER(?forumLangCode = "${language}")
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
    ?item wdt:P31 wd:Q130404096.
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
  OPTIONAL { ?item wdt:P1401 ?issueTrackerUrl. }
  OPTIONAL { 
    ?item p:P3789 ?telegramStat. 
    ?telegramStat ps:P3789 ?telegramDef; 
     pq:P3831 wd:Q87410646.
  }
  
  OPTIONAL { 
    ?item p:P3789 ?telegramStat. 
    ?telegramStat ps:P3789 ?telegram; 
     pq:P3831 wd:Q87410646.
    ?telegramStat pq:P407 ?telegramLang.
    ?telegramLang wdt:P218 ?telegramLangCode 
    FILTER(?telegramLangCode = "${language}")
  }
  OPTIONAL { ?item wdt:P4033 ?mastodonAddress. }
  OPTIONAL { ?item wdt:P3984 ?subreddit. }
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
  (SAMPLE(?webDef) AS ?webDef)
  (SAMPLE(?web) AS ?web)
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
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }

  OPTIONAL { ?item wdt:P856 ?webDef. }
  OPTIONAL { 
    ?item p:P856 ?webStat. 
    ?webStat ps:P856 ?web.
    ?webStat pq:P407 ?webLang.
    ?webLang wdt:P218 ?webLangCode 
    FILTER(?webLangCode = "${language}")
  }
      
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
  (SAMPLE(?webDef) AS ?webDef)
  (SAMPLE(?web) AS ?web)
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
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
      FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }

      OPTIONAL { ?item wdt:P856 ?webDef. }
      OPTIONAL { 
        ?item p:P856 ?webStat. 
        ?webStat ps:P856 ?web.
        ?webStat pq:P407 ?webLang.
        ?webLang wdt:P218 ?webLangCode 
        FILTER(?webLangCode = "${language}")
      }
          
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
