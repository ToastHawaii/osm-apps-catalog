import { toValues } from "@shared/utils/string";
import { App } from "@shared/data/App";
import { convertToHttps, newUrl } from "@shared/utils/url";
import { getJson } from "@shared/utils/jsonRequest";
import { getPlatformDisplay } from "@actions/lib/getPlatformDisplay";
import {
  isFreeAndOpenSourceLicense,
  isFreeAndOpenSourceSoftware,
} from "@actions/lib/isFreeAndOpenSource";
import { languageFilter } from "@actions/lib/languageFilter";
import { languageValueFormat } from "@actions/lib/languageValueFormat";
import { platformFilter } from "@actions/lib/platformFilter";
import { getProgrammingLanguageDisplay } from "@actions/lib/getProgrammingLanguageDisplay";
import { uniq, upperFirst } from "lodash";

function extractGenre(result: any) {
  const types = [
    "ROUTE PLANNING SOFTWARE",
    "ROUTE PLANNING TOOL",
    "OPENSTREETMAP ROUTING TOOL",
    "ROUTING SOFTWARE",
    "RENDERING SOFTWARE",
    "OPENSTREETMAP EXTRACTION TOOL",
    "OPENSTREETMAP EDITOR SOFTWARE",
    "STREET-LEVEL IMAGERY SERVICE",
    "OPENSTREETMAP CHANGESET REVIEW TOOL",
    "TASKING MANAGER",
    "CONVERTER",
    "OPENSTREETMAP VIEWING TOOL",
    "OPENSTREETMAP WELCOMING TOOL",
    "OPENSTREETMAP MONITORING TOOL",
    "AUTOMOTIVE NAVIGATION SYSTEM",
    "OSM HASHTAG TOOL",
    "OPENSTREETMAP COMPARING TOOL",
  ];

  const genre = [];

  genre.push(
    ...(result.types?.value || "")
      .split(";")
      .filter((v: string) => types.includes(v.toUpperCase()))
      .map((v: string) =>
        v
          .replaceAll("OpenStreetMap ", "")
          .replaceAll("OSM  ", "")
          .replaceAll("street-level imagery service", "street-level imagery"),
      )
      .map(upperFirst),
  );

  if (result.streetImg?.value === "y") {
    genre.push("Street-level imagery");
  }

  return uniq(genre);
}

function extractIrc(value: any) {
  if (!value) return undefined;

  const url = newUrl(value);

  return {
    server: url.hostname,
    channel: url.pathname.substring(1) || url.hash,
  };
}

