import { languageValueFormat } from "../utilities/languageValueFormat";
import { getJson } from "../../utilities/jsonRequest";
import { toValues } from "../../utilities/string";
import { App } from "../../data/App";
import { isFreeAndOpenSource } from "../utilities/isFreeAndOpenSource";
import { languageFilter } from "../utilities/languageFilter";
import { platformValueToDisplay } from "../utilities/platformValueToDisplay";
import { platformFilter } from "../utilities/platformFilter";

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

  if (result.welcomingTool?.value === "yes") {
    genre.push("Welcoming tool");
  }

  if (
    result.streetImgSv?.value === "yes" ||
    result.streetImg?.value === "yes"
  ) {
    genre.push("Street-level imagery");
  }

  return genre;
}

function extractIrc(value: any) {
  if (!value) return undefined;

  const url = new URL(value);

  return {
    server: url.hostname,
    channel: url.pathname.substring(1) || url.hash,
  };
}

export function transformWikidataResult(result: any) {
  return {
    name: result.itemLabel.value || "",
    lastRelease: (result.lastRelease?.value || "").split("T")[0] || "",
    description: result.description?.value || "",
    images: (result.images?.value || "").split(";").filter((v: any) => v),
    website:
      result.web?.value || result.webDef?.value
        ? new URL(result.web?.value || result.webDef?.value).toString()
        : "",
    documentation: result.doc?.value || result.docDef?.value || "",
    author: result.authors?.value || "",
    libre: isFreeAndOpenSource(result.license?.value),
    license: (result.license?.value || "").split(";").filter((v: any) => v),
    sourceCode: result.sourceCode?.value || "",
    languages: (result.lgs?.value || "")
      .split(";")
      .filter(languageFilter)
      .map(languageValueFormat),
    languagesUrl: result.lgsUrl?.value || "",
    genre: extractGenre(result),
    topics: [...extractGenre(result), ...toValues(result.topics?.value)],
    platform: [
      ...new Set(
        [
          ...(result.platforms?.value || "").split(";"),
          ...(result.os?.value || "").split(";"),
          result.asin?.value ||
          result.googlePlayID?.value ||
          result.huaweiAppGalleryID?.value ||
          result.fDroidID?.value
            ? "Android"
            : undefined,
          result.appleStoreID?.value ? "iOS" : undefined,
          result.microsoftAppID?.value ? "Windows" : undefined,
        ]
          .filter(platformFilter)
          .map(platformValueToDisplay)
      ),
    ],
    coverage: [],
    install: {
      asin: result.asin?.value,
      googlePlayID: result.googlePlayID?.value,
      huaweiAppGalleryID: result.huaweiAppGalleryID?.value,
      fDroidID: result.fDroidID?.value,
      appleStoreID: result.appleStoreID?.value,
      microsoftAppID: result.microsoftAppID?.value,
    },
    hasGoal: {
      crowdsourcingStreetLevelImagery: result.streetImg,
    },
    community: {
      forum: result.forum?.value || result.forumDef?.value,
      irc: extractIrc(result.irc?.value),
      bluesky: result.blueskyHandle?.value,
      matrix: result.matrixRoomId?.value,
      mastodon: result.mastodonAddress?.value,
      issueTracker: result.issueTrackerUrl?.value,
      telegram: result.telegram?.value || result.telegramDef?.value,
      reddit: result.subreddit?.value,
    },
    source: [
      {
        name: "Wikidata",
        wiki: "",
        url: result.item.value,
        lastChange: result.modified.value,
      },
    ],
  } as any as App;
}

async function request(query: string) {
  const base = "https://query.wikidata.org/sparql";

  const params: any = {};

  params["query"] = query;
  params["format"] = "json";

  return await getJson(base, params);
}

