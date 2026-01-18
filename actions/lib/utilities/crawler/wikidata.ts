import { languageValueFormat } from "../utilities/languageValueFormat";
import { toValues } from "@shared/utilities/string";
import { App } from "@shared/data/App";
import { isFreeAndOpenSource } from "../utilities/isFreeAndOpenSource";
import { languageFilter } from "../utilities/languageFilter";
import { getPlatformDisplay } from "../utilities/getPlatformDisplay";
import { platformFilter } from "../utilities/platformFilter";
import { newUrl } from "@shared/utilities/url";
import { getJson } from "@shared/utilities/jsonRequest";

function extractGenre(result: any) {
  const genre = [];

  if (result.viewing?.value === "y") {
    genre.push("Viewing tool");
  }

  if (result.routing?.value === "y") {
    genre.push("Routing tool");
  }

  if (result.editor?.value === "y") {
    genre.push("Editor tool");
  }

  if (result.comparing?.value === "y") {
    genre.push("Comparing tool");
  }

  if (result.hashtagTool?.value === "y") {
    genre.push("Hashtag tool");
  }

  if (result.monitoring?.value === "y") {
    genre.push("Monitoring tool");
  }

  if (result.changsetReview?.value === "y") {
    genre.push("Changeset review tool");
  }

  if (result.welcomingTool?.value === "y") {
    genre.push("Welcoming tool");
  }

  if (result.streetImgSv?.value === "y" || result.streetImg?.value === "y") {
    genre.push("Street-level imagery");
  }

  return genre;
}

function extractIrc(value: any) {
  if (!value) return undefined;

  const url = newUrl(value);

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
    images: (result.imgs?.value || "").split(";").filter((v: any) => v),
    logos: (result.logos?.value || "").split(";").filter((v: any) => v),
    commons: (result.commons?.value || "").split(";").filter((v: any) => v),
    videos: (result.videos?.value || "").split(";").filter((v: any) => v),
    website:
      result.web?.value || result.webDef?.value
        ? newUrl(result.web?.value || result.webDef?.value).toString()
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
          result.googlePlay?.value ||
          result.huaweiGallery?.value ||
          result.fDroid?.value
            ? "Android"
            : undefined,
          result.appleStore?.value ? "iOS" : undefined,
          result.microsoftStore?.value ? "Windows" : undefined,
        ]
          .filter(platformFilter)
          .map((p) => getPlatformDisplay(p) || p),
      ),
    ],
    coverage: [],
    install: {
      asin: result.asin?.value,
      googlePlayID: result.googlePlay?.value,
      huaweiAppGalleryID: result.huaweiGallery?.value,
      fDroidID: result.fDroid?.value,
      appleStoreID: result.appleStore?.value,
      microsoftAppID: result.microsoftStore?.value,
    },
    hasGoal: {
      crowdsourcingStreetLevelImagery: result.streetImg,
    },
    community: {
      forum: result.forum?.value || result.forumDef?.value,
      irc: extractIrc(result.irc?.value),
      bluesky: result.bluesky?.value,
      matrix: result.matrix?.value,
      mastodon: result.mastodon?.value,
      lemmy: result.lemmy?.value,
      issueTracker: result.issues?.value,
      telegram: result.teleg?.value || result.telegDef?.value,
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
  (GROUP_CONCAT(DISTINCT ?logo; SEPARATOR = ";") AS ?logos) 
  (GROUP_CONCAT(DISTINCT ?img; SEPARATOR = ";") AS ?imgs) 
  (GROUP_CONCAT(DISTINCT ?common; SEPARATOR = ";") AS ?commons) 
  (GROUP_CONCAT(DISTINCT ?video; SEPARATOR = ";") AS ?videos) 
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
  (SAMPLE(?googlePlay) AS ?googlePlay) 
  (SAMPLE(?huaweiGallery) AS ?huaweiGallery) 
  (SAMPLE(?fDroid) AS ?fDroid) 
  (SAMPLE(?appleStore) AS ?appleStore) 
  (SAMPLE(?microsoftStore) AS ?microsoftStore) 
  (SAMPLE(?matrix) AS ?matrix) 
  (SAMPLE(?bluesky) AS ?bluesky) 
  (SAMPLE(?mastodon) AS ?mastodon) 
  (SAMPLE(?lemmy) AS ?lemmy) 
  (SAMPLE(?issues) AS ?issues) 
  (SAMPLE(?telegDef) AS ?telegDef)
  (SAMPLE(?teleg) AS ?teleg)
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
  OPTIONAL { ?item wdt:P154 ?logo. }
  OPTIONAL { ?item wdt:P18 ?img. }
  OPTIONAL { ?item wdt:P373 ?common. }
  OPTIONAL { ?item wdt:P10 ?video. }
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
  OPTIONAL { ?item wdt:P3597 ?fDroid. }
  OPTIONAL { ?item wdt:P3418 ?googlePlay. }
  OPTIONAL { ?item wdt:P8940 ?huaweiGallery. }
  OPTIONAL { ?item wdt:P3861 ?appleStore. }
  OPTIONAL { ?item wdt:P5885 ?microsoftStore. }
  OPTIONAL { ?item wdt:P11478 ?matrix. }
  OPTIONAL { ?item wdt:P4033 ?mastodon. }
  OPTIONAL { ?item wdt:P11947 ?lemmy. }
  OPTIONAL { ?item wdt:P12361 ?bluesky. }
  OPTIONAL { ?item wdt:P1401 ?issues. }
  OPTIONAL { 
    ?item p:P3789 ?telegStat. 
    ?telegStat ps:P3789 ?telegDef; 
     pq:P3831 wd:Q87410646.
  }
  OPTIONAL { 
    ?item p:P3789 ?telegStat. 
    ?telegStat ps:P3789 ?teleg; 
     pq:P3831 wd:Q87410646.
    ?telegStat pq:P407 ?telegLg.
    ?telegLg wdt:P218 ?telegLgCode 
    FILTER(?telegLgCode = "${lg}")
  }
  OPTIONAL { ?item wdt:P3984 ?subreddit. }
  OPTIONAL { ?item wdt:P1613 ?irc. }
  ?item schema:dateModified ?modified
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${lg},mul,en". }
}
GROUP BY ?item 
         ?itemLabel 
         ?description
         ?modified
