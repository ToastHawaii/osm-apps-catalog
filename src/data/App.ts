export type Source = {
  name: string;
  wiki?: string;
  url: string;
  lastChange: string;
  firstCrawled: string;
};

export type App = {
  id: number;
  name: string;
  unmaintained?: boolean;
  lastRelease?: string;
  description: string;
  images: string[];
  imageWiki?: string;
  website?: string | undefined;
  documentation?: string;
  source: Source[];
  author?: string;
  // free of charge software
  gratis?: boolean;
  // FLOSS license
  libre?: boolean;
  price?: string;
  license?: string[];
  sourceCode?: string | undefined;
  languages: string[];
  languagesUrl?: string | undefined;
  genre: string[];
  topics: string[];
  platform: string[];
  coverage: string[];
  install: {
    asin?: string;
    fDroidID?: string;
    obtainiumLink?: string;
    googlePlayID?: string;
    huaweiAppGalleryID?: string;
    appleStoreID?: string;
    macAppStoreID?: string;
    microsoftAppID?: string;
  };
  map?: {
    map: string[];
    mapData: string[];
    datasource: string[];
    rotateMap: string[];
    "3D": string[];
    showWebsite: string[];
    showPhoneNumber: string[];
    showOpeningHours: string[];
  };
  routing?: {
    routing: string[];
    createRouteManually: string[];
    calculateRoute: string[];
    createRouteViaWaypoints: string[];
    profiles: string[];
    turnRestrictions: string[];
    calculateRouteOffline: string[];
    routingProviders: string[];
    avoidTraffic: string[];
    trafficProvider: string[];
  };
  navigating?: {
    navigating: string[];
    findLocation: string[];
    findNearbyPOI: string[];
    navToPoint: string[];
    voice: string[];
    keepOnRoad: string[];
    turnLanes: string[];
    withoutGPS: string[];
    predefinedRoute: string[];
  };
  tracking?: {
    tracking: string[];
    customInterval: string[];
    trackFormats: string[];
    geotagging: string[];
    fastWayPointAdding: string[];
    uploadGPX: string[];
  };
  monitoring?: {
    monitoring: string[];
    showTrack: string[];
    showExistingTrack: string[];
    showAltitudeDiagram: string[];
    showDOP: string[];
    showSatellites: string[];
    showNMEAlive: string[];
    showSpeed: string[];
    sendPosition: string[];
  };
  editing?: {
    addPOI: string[];
    editPOI: string[];
    addWay: string[];
    editGeom: string[];
    editTags: string[];
    editRelations: string[];
    viewNotes: string[];
    createNotes: string[];
    editNotes: string[];
    editSource: string[];
    offsetDBsupport: string[];
    uploadOSMData: string[];
  };
  rendering?: { rendererOutputFormats: string[] };
  accessibility?: {
    accessibility: string[];
    textOnlyUI: string[];
    brailleUI: string[];
    explorerMode: string[];
    publicTransportMode: string[];
    dangerWarnings: string[];
    screenReader: string[];
    screenReaderLang: string[];
  };
  hasGoal?: {
    crowdsourcingStreetLevelImagery?: boolean;
  };
  community: {
    forum?: string;
    forumTag?: string;
    irc?: { server?: string; channel: string };
    matrix?: string;
    mastodon?: string;
    bluesky?: string;
    issueTracker?: string;
    githubDiscussions?: string;
    telegram?: string;
    slack?: string;
    reddit?: string;
  };
  score: number;
  cache: {
    score?: {
      total: number;
      details: {
        translationKey: string;
        points: number;
        fulfilled: boolean;
      }[];
    };
    filter?: string;
    topics: string[];
    platform: string[];
    languages: string[];
    coverage: string[];
  };
};