export function requestWikidata(lg: string) {
  const base = request(
    `
SELECT DISTINCT 
  ?item ?itemLabel 
  ?description 
  (GROUP_CONCAT(DISTINCT ?img; SEPARATOR = ";") AS ?images) 
  (SAMPLE(?webDef) AS ?webDef)
  (SAMPLE(?web) AS ?web)
  (SAMPLE(?docDef) AS ?docDef)
  (SAMPLE(?doc) AS ?doc)
  (SAMPLE(?forumDef) AS ?forumDef)
  (SAMPLE(?forum) AS ?forum)
  (GROUP_CONCAT(DISTINCT ?authorLabel; SEPARATOR = ", ") AS ?authors)
  (SAMPLE(?sourceCode) AS ?sourceCode)
  (GROUP_CONCAT(DISTINCT ?lgCode; SEPARATOR = ";") AS ?lgs)
  (SAMPLE(?lgsUrl) AS ?lgsUrl) 
  (GROUP_CONCAT(DISTINCT ?topicLabel; SEPARATOR = ";") AS ?topics)
  (GROUP_CONCAT(DISTINCT ?osLabel; SEPARATOR = ";") AS ?os)
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
  ?welcomingTool
  ?streetImg
  (SAMPLE(?matrixRoomId) AS ?matrixRoomId) 
  (SAMPLE(?blueskyHandle) AS ?blueskyHandle) 
  (SAMPLE(?mastodonAddress) AS ?mastodonAddress) 
  (SAMPLE(?issueTrackerUrl) AS ?issueTrackerUrl) 
  (SAMPLE(?telegramDef) AS ?telegramDef)
  (SAMPLE(?telegram) AS ?telegram)
  (SAMPLE(?subreddit) AS ?subreddit) 
  (SAMPLE(?irc) AS ?irc) 
  ?modified 
WHERE {
  ?item (wdt:P31/(wdt:P279*)) ?type.
  FILTER(?type IN (wd:Q7397, wd:Q86715518, wd:Q4505959))
  { ?item wdt:P144 wd:Q936. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121560942. }
  UNION { ?item wdt:P2283 wd:Q936. }
  UNION { ?item wdt:P144 wd:Q125124940. }
  UNION { ?item wdt:P2283 wd:Q125124940. }
  UNION { ?item wdt:P144 wd:Q116859711. }
  UNION { ?item wdt:P2283 wd:Q116859711. }
  UNION { ?item wdt:P144 wd:Q25822543. }
  UNION { ?item wdt:P2283 wd:Q25822543. }
  UNION { ?item wdt:P2283 wd:Q121746037. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
  
  OPTIONAL {
    ?item schema:description ?description.
    FILTER((LANG(?description)) = "${lg}")
  }
  OPTIONAL { ?item wdt:P18 ?img. }
  OPTIONAL { ?item wdt:P856 ?webDef. }
  OPTIONAL { 
    ?item p:P856 ?webStat. 
    ?webStat ps:P856 ?web.
    ?webStat pq:P407 ?webLg.
    ?webLg wdt:P218 ?webLgCode 
    FILTER(?webLgCode = "${lg}")
  }
  OPTIONAL { 
    ?item p:P1343 ?docDefStat. 
    ?docDefStat pq:P2699 ?docDef.
    }
  OPTIONAL { 
    ?item p:P973 ?docStat. 
    ?docStat ps:P973 ?doc.
    ?docStat pq:P407 ?docLg.
    ?docLg wdt:P218 ?docLgCode 
    FILTER(?docLgCode = "${lg}")
  }
  OPTIONAL { ?item wdt:P10027 ?forumDef. }
  OPTIONAL { 
    ?item p:P10027 ?forumStat. 
    ?forumStat ps:P10027 ?forum.
    ?forumStat pq:P407 ?forumLg.
    ?forumLg wdt:P218 ?forumLgCode 
    FILTER(?forumLgCode = "${lg}")
  }
  OPTIONAL { 
    ?item wdt:P178/rdfs:label ?authorLabel.
    FILTER(LANG(?authorLabel) = "${lg}")
  }
  OPTIONAL { ?item wdt:P1324 ?sourceCode. }
  OPTIONAL { 
    ?item wdt:P407 ?lg.
    ?lg wdt:P218 ?lgCode.
  }
  OPTIONAL { ?item wdt:P11254 ?lgsUrl. }
  OPTIONAL { 
    ?item wdt:P366/rdfs:label ?topicLabel.
    FILTER(LANG(?topicLabel) = "${lg}")
  }
  OPTIONAL { 
    ?item wdt:P306/rdfs:label ?osLabel.
    FILTER(LANG(?osLabel) = "${lg}")
  }
  OPTIONAL { 
    ?item wdt:P400/rdfs:label ?platformLabel.
    FILTER(LANG(?platformLabel) = "${lg}")
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
  OPTIONAL { 
    ?item wdt:P31 wd:Q125191788.
    BIND("yes" AS ?welcomingTool)
  }  
  OPTIONAL { 
    ?item wdt:P31 wd:Q86715518.
    BIND("yes" AS ?streetImgSv)
  }  
  OPTIONAL { 
    ?item p:P3712 ?goalStat. 
    ?goalStat ps:P3712 ?goal. 
    FILTER(?goal = wd:Q275969)
    ?goalStat pq:P12913 wd:Q96470821. 
    BIND("yes" AS ?streetImg)
  }
  OPTIONAL { ?item wdt:P11478 ?matrixRoomId. }
  OPTIONAL { ?item wdt:P4033 ?mastodonAddress. }
  OPTIONAL { ?item wdt:P12361 ?blueskyHandle. }
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
    ?telegramStat pq:P407 ?telegramLg.
    ?telegramLg wdt:P218 ?telegramLgCode 
    FILTER(?telegramLgCode = "${lg}")
  }
  OPTIONAL { ?item wdt:P3984 ?subreddit. }
  OPTIONAL { ?item wdt:P1613 ?irc. }
  ?item schema:dateModified ?modified
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${lg},en". }
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
         ?welcomingTool
         ?streetImgSv
         ?streetImg
         ?modified
`.replace(/( |\n)+/g, " ")
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
  ?item (wdt:P31/(wdt:P279*)) ?type.
  FILTER(?type IN (wd:Q7397, wd:Q86715518, wd:Q4505959))
  { ?item wdt:P144 wd:Q936. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121560942. }
  UNION { ?item wdt:P2283 wd:Q936. }
  UNION { ?item wdt:P144 wd:Q125124940. }
  UNION { ?item wdt:P2283 wd:Q125124940. }
  UNION { ?item wdt:P144 wd:Q116859711. }
  UNION { ?item wdt:P2283 wd:Q116859711. }
  UNION { ?item wdt:P144 wd:Q25822543. }
  UNION { ?item wdt:P2283 wd:Q25822543. }
  UNION { ?item wdt:P2283 wd:Q121746037. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }

  OPTIONAL { ?item wdt:P856 ?webDef. }
  OPTIONAL { 
    ?item p:P856 ?webStat. 
    ?webStat ps:P856 ?web.
    ?webStat pq:P407 ?webLg.
    ?webLg wdt:P218 ?webLgCode 
    FILTER(?webLgCode = "${lg}")
  }
      
  ?item p:P348/pq:P577 ?date.

  ?item schema:dateModified ?modified
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${lg},en". }
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
  (GROUP_CONCAT(?licenseShortName; SEPARATOR = ";") AS ?license)
  ?modified 
WHERE
{
  {
    SELECT DISTINCT 
      ?item ?itemLabel
      (SAMPLE(?licenseShortName) AS ?licenseShortName)
      ?modified 
    WHERE {
      ?item (wdt:P31/(wdt:P279*)) ?type.
      FILTER(?type IN (wd:Q7397, wd:Q86715518, wd:Q4505959))
      { ?item wdt:P144 wd:Q936. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121560942. }
      UNION { ?item wdt:P2283 wd:Q936. }
      UNION { ?item wdt:P144 wd:Q125124940. }
      UNION { ?item wdt:P2283 wd:Q125124940. }
      UNION { ?item wdt:P144 wd:Q116859711. }
      UNION { ?item wdt:P2283 wd:Q116859711. }
      UNION { ?item wdt:P144 wd:Q25822543. }
      UNION { ?item wdt:P2283 wd:Q25822543. }
      UNION { ?item wdt:P2283 wd:Q121746037. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
      FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }

      OPTIONAL { ?item wdt:P856 ?webDef. }
      OPTIONAL { 
        ?item p:P856 ?webStat. 
        ?webStat ps:P856 ?web.
        ?webStat pq:P407 ?webLg.
        ?webLg wdt:P218 ?webLgCode 
        FILTER(?webLgCode = "${lg}")
      }
          
      ?item wdt:P275 ?license.
      ?license wdt:P1813 ?licenseShortName.
      
      ?item schema:dateModified ?modified
      SERVICE wikibase:label { bd:serviceParam wikibase:language "${lg},en". }
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