export function transform(result: any) {
  return {
    name: result.itemLabel?.value || "",
    lastRelease: (result.lastRelease?.value || "").split("T")[0] || "",
    subtitle: result.motto?.value || result.subtitle?.value || "",
    description: result.desc?.value || "",
    images: (result.imgs?.value || "")
      .split(";")
      .filter((v: any) => v)
      // Convert http to https, https://query.wikidata.org/ gives back http://commons.wikimedia.org/wiki/File: instead of https://commons.wikimedia.org/wiki/File:
      .map(convertToHttps),
    logos: [
      ...(result.icons?.value || "").split(";"),
      ...(result.logos?.value || "").split(";"),
    ]
      .filter((v: any) => v)
      .map(convertToHttps),
    commons: (result.commons?.value || "").split(";").filter((v: any) => v),
    videos: (result.videos?.value || "")
      .split(";")
      .filter((v: any) => v)
      .map(convertToHttps),
    website:
      result.web?.value || result.webDef?.value
        ? newUrl(result.web?.value || result.webDef?.value).toString()
        : "",
    documentation: result.doc?.value || result.docDef?.value || "",
    author: result.authors?.value || "",
    libre:
      isFreeAndOpenSourceSoftware(result.types?.value) ||
      isFreeAndOpenSourceLicense(result.license?.value),
    license: (result.license?.value || "").split(";").filter((v: any) => v),
    sourceCode: result.sourceCode?.value || "",
    programmingLanguages: (result.progLgs?.value || "")
      .split(";")
      .filter((v: any) => v)
      .map((v: any) => getProgrammingLanguageDisplay(v) || v),
    languages: (result.lgs?.value || "")
      .split(";")
      .filter(languageFilter)
      .map(languageValueFormat),
    languagesUrl: result.lgsUrl?.value || "",
    genre: extractGenre(result),
    topics: [
      ...extractGenre(result),
      ...toValues(result.topics?.value),
      ...toValues(result.genres?.value),
      ...toValues(result.subjects?.value),
      ...toValues(result.fows?.value),
      ...toValues(result.depicts?.value),
    ],
    platform: [
      ...new Set(
        [
          ...(result.platforms?.value || "").split(";"),
          ...(result.os?.value || "").split(";"),
          result.asin?.value ||
          result.google?.value ||
          result.huawei?.value ||
          result.fDroid?.value
            ? "Android"
            : undefined,
          result.apple?.value ? "iOS" : undefined,
          result.microsoft?.value ? "Windows" : undefined,
          ...(result.types?.value || "").split(";"),
        ]
          .filter(platformFilter)
          .map((p) => getPlatformDisplay(p) || p),
      ),
    ],
    coverage: [],
    install: {
      asin: result.asin?.value,
      googlePlayID: result.google?.value,
      huaweiAppGalleryID: result.huawei?.value,
      fDroidID: result.fDroid?.value,
      appleStoreID: result.apple?.value,
      microsoftAppID: result.microsoft?.value,
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
    funding: result.donation?.value
      ? [{ url: result.donation?.value, source: result.item.value }]
      : [],
    source: [
      {
        name: "Wikidata",
        // get wikidatas item Q-ID from full URL
        id: result.item.value.split("/").pop(),
        language: result.lg?.value,
        url: result.item.value,
        lastChange: result.modified?.value,
      },
    ],
  } as any as App;
}

export async function request(query: string) {
  const base = "https://query.wikidata.org/sparql";

  const params: any = {};

  params["query"] = query.replace(/\s*#.*$/gm, "").replace(/( |\n)+/g, " ");
  params["format"] = "json";

  return await getJson(base, params);
}

export const AppQueries = [
  // Base
  `
SELECT DISTINCT 
  ?item ?itemLabel 
  ?desc 
  (SAMPLE(?motto) AS ?motto)
  (SAMPLE(?subtitle) AS ?subtitle)
  (GROUP_CONCAT(DISTINCT ?icon; SEPARATOR = ";") AS ?icons) 
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
  (GROUP_CONCAT(DISTINCT ?author; SEPARATOR = ", ") AS ?authors)
  (SAMPLE(?sourceCode) AS ?sourceCode)
  (GROUP_CONCAT(DISTINCT ?progLg; SEPARATOR = ";") AS ?progLgs)
  (GROUP_CONCAT(DISTINCT ?lgCode; SEPARATOR = ";") AS ?lgs)
  (SAMPLE(?lgsUrl) AS ?lgsUrl) 
   (SAMPLE(?asin) AS ?asin) 
  (SAMPLE(?google) AS ?google) 
  (SAMPLE(?huawei) AS ?huawei) 
  (SAMPLE(?fDroid) AS ?fDroid) 
  (SAMPLE(?apple) AS ?apple) 
  (SAMPLE(?microsoft) AS ?microsoft) 
  (SAMPLE(?matrix) AS ?matrix) 
  (SAMPLE(?bluesky) AS ?bluesky) 
  (SAMPLE(?mastodon) AS ?mastodon) 
  (SAMPLE(?lemmy) AS ?lemmy) 
  (SAMPLE(?issues) AS ?issues) 
  (SAMPLE(?telegDef) AS ?telegDef)
  (SAMPLE(?teleg) AS ?teleg)
  (SAMPLE(?subreddit) AS ?subreddit) 
  (SAMPLE(?irc) AS ?irc) 
  (SAMPLE(?donation) AS ?donation) 
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
  UNION { ?item wdt:P2283 wd:Q121563476. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121563476. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
  FILTER NOT EXISTS { ?item wdt:P576 ?abolished. }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "mul,en". }

  OPTIONAL {
    ?item schema:description ?desc.
    FILTER(LANG(?desc) = "mul" || LANG(?desc) = "en")
  }

  OPTIONAL {
    ?item wdt:P1451 ?motto.
    FILTER(LANG(?motto) = "mul" || LANG(?motto) = "en")
  }
    
  OPTIONAL { 
    ?item wdt:P1680 ?subtitle. 
    FILTER(LANG(?subtitle) = "mul" || LANG(?subtitle) = "en")
  }

  OPTIONAL { ?item wdt:P8972 ?icon. }
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
    FILTER(?webLgCode = "en")
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
    FILTER(?docLgCode = "en")
  }
  OPTIONAL { ?item wdt:P10027 ?forumDef. }
  OPTIONAL { 
    ?item p:P10027 ?forumStat. 
    ?forumStat ps:P10027 ?forum.
    ?forumStat pq:P407 ?forumLg.
    ?forumLg wdt:P218 ?forumLgCode 
    FILTER(?forumLgCode = "en")
  }
  OPTIONAL {
    ?item wdt:P178 ?aItem.

    OPTIONAL {
      ?aItem rdfs:label ?aEn.
      FILTER(LANG(?aEn) = "en")
    }

    OPTIONAL {
      ?aItem rdfs:label ?aMul.
      FILTER(LANG(?aMul) = "mul")
    }

    BIND(COALESCE(?aEn, ?aMul) AS ?author)
  }
  OPTIONAL { ?item wdt:P1324 ?sourceCode. }
  OPTIONAL {
    ?item wdt:P277 ?plItem.

    OPTIONAL {
      ?plItem rdfs:label ?plEn.
      FILTER(LANG(?plEn) = "en")
    }

    OPTIONAL {
      ?plItem rdfs:label ?plMul.
      FILTER(LANG(?plMul) = "mul")
    }

    BIND(COALESCE(?plEn, ?plMul) AS ?progLg)
  }
  OPTIONAL {
    ?item wdt:P407 ?lg.
    OPTIONAL { ?lg wdt:P218 ?lgCode. }
    OPTIONAL { ?lg wdt:P219 ?lgCode. }
    BIND(IF(?lg = wd:Q20923490, "mul", ?lgCode) AS ?languageCode)
  }
  OPTIONAL { ?item wdt:P11254 ?lgsUrl. }
  OPTIONAL { ?item wdt:P5749 ?asin. }
  OPTIONAL { ?item wdt:P3597 ?fDroid. }
  OPTIONAL { ?item wdt:P3418 ?google. }
  OPTIONAL { ?item wdt:P8940 ?huawei. }
  OPTIONAL { ?item wdt:P3861 ?apple. }
  OPTIONAL { ?item wdt:P5885 ?microsoft. }
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
    FILTER(?telegLgCode = "en")
  }
  OPTIONAL { ?item wdt:P3984 ?subreddit. }
  OPTIONAL { ?item wdt:P1613 ?irc. }
  OPTIONAL { ?item wdt:P13631 ?donation. }
  ?item schema:dateModified ?modified
}
GROUP BY ?item 
         ?itemLabel 
         ?desc
         ?modified
`,
  // Genre
  `
SELECT DISTINCT 
  ?item
  (GROUP_CONCAT(DISTINCT ?instanceOf; SEPARATOR = ";") AS ?types)
  (GROUP_CONCAT(DISTINCT ?topic; SEPARATOR = ";") AS ?topics)
  (GROUP_CONCAT(DISTINCT ?genre; SEPARATOR = ";") AS ?genres)
  (GROUP_CONCAT(DISTINCT ?subject; SEPARATOR = ";") AS ?subjects)
  (GROUP_CONCAT(DISTINCT ?fow; SEPARATOR = ";") AS ?fows)
  (GROUP_CONCAT(DISTINCT ?depict; SEPARATOR = ";") AS ?depicts)
  ?streetImg
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
  UNION { ?item wdt:P2283 wd:Q121563476. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121563476. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
  FILTER NOT EXISTS { ?item wdt:P576 ?abolished. }

  OPTIONAL { 
    ?item wdt:P31/rdfs:label ?instanceOf.
    FILTER((LANG(?instanceOf) = "mul" || LANG(?instanceOf) = "en"))
  }

  OPTIONAL { 
    ?item wdt:P366/rdfs:label ?topic.
    FILTER((LANG(?topic) = "mul" || LANG(?topic) = "en"))
  }

  OPTIONAL { 
    ?item wdt:P136/rdfs:label ?genre.
    FILTER((LANG(?genre) = "mul" || LANG(?genre) = "en"))
  }

  OPTIONAL { 
    ?item wdt:P921/rdfs:label ?subject.
    FILTER((LANG(?subject) = "mul" || LANG(?subject) = "en"))
  }

  OPTIONAL { 
    ?item wdt:P101/rdfs:label ?fow.
    FILTER((LANG(?fow) = "mul" || LANG(?fow) = "en"))
  }

  OPTIONAL { 
    ?item wdt:P180/rdfs:label ?depict.
    FILTER((LANG(?depict) = "mul" || LANG(?depict) = "en"))
  }

  OPTIONAL { 
    ?item p:P3712 ?goalStat. 
    ?goalStat ps:P3712 ?goal. 
    FILTER(?goal = wd:Q275969)
    ?goalStat pq:P12913 wd:Q96470821. 
    BIND("y" AS ?streetImg)
  }
}
GROUP BY ?item 
         ?streetImg
`,
  // Platform
  `
SELECT DISTINCT 
  ?item 
  (GROUP_CONCAT(DISTINCT ?osLabel; SEPARATOR = ";") AS ?os)
  (GROUP_CONCAT(DISTINCT ?platform; SEPARATOR = ";") AS ?platforms)
  (SAMPLE(?asin) AS ?asin) 
  (SAMPLE(?google) AS ?google) 
  (SAMPLE(?huawei) AS ?huawei) 
  (SAMPLE(?fDroid) AS ?fDroid) 
  (SAMPLE(?apple) AS ?apple) 
  (SAMPLE(?microsoft) AS ?microsoft) 
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
  UNION { ?item wdt:P2283 wd:Q121563476. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121563476. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
  FILTER NOT EXISTS { ?item wdt:P576 ?abolished. }

  OPTIONAL { 
    ?item wdt:P306/rdfs:label ?osLabel.
    FILTER((LANG(?osLabel) = "mul" || LANG(?osLabel) = "en"))
  }
  OPTIONAL { 
    ?item wdt:P400/rdfs:label ?platform.
    FILTER((LANG(?platform) = "mul" || LANG(?platform) = "en"))
  }
  OPTIONAL { ?item wdt:P5749 ?asin. }
  OPTIONAL { ?item wdt:P3597 ?fDroid. }
  OPTIONAL { ?item wdt:P3418 ?google. }
  OPTIONAL { ?item wdt:P8940 ?huawei. }
  OPTIONAL { ?item wdt:P3861 ?apple. }
  OPTIONAL { ?item wdt:P5885 ?microsoft. }
}
GROUP BY ?item 
`,
  // Last release
  `
SELECT DISTINCT 
  ?item
  (SAMPLE(?webDef) AS ?webDef)
  (SAMPLE(?web) AS ?web)
  (MAX(?date) AS ?lastRelease)
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
  UNION { ?item wdt:P2283 wd:Q121563476. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121563476. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
  FILTER NOT EXISTS { ?item wdt:P576 ?abolished. }

  OPTIONAL { ?item wdt:P856 ?webDef. }
  OPTIONAL { 
    ?item p:P856 ?webStat. 
    ?webStat ps:P856 ?web.
    ?webStat pq:P407 ?webLg.
    ?webLg wdt:P218 ?webLgCode 
    FILTER(?webLgCode = "en")
  }
      
  ?item p:P348/pq:P577 ?date.
}
GROUP BY ?item
`,
  // License
  `
SELECT DISTINCT 
  ?item
  (SAMPLE(?webDef) AS ?webDef)
  (SAMPLE(?web) AS ?web)
  (GROUP_CONCAT(?licenseShortName; SEPARATOR = ";") AS ?license)
WHERE
{
  {
    SELECT DISTINCT 
      ?item
      (SAMPLE(?licenseShortName) AS ?licenseShortName)
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
      UNION { ?item wdt:P2283 wd:Q121563476. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
      UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121563476. }
      FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
      FILTER NOT EXISTS { ?item wdt:P576 ?abolished. }

      OPTIONAL { ?item wdt:P856 ?webDef. }
      OPTIONAL { 
        ?item p:P856 ?webStat. 
        ?webStat ps:P856 ?web.
        ?webStat pq:P407 ?webLg.
        ?webLg wdt:P218 ?webLgCode 
        FILTER(?webLgCode = "en")
      }
          
      ?item wdt:P275 ?license.
      ?license wdt:P1813 ?licenseShortName.
    }
    GROUP BY ?item 
             ?license
  }
  
  OPTIONAL { FILTER(LANG(?licenseShortName) = "mul" || LANG(?licenseShortName) = "en") }
}
GROUP BY ?item`,
];

function buildTranslationQuery(propId: string, fieldName: string) {
  return `
SELECT DISTINCT ?item ?lg ?${fieldName} 
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
    UNION { ?item wdt:P2283 wd:Q121563476. }
    UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
    UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
    UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
    UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121563476. }
    FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
    FILTER NOT EXISTS { ?item wdt:P576 ?abolished. }

    ?item p:${propId} ?stat.
    ?stat ps:${propId} ?${fieldName}.
    OPTIONAL {
      ?stat pq:P407 ?lgEntity.
      ?lgEntity wdt:P218 ?lg. # ISO 639-1 code
    }

    # Exclude English, Multilanguage and empty language codes
    FILTER(?lg != "en" && ?lg != "mul" && BOUND(?lg))

  }
  ORDER BY ?item ?lg`;
}

export const AppTranslationQueries = [
  `
SELECT DISTINCT 
  ?item ?lg ?itemLabel 
  ?desc 
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
  UNION { ?item wdt:P2283 wd:Q121563476. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125118130. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q125121154. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121746037. }
  UNION { ?item (wdt:P31/(wdt:P279*)) wd:Q121563476. }
  FILTER NOT EXISTS { ?item wdt:P2669 ?discontinued. }
  FILTER NOT EXISTS { ?item wdt:P576 ?abolished. }

  {
    ?item rdfs:label ?itemLabel.
    BIND(LANG(?itemLabel) AS ?lg)
  }
  UNION
  {
    ?item schema:description ?desc.
    BIND(LANG(?desc) AS ?lg)
  }
  UNION
  {
    ?item wdt:P1451 ?motto.
    BIND(LANG(?motto) AS ?lg)
  }
  UNION
  {
    ?item wdt:P1680 ?subtitle. 
    BIND(LANG(?subtitle) AS ?lg)
  }

  OPTIONAL {
    ?item rdfs:label ?itemLabel.
    FILTER(LANG(?itemLabel) = ?lg)
  }

  OPTIONAL {
    ?item schema:description ?desc.
    FILTER(LANG(?desc) = ?lg)
  }

  OPTIONAL {
    ?item wdt:P1451 ?motto.
    FILTER(LANG(?motto) = ?lg)
  }

  OPTIONAL {
    ?item wdt:P1680 ?subtitle. 
    FILTER(LANG(?subtitle) = ?lg)
  }

  ?item schema:dateModified ?modified
  
  # Exclude English, Multilanguage and empty language codes
  FILTER(?lg != "en" && ?lg != "mul" && BOUND(?lg))
}
ORDER BY ?item 
         ?lg
         ?modified
`,
  buildTranslationQuery("P973", "doc"),
  buildTranslationQuery("P10027", "forum"),
  buildTranslationQuery("P11478", "matrix"),
  buildTranslationQuery("P4033", "mastodon"),
  buildTranslationQuery("P11947", "lemmy"),
  buildTranslationQuery("P12361", "bluesky"),
  buildTranslationQuery("P3789", "teleg"),
  buildTranslationQuery("P3984", "subreddit"),
  buildTranslationQuery("P1613", "irc"),
];