`.replace(/( |\n)+/g, " "),
  );

  const genre = request(
    `
SELECT DISTINCT 
  ?item ?itemLabel 
  ?viewing
  ?routing
  ?editor
  ?comparing
  ?hashtagTool
  ?monitoring
  ?changsetReview
  ?welcomingTool
  ?streetImg
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
    ?item wdt:P31 wd:Q122264265.
    BIND("y" AS ?viewing)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122264957.
    BIND("y" AS ?routing)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q130404096.
    BIND("y" AS ?routing)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q98163019.
    BIND("y" AS ?editor)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122264344.
    BIND("y" AS ?comparing)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122270779.
    BIND("y" AS ?hashtagTool)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q122270784.
    BIND("y" AS ?monitoring)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q125191237.
    BIND("y" AS ?changsetReview)
  }
  OPTIONAL { 
    ?item wdt:P31 wd:Q125191788.
    BIND("y" AS ?welcomingTool)
  }  
  OPTIONAL { 
    ?item wdt:P31 wd:Q86715518.
    BIND("y" AS ?streetImgSv)
  }  
  OPTIONAL { 
    ?item p:P3712 ?goalStat. 
    ?goalStat ps:P3712 ?goal. 
    FILTER(?goal = wd:Q275969)
    ?goalStat pq:P12913 wd:Q96470821. 
    BIND("y" AS ?streetImg)
  }
  ?item schema:dateModified ?modified
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${lg},mul,en". }
}
GROUP BY ?item 
         ?itemLabel 
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
`.replace(/( |\n)+/g, " "),
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
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${lg},mul,en". }
}
GROUP BY ?item
         ?itemLabel
         ?modified
`.replaceAll("  ", " "),
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
      SERVICE wikibase:label { bd:serviceParam wikibase:language "${lg},mul,en". }
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
`.replaceAll("  ", " "),
  );

  return [base, genre, lastRelease, license];
}
