export const type = {
  artwork: { name: "Artwork", description: "" },
  fountain: { name: "Fountain", description: "" },
  "tourist-attraction": { name: "Tourist attraction", description: "" },
  "archaeological-site": { name: "Archaeological site", description: "" },
  trail: { name: "Educational trail", description: "" },
  "battery-recycling": {
    name: "Battery",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "oil-recycling": {
    name: "Oil",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "reusable-bottle-reuse": {
    name: "Reusable bottle",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "rubble-recycling": {
    name: "Building rubble",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "plastic-recycling": {
    name: "Plastic",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "hazardous-recycling": {
    name: "Hazardous waste",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "book-exchange": {
    name: "Book exchange",
    description: "",
    externalResources: [
      {
        name: "Bôite À Lire",
        url: "https://www.boite-a-lire.com/"
      },
      {
        name: "OpenBookCase",
        url: "https://openbookcase.org/map"
      },
      {
        name: "Karte öffentlicher Bücherschränke",
        url: "https://www.lesestunden.de/karte-oeffentlicher-buecherschraenke/"
      },
      {
        name: "Little Free Library World Map",
        url: "https://littlefreelibrary.org/ourmap/"
      },
      {
        name: "Liste öffentlicher Bücherschränke",
        url:
          "https://de.wikipedia.org/wiki/Liste_%C3%B6ffentlicher_B%C3%BCcherschr%C3%A4nke",
        bounds: [35.81, -10.15, 55.25, 24.22]
      },
      {
        name: "Tauschgnom",
        url: "https://www.tauschgnom.de/offene-buecherschraenke",
        bounds: [45.54, 5.32, 57.91, 17.45]
      },
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      },
      {
        name: "Zero Waste Map",
        url: "https://zerowastemap.org/"
      }
    ]
  },
  kneipp_water_cure: { name: "Kneipp facility", description: "" },
  castle: { name: "Castle", description: "" },
  mill: { name: "Mill", description: "" },
  history: { name: "History", description: "" },
  memorial: { name: "Memorial", description: "" },
  monument: { name: "Monument", description: "" },
  museum: { name: "Museum", description: "" },
  observatory: { name: "Observatory", description: "" },
  ruins: { name: "Ruins", description: "" },
  cave: { name: "Cave", description: "" },
  natural_monument: { name: "Natural monument", description: "" },
  pond: { name: "Pond", description: "" },
  rock: { name: "Rock", description: "" },
  viewpoint: { name: "Viewpoint", description: "" },
  waterfall: { name: "Waterfall", description: "" },
  assistance: {
    name: "Assistance",
    description: "",
    externalResources: [
      {
        name: "Nachbarschaftshilfe",
        url: "https://www.nachbarschaftshilfe.ch/standorte",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "assisted-repair": {
    name: "Assisted repair",
    description:
      "Here you can repair broken things together with professionals. You'll meet new people and usually you'll also get coffee and cake. Well-known events are repair cafés.",
    externalResources: [
      {
        name: "Repair Café Worldwide",
        url: "https://repaircafe.org/en/visit/"
      },
      {
        name: "Repair Café Switzerland",
        url: "https://repair-cafe.ch/de/events",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Reparatur-Initiativen",
        url: "https://www.reparatur-initiativen.de/orte",
        bounds: [45.82, 5.8, 55.26, 17.31]
      },
      {
        name: "Zero Waste Map",
        url: "https://zerowastemap.org/"
      },
      {
        name: "iFixit",
        url: "https://www.ifixit.com/Guide"
      }
    ]
  },
  barbecue: {
    name: "Barbecue",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "baking-oven": { name: "Baking oven", description: "" },
  "bicycle-rental": {
    name: "Bicycle rental",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "bicycle-self-repair": {
    name: "Bicycle self repair",
    description: "",
    externalResources: [
      {
        name: "Bikekitchen",
        url: "http://www.heureux-cyclage.org/les-ateliers-dans-le-monde?lang=en"
      },
      {
        name: "Fahrradselbsthilfewerkstätten in Berlin",
        url:
          "https://fahrrad.fandom.com/de/wiki/Fahrradselbsthilfewerkst%C3%A4tten_in_Berlin",
        bounds: [52.33826, 13.08835, 52.67551, 13.76116]
      },
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "charging-station": {
    name: "Charging station",
    description: "",
    externalResources: [
      {
        name: "Open Charge Map",
        url: "https://map.openchargemap.io/"
      }
    ]
  },
  piano: { name: "Piano", description: "" },
  advertising: {
    name: "Advertising space",
    description: "Here you can hang up posters to advertise your concern."
  },
  "community-centre": { name: "Community centre", description: "" },
  "community-garden": {
    name: "Community garden",
    description:
      "Here is a garden which you can cultivate together with others. You can plant, water and harvest vegetables, herbs, flowers and so on and watch them grow."
  },
  "diaper-changing-table": { name: "Diaper-changing table", description: "" },
  "drinking-water": { name: "Drinking water", description: "" },
  "defibrillator": { name: "Defibrillator", description: "" },
  "food-sharing": {
    name: "Food sharing",
    description:
      "At this place you can bring and take food. The conditions for bring and take food are very different, you can inform yourself about it on the website of the operator or on site.",
    externalResources: [
      {
        name: "Foodsharing",
        url: "https://foodsharing.de/karte",
        bounds: [44.57, 2.63, 55.26, 19.55]
      },
      {
        name: "RestEssBar",
        url: "http://restessbar.ch/de",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Madame Frigos",
        url: "https://www.madamefrigo.ch/en/towns/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "foodwaste.ch",
        url: "https://foodwaste.ch/lokale-initiativen/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Suspended Coffee",
        url: "https://suspendedcoffees.com/cafes/"
      },
      {
        name: "Suspended Coffee Germany",
        url: "https://suspendedcoffee.de/shops/karte/",
        bounds: [44.57, 2.63, 55.26, 19.55]
      },
      {
        name: "Café Surprise",
        url: "https://surprise.ngo/angebote/cafesurprise/ueber-cafe-surprise/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "mundraub",
        url: "https://mundraub.org/map#z={zoom}&lat={lat}&lng={lng}"
      },
      {
        name: "falling fruit",
        url: "http://fallingfruit.org/?z={zoom}&y={lat}&x={lng}&t=OSM&locale=en"
      },
      {
        name: "Zero Waste Map",
        url: "https://zerowastemap.org/"
      }
    ]
  },
  "goods-exchange": {
    name: "Goods exchange",
    description:
      "Here you will find a table, a shelf or a shop to bring and take items. Well-known facilities are give-away shops and giveboxes.",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      },
      {
        name: "PING!-Station",
        url: "https://pingstation.de/finden/",
        bounds: [45.71, 5.44, 55.26, 15.29]
      },
      {
        name: "umap - Give box",
        url:
          "https://umap.openstreetmap.fr/en/map/give_box_406244#{zoom}/{lat}/{lng}"
      },
      {
        name: "radar.squat.net",
        url: "https://radar.squat.net/en/groups/category/free-shop-market"
      },
      {
        name: "Alles Und Umsonst",
        url: "https://alles-und-umsonst.de/umsonstladen",
        bounds: [35.4, -10.2, 55.5, 19.1]
      },
      {
        name: "Zero Waste Map",
        url: "https://zerowastemap.org/"
      }
    ]
  },
  hackerspace: {
    name: "Hackerspace",
    description: "",
    externalResources: [
      {
        name: "Verbund Offener Werkstätten",
        url: "https://www.offene-werkstaetten.org/werkstatt-suche",
        bounds: [35.99, 5.06, 55.5, 24.66]
      },
      {
        name: "hackerspaces",
        url: "https://wiki.hackerspaces.org/List_of_hackerspaces"
      }
    ]
  },
  coworking: { name: "Coworking", description: "" },
  contribute: { name: "Contribute", description: "" },
  map: { name: "Map", description: "" },
  openstreetmap: { name: "OpenStreetMap", description: "" },
  internet: {
    name: "Internet",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "public-shower": { name: "Public shower", description: "" },
  pump: {
    name: "Pump",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  toilet: { name: "Public toilet", description: "" },
  basketball: { name: "Basketball", description: "" },
  bath: { name: "Bath", description: "" },
  bikepark: { name: "Bikepark", description: "" },
  skatepark: { name: "Skatepark", description: "" },
  chess: { name: "Street chess", description: "" },
  climbing: {
    name: "Climbing",
    description: "",
    externalResources: [
      {
        name: "the crag",
        url:
          "https://www.thecrag.com/climbing/world/maps#{lat},{lng},{zoom},,auto"
      }
    ]
  },
  fitness: {
    name: "Fitness",
    description: "",
    externalResources: [
      {
        name: "Street Workout",
        url: "https://www.street-workout.com/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Playparc",
        url: "https://www.playparc.de/marken/4fcircle/",
        bounds: [35.13, 2.16, 62.53, 32.75]
      }
    ]
  },
  horizontal_bar: {
    name: "Horizontal bar",
    description: ""
  },
  parallel_bars: {
    name: "Parallel bars",
    description: ""
  },
  rings: {
    name: "Rings",
    description: ""
  },
  "exercise-machine": {
    name: "Exercise machine",
    description: ""
  },
  balance: {
    name: "Balance",
    description: ""
  },
  "fitness-trail": {
    name: "Fitness trail",
    description: "",
    externalResources: [
      {
        name: "Zurich vitaparcours",
        url: "https://www.zurichvitaparcours.ch/de/Finder",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Trimm-Dich-Pfade",
        url:
          "https://www.trimm-dich-pfad.com/standorte/trimm-dich-pfad-in-meiner-naehe#{lat}/{lng}/{zoom}",
        bounds: [45.11, 2.16, 55.2, 24.4]
      }
    ]
  },
  sledding: { name: "Sledding", description: "" },
  running: { name: "Running", description: "" },
  soccer: { name: "Soccer", description: "" },
  "table-tennis": { name: "Table tennis", description: "" },
  "table-soccer": { name: "Table soccer", description: "" },
  boules: { name: "Boules", description: "" },
  volleyball: { name: "Volleyball", description: "" },
  animal: {
    name: "Animal enclosure",
    description: "",
    externalResources: [
      {
        name: "Zoo-Infos.org - Switzerland",
        url: "http://ch.zoo-infos.org/set.html?karte.php",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Zoo-Infos.de - Germany",
        url: "http://www.zoo-infos.de/set-en.html?karte-en.php",
        bounds: [47.27, 5.87, 55.1, 15.04]
      },
      {
        name: "Zoo-Infos.org - Austria",
        url: "http://at.zoo-infos.org/set-en.html?karte-en.php",
        bounds: [46.3723, 9.5307, 49.0205, 17.1608]
      },
      {
        name: "Zoo-Infos.org - France",
        url: "http://fr.zoo-infos.org/set.html?karte.php",
        bounds: [42.13, -5.02, 51.27, 8.43]
      },
      {
        name: "Arca-Net",
        url: "http://arca-net.info/map_categories/frame_map.asp?sprache=en",
        bounds: [-32.0, -0.3, 52.3, 68.9]
      }
    ]
  },
  observation: { name: "Animal observation", description: "" },
  maze: { name: "Maze", description: "" },
  webcam: {
    name: "Webcam",
    description: "",
    externalResources: [
      {
        name: "roundshot",
        url:
          "https://www.roundshot.com/xml_1/internet/en/application/d170/f172.cfm"
      },
      {
        name: "Windy",
        url: "https://www.windy.com/en/-Webcams/webcams?{lat},{lng},{zoom}"
      },
      {
        name: "Skyline Webcams",
        url: "https://www.skylinewebcams.com/en/webcam.html"
      },
      {
        name: "Wetter.com",
        url: "https://www.wetter.com/hd-live-webcams/"
      }
    ]
  },
  fireplace: { name: "Fireplace", description: "" },
  garden: {
    name: "Garden",
    description: "",
    externalResources: [
      {
        name: "Arca-Net",
        url: "http://arca-net.info/map_categories/frame_map.asp?sprache=en",
        bounds: [-32.0, -0.3, 52.3, 68.9]
      }
    ]
  },
  "garden-with-name": {
    name: "Garden (With name)",
    description: "",
    externalResources: [
      {
        name: "Arca-Net",
        url: "http://arca-net.info/map_categories/frame_map.asp?sprache=en",
        bounds: [-32.0, -0.3, 52.3, 68.9]
      }
    ]
  },
  "nature-park": { name: "Nature park", description: "" },
  park: { name: "Park", description: "" },
  "park-with-name": { name: "Park (With name)", description: "" },
  "picnic-site": { name: "Picnic site", description: "" },
  square: { name: "Square", description: "" },
  "square-with-name": { name: "Square (With name)", description: "" },
  playground: { name: "Playground", description: "" },
  lounger: { name: "Lounger", description: "" },
  clothes: {
    name: "Clothes",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "clothes-give": { name: "Clothes (Give)", description: "" },
  "clothes-take": { name: "Clothes (Take)", description: "" },
  "clothes-repair": { name: "Clothes (Repair)", description: "" },
  "mobile-phones": {
    name: "Phone",
    description: "",
    externalResources: [
      {
        name: "Swisscom Mobile Aid",
        url:
          "https://www.swisscom.ch/de/about/unternehmen/nachhaltigkeit/mobile-aid.html",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Labdoo",
        url: "https://www.labdoo.org/content/dootronics-dashboard"
      }
    ]
  },
  "mobile-phones-give": { name: "Phone (Give)", description: "" },
  "mobile-phones-take": { name: "Phone (Take)", description: "" },
  "mobile-phones-repair": { name: "Phone (Repair)", description: "" },
  computers: {
    name: "Computer",
    description: "",
    externalResources: [
      {
        name: "Labdoo",
        url: "https://www.labdoo.org/content/dootronics-dashboard"
      }
    ]
  },
  "computers-give": { name: "Computer (Give)", description: "" },
  "computers-take": { name: "Computer (Take)", description: "" },
  "computers-repair": { name: "Computer (Repair)", description: "" },
  toys: {
    name: "Toy",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "toys-give": { name: "Toy (Give)", description: "" },
  "toys-take": { name: "Toy (Take)", description: "" },
  "toys-rent": { name: "Toy (Rent)", description: "" },
  "toys-repair": { name: "Toy (Repair)", description: "" },
  electronics: {
    name: "Electronic",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "electronics-give": { name: "Electronic (Give)", description: "" },
  "electronics-take": { name: "Electronic (Take)", description: "" },
  "electronics-repair": { name: "Electronic (Repair)", description: "" },
  furniture: {
    name: "Furniture",
    description: "",
    externalResources: [
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "furniture-give": { name: "Furniture (Give)", description: "" },
  "furniture-take": { name: "Furniture (Take)", description: "" },
  "furniture-repair": { name: "Furniture (Repair)", description: "" },
  bicycle: {
    name: "Bicycle",
    description: "",
    externalResources: [
      {
        name: "Velafrica",
        url: "http://velafrica.ch/en/Play-your-part/donate-bicycles",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Bikekitchen",
        url: "http://www.heureux-cyclage.org/les-ateliers-dans-le-monde?lang=en"
      },
      {
        name: "Fahrradselbsthilfewerkstätten in Berlin",
        url:
          "https://fahrrad.fandom.com/de/wiki/Fahrradselbsthilfewerkst%C3%A4tten_in_Berlin",
        bounds: [52.33826, 13.08835, 52.67551, 13.76116]
      },
      {
        name: "Pumpipumpe",
        url: "https://map.pumpipumpe.ch/"
      }
    ]
  },
  "bicycle-give": { name: "Bicycle (Give)", description: "" },
  "bicycle-rent": { name: "Bicycle (Rent)", description: "" },
  "bicycle-repair": { name: "Bicycle (Repair)", description: "" },
  "bicycle-pump": { name: "Bicycle (Pump)", description: "" },
  "bicycle-park": { name: "Bicycle (Park)", description: "" },
  "bicycle-charge": { name: "Bicycle (Charge)", description: "" }
};
