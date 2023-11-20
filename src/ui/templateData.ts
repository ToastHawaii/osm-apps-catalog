import { LocalizedValue } from "./getLocalizedValue";

export let template: {
  params: {
    [param: string]: {
      label?: LocalizedValue;
      type?: string;
      required?: boolean;
      suggested?: boolean;
      description?: LocalizedValue;
      example?: LocalizedValue;
      default?: string;
      suggestedvalues?: string[];
      aliases?: string[];
      deprecated?: boolean;
    };
  };
  paramOrder: string[];
  format?: string;
  description?: string;
} = {
  params: {
    name: {
      label: {
        en: "Name",
        de: "Name",
        "zh-hans": "名称",
      },
      description: {
        en: "Official name, otherwise most common one",
        de: "Offizieller Name, ansonsten der verbreitetste",
      },
      type: "string",
    },
    screenshot: {
      label: {
        de: "Bildschirmfoto",
        en: "Screenshot",
        "zh-hans": "截图",
      },
      type: "wiki-file-name",
    },
    author: {
      label: {
        de: "Autor",
        en: "Author",
        "zh-hans": "作者",
      },
      description: {
        de: "Name des Autors/der Autorin oder ein Link zu dessen/deren OSM-Wiki-Benutzerseite",
        en: "Name of the author or a link to their OSM-wiki user page",
      },
      type: "string",
    },
    license: {
      description: "what free license or proprietary?",
      label: {
        en: "License",
        de: "Lizenz",
      },
    },
    price: {
      description:
        "Costs if proprietary. If price is empty, application is for free.",
      label: {
        en: "Price",
        de: "Preis",
      },
      type: "string",
    },
    platform: {
      description: "list of platforms it runs on",
      type: "string",
      label: {
        en: "Platform",
        de: "Plattform",
      },
    },
    version: {
      label: {
        en: "Version",
        "zh-hans": "版本",
        de: "Version",
      },
      description: "latest version",
      type: "string",
    },
    date: {
      label: {
        en: "Release date",
        "zh-hans": "日期",
      },
      description: "latest release date",
      type: "date",
    },
    languages: {
      description:
        'supported languages (list of valid language codes separated by commas or semicolons, which are then displayed using {{Languagename}}; use "mul" in the list for "multiple languages")',
      type: "string",
      label: {
        en: "Languages",
        de: "Sprachen",
      },
    },
    languagesurl: {
      description:
        "link to the actual full list of languages supported, described on another page (e.g. a portal page for the software, or a repository)",
      type: "url",
    },
    web: {
      description: "Web address",
      type: "url",
    },
    asin: {
      description:
        "Amazon Standard Identification Number for the Amazon Appstore for Android",
      type: "string",
    },
    bbWorldID: {
      description: "BlackBerry World application ID",
      type: "string",
    },
    fDroidID: {
      description: "F-Droid application ID",
      type: "string",
    },
    firefoxMarketplaceID: {
      description: "Mozilla Firefox Marketplace application ID",
      type: "string",
    },
    huaweiAppGalleryID: {
      description: "Huawei AppGallery application ID",
      type: "string",
    },
    googlePlayID: {
      description: "Google Play Store application ID",
      type: "string",
    },
    appleStoreID: {
      description: "iTunes App Store application ID",
      type: "string",
    },
    macAppStoreID: {
      description: "Mac App Store application ID",
      type: "string",
    },
    microsoftAppID: {
      description: "Microsoft Store Windows application UUID",
      type: "string",
    },
    description: {
      label: {
        de: "Beschreibung",
        en: "Description",
        "zh-hans": "描述",
      },
      type: "string",
      description:
        "Brief description. What distinguishes this from other tools? (Write your own description, don't just copy it from the website)",
    },
    framework: {
      description: "list of frameworks used",
      label: {
        en: "Framework",
        de: "Framework",
      },
    },
    status: {
      description: "current status of the project",
      type: "string",
    },
    genre: {
      description: "main category for this tool",
      label: "Genre",
    },
    repo: {
      label: {
        de: "Quellcode",
        en: "Source code",
        "zh-hans": "源代码",
      },
      aliases: ["git", "svn"],
      description:
        "URL to view or download the source code (for example, a Git, Subversion, or CVS repository)",
      type: "url",
    },
    code: {
      description: "List of programming languages used",
      type: "string",

      label: {
        de: "Code",
      },
    },
    mapData: {
      description:
        'Map display: Maps drawn using pre-calculated/rasterized images (raster) or "on the fly" (vector)?',
      type: "string",
    },
    datasource: {
      description:
        "Map display: Can you store all map data offline? Download a separate file?",
      example: "online;cache",
      type: "string",
    },
    rotateMap: {
      description: "Map display: Does it turn the map in driving direction?",
      label: {
        en: "Rotate map",
        de: "Karte drehen",
      },
      type: "string",
    },
    navToPoint: {
      description: "Navigation: Can it guide you to a point somewhere?",
      label: {
        en: "Navigate to point",
        de: "Navigiere zu einem Punkt",
      },
      type: "string",
    },
    turnLanes: {
      description: "Navigation: Does it support lane guidance?",
      type: "string",
    },
    findLocation: {
      description: "Navigation: Can it search for a street/place?",
      label: {
        en: "Find location",
        de: "Finde eine Position",
      },
      type: "string",
    },
    findNearbyPOI: {
      description: "Navigation: Can it discover/display Points of interests?",
      label: {
        en: "Find nearby POIs",
        de: "Finde POI in der Nähe",
      },
      type: "string",
    },
    predefinedRoute: {
      description: "Navigation: Can it follow other GPS tracks?",
      label: {
        en: "Navigate along predefined route",
        de: "Folge einer vordefinierten Route",
      },
      type: "string",
    },
    calculateRoute: {
      description: "Navigation: Can it calculate a route using routing?",
      label: {
        en: "Calculate route",
        de: "Route berechnen",
      },
      type: "string",
    },
    calculateRouteOffline: {
      description: "Navigation: Does it need internet to calculate a route?",
      label: {
        en: "Calculate route without Internet (Offline routing)",
        de: "Route berechnen ohne Internet",
      },
      type: "string",
    },
    profiles: {
      description: "Navigation: What profiles supported if it makes routing?",
      type: "string",
    },
    turnRestrictions: {
      description: "Navigation: Can it deal with turn restrictions",
      label: {
        en: "Turn restrictions",
        de: "Abbiegebeschränkungen",
      },
      type: "string",
    },
    voice: {
      description:
        "Navigation: Can it give you commands with a computer voice?",
      label: {
        en: "Navigation with voice",
        de: "Navigation mit Sprachansage",
      },
      type: "string",
    },
    keepOnRoad: {
      description:
        "Navigation: Can it assist you to keep your vehicle on the calculated route?",
      label: "Keep on road",
      type: "string",
    },
    withoutGPS: {
      description: "Navigation: Does it work even without a GPS?",
      label: {
        en: "Works without GPS",
        de: "Funktioniert ohne GPS",
      },
      type: "string",
    },
    avoidTraffic: {
      description: "Navigation: Does app optimize route to avoid traffic jams?",
      type: "string",
    },
    trafficProvider: {
      description: "Navigation: Traffic data source provider",
    },
    routingProviders: {
      description: "Navigation: What routing service(s) does it use?",
      type: "string",
    },
    customInterval: {
      description: "Track logging: Can you tune the interval manually?",
      label: {
        en: "Customizable log interval",
        de: "Einstellbares Aufzeichnungsintervall",
      },
      type: "string",
    },
    trackFormats: {
      description:
        "Track logging: What formats for storage can you save your GPS track?",
      aliases: ["formats"],
      label: {
        en: "All Formats",
        de: "Alle formate",
      },
      type: "string",
    },
    geotagging: {
      description: "Track logging: Are further Mapping Techniques supported",
      example: "note;photo",
      type: "string",
    },
    fastWayPointAdding: {
      description: "Track logging: Easy to add a new Waypoint?",
      label: {
        en: "Fast POI buttons",
        de: "Knöpfe zum schnellen Setzen von Wegpunkten",
      },
      type: "string",
    },
    uploadGPX: {
      description: "Track logging: Can it send tracks directly to OSM?",
      type: "string",
      label: "Upload GPX to OSM",
    },
    sendPosition: {
      description: "Track monitoring: Can it send position to others?",
      label: {
        en: "Send current position",
        de: "Sende aktuelle Position",
      },
      type: "string",
    },
    showTrack: {
      description: "Track monitoring: Show your current track?",
      label: {
        en: "Show current track",
        de: "Zeige aktuellen Track",
      },
      type: "string",
    },
    showExistingTrack: {
      description:
        "Track monitoring: Can it load existing tracks so you can follow them?",
      label: {
        en: "Open existing track",
        de: "Öffne existierenden Track",
      },
      type: "string",
    },
    showAltitudeDiagram: {
      description: "Track monitoring: ?",
      label: {
        en: "Altitude diagram",
        de: "Höhendiagramm",
      },
      type: "string",
    },
    showDOP: {
      description: "Track monitoring: Shows signal quality?",
      label: {
        en: "Show POD value",
        de: "Zeige DOP-Wert",
      },
      type: "string",
    },
    showSatellites: {
      description: "Track monitoring: Displays satellites?",
      label: {
        en: "Satellite view",
        de: "Zeige Satelliten",
      },
      type: "string",
    },
    showNMEAlive: {
      description: "Track monitoring: Can you see the raw GPS stream?",
      label: {
        en: "Show live NMEA data",
        de: "Zeige NMEA-Livedaten",
      },
      type: "string",
    },
    accessibility: {
      description: "Accessibility: Does it help disabled people in some kind?",
      label: "Targeted at ...",
      type: "string",
    },
    textOnlyUI: {
      description: "Accessibility: Text so braille compatible interface?",
      label: {
        en: "Complete non graphics text output",
        de: "Komplett ohne Grafik bedienbar",
      },
      type: "string",
    },
    brailleUI: {
      description: "Accessibility: A special braille interface?",
      label: {
        en: "Braille interface",
        de: "Braille-Oberfläche",
      },
      type: "string",
    },
    explorerMode: {
      description:
        "Accessibility: Has a exploration modus (tell all objects approaching)?",
      label: {
        en: "Exploration modus (tell all objects approaching)",
        de: "Erkundungsmodus",
      },
      type: "string",
    },
    publicTransportMode: {
      description: "Accessibility: Supports routing with public transport?",
      label: {
        en: "Public Transport mode",
        de: "ÖPNV-Modus",
      },
      type: "string",
    },
    dangerWarnings: {
      description: "Accessibility: ?",
      label: {
        en: "Danger Warnings",
        de: "Gefahrenwarnungen",
      },
      type: "string",
    },
    screenReader: {
      description: "Accessibility: List of supported Screenreaders",
      example: "NVDA",
      label: {
        en: "Screenreader",
        de: "Screenreader",
      },
    },
    screenReaderLang: {
      description: "Accessibility: And their languages",
      example: "EN;DE",
      label: {
        en: "Screenreader languages",
        de: "Screenreader-Sprachen",
      },
    },
    addPOI: {
      description: "Editor: Can you add a node?",
      label: {
        en: "Add POIs",
        de: "POI hinzufügen",
      },
      type: "string",
    },
    addWay: {
      description: "Editor: Can you add a way?",
      type: "string",
    },
    editSource: {
      description: "Editor: Can you work offline?",
      example: "online;cache",
      type: "string",
    },
    editPOI: {
      description: "Editor: Can you edit a node?",
      label: {
        en: "Edit / Delete POIs",
        de: "POI bearbeiten/löschen",
      },
      type: "string",
    },
    editTags: {
      description: "Editor: Can you edit existing tags?",
      label: {
        en: "Edit arbitrary tags of existing OSM objects",
        de: "Beliebige Tags an vorhandenen OSM-Objekten bearbeiten",
      },
      type: "string",
    },
    editGeom: {
      description: "Editor: Can you edit nodes/ways?",
      label: {
        en: "Edit geometries",
        de: "Geometrie bearbeiten",
      },
      type: "string",
    },
    editRelations: {
      description: "Editor: Can you edit relations?",
      type: "string",
    },
    createNotes: {
      description: "Editor: Can you create OSM Notes?",
      type: "string",
    },
    viewNotes: {
      description: "Editor: Can you view OSM Notes?",
      type: "string",
    },
    editNotes: {
      description: "Editor: Can you comment/close OSM Notes?",
      type: "string",
    },
    offsetDBsupport: {
      description: "Editor: Does it support the imagery offset DB?",
      label: {
        en: "Support imagery offset DB",
        de: "Unterstützt Luftbildversatz DB",
      },
      type: "string",
    },
    uploadOSMData: {
      description: "Editor: Can you send changes to OSM directly?",
      label: {
        en: "Upload to OSM",
        de: "Zu OSM hochladen",
      },
      type: "string",
    },
    rendererOutputFormats: {
      description: "Renderer: supported output formats",
    },
    showSpeed: {
      description: "Analysis: ?",
      type: "string",
    },
    showPhoneNumber: {
      description: "POI Information: Shows phone number",
      type: "string",
    },
    showOpeningHours: {
      description: "POI Information: Shows hours of operation",
      type: "string",
    },
    showWebsite: {
      description: "POI Information: Shows link to the website",
      type: "string",
    },
    map: {
      description: "Features: Can it show a map?",
      label: {
        en: "Display map",
        de: "Karte anzeigen",
      },
      type: "string",
    },
    tracking: {
      description: "Features: Can it record a GPS track?",
      type: "string",
      label: {
        en: "Make track",
        de: "Track aufzeichnen",
      },
    },
    monitoring: {
      description: "Features: Can you monitor GPS datas?",
      label: {
        en: "Monitor",
        de: "Monitoring",
      },
      type: "string",
    },
    navigating: {
      description: "Features: Can you navigate in a compass like way?",
      label: {
        en: "Navigate",
        de: "Navigieren",
      },
      type: "string",
    },
    routing: {
      description: "Features: Can you route along a road network?",
      label: "Routing",
      type: "string",
    },
    createRouteViaWaypoints: {
      type: "string",
    },
    createRouteManually: {
      label: {
        en: "Create route manually",
        de: "Route von Hand eingeben",
      },
      type: "string",
    },
    "3D": {
      description: "Map display: Is there some 3D or 2.5D view?",
      type: "string",
      label: {
        en: "3D view",
        de: "3D-Ansicht",
      },
    },
    logo: {
      type: "wiki-file-name",
    },
  },
  paramOrder: [
    "name",
    "status",
    "license",
    "price",
    "web",
    "repo",
    "description",
    "author",
    "platform",
    "code",
    "framework",
    "languages",
    "languagesurl",
    "genre",
    "version",
    "date",
    "logo",
    "screenshot",
    "asin",
    "bbWorldID",
    "googlePlayID",
    "fDroidID",
    "firefoxMarketplaceID",
    "huaweiAppGalleryID",
    "appleStoreID",
    "macAppStoreID",
    "microsoftAppID",
    "map",
    "navigating",
    "tracking",
    "monitoring",
    "routing",
    "mapData",
    "datasource",
    "rotateMap",
    "3D",
    "turnLanes",
    "navToPoint",
    "findLocation",
    "findNearbyPOI",
    "predefinedRoute",
    "createRouteManually",
    "createRouteViaWaypoints",
    "calculateRoute",
    "calculateRouteOffline",
    "profiles",
    "turnRestrictions",
    "voice",
    "keepOnRoad",
    "withoutGPS",
    "routingProviders",
    "avoidTraffic",
    "trafficProvider",
    "customInterval",
    "trackFormats",
    "geotagging",
    "fastWayPointAdding",
    "uploadGPX",
    "showTrack",
    "showExistingTrack",
    "showAltitudeDiagram",
    "showDOP",
    "showSatellites",
    "showNMEAlive",
    "sendPosition",
    "accessibility",
    "textOnlyUI",
    "brailleUI",
    "explorerMode",
    "dangerWarnings",
    "publicTransportMode",
    "screenReader",
    "screenReaderLang",
    "addPOI",
    "addWay",
    "editSource",
    "editPOI",
    "editTags",
    "editGeom",
    "editRelations",
    "createNotes",
    "viewNotes",
    "editNotes",
    "offsetDBsupport",
    "uploadOSMData",
    "rendererOutputFormats",
    "showSpeed",
    "showWebsite",
    "showPhoneNumber",
    "showOpeningHours",
  ],
};
