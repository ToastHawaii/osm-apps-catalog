function nwFee(tag: string) {
  return `nw${tag}["fee"];
nw${tag}["fee:conditional"];`;
}

function nwrFee(tag: string) {
  return `nwr${tag}["fee"];
nwr${tag}["fee:conditional"];`;
}

function recycling(...items: string[]) {
  return `nw["recycling_type"!="center"][~"^recycling:${items.join(
    "|"
  )}$"~"^yes$"];
  nw["recycling_type"="center"]["fee"][~"^recycling:${items.join(
    "|"
  )}$"~"^yes$"];`;
}

function assistedRepair(...items: string[]) {
  return `nw["repair"="assisted_self_service"][~"^(service:){0,1}(${items.join(
    "|"
  )}):repair$"~"^yes$"];`;
}

export const filters: {
  id: number;
  group: string;
  subgroup?: string;
  order?: number;
  value: string;
  icon: string;
  button?: string;
  query: string;
  color: string;
  edit: string[];
  tags: string[];
}[] = [
  {
    id: 0,
    group: "culture",
    value: "artwork",
    icon: "https://wiki.openstreetmap.org/w/images/1/12/Artwork-14.svg",
    query: `
    // Kunst im öffentlichen Raum
    nwr["tourism"="artwork"];`,
    color: "#F4A460",
    tags: ["tourism=artwork"],
    edit: ["tourism=artwork"]
  },
  {
    id: 1,
    group: "culture",
    value: "fountain",
    icon: "https://wiki.openstreetmap.org/w/images/a/a1/Fountain-14.svg",
    query: `
    nwr["amenity"="fountain"];
    nwr["playground"="splash_pad"];`,
    color: "#00FFFF",
    tags: ["amenity=fountain", "playground=splash_pad"],
    edit: ["amenity=fountain", "playground"]
  },
  {
    id: 2,
    group: "culture",
    value: "tourist-attraction",
    icon: "/lib/maki-icons/attraction-15.svg",
    query: `
    nwr["tourism"="attraction"]["attraction"!="animal"]["attraction"!="maze"];

    nwr["tourism"="yes"];

    nwr["heritage"];`,
    color: "#FFD700",
    tags: ["tourism=attraction", "tourism=*", "heritage=*"],
    edit: [
      "tourism=attraction",
      "tourism",
      "building",
      "leisure=park",
      "leisure=garden",
      "man_made"
    ]
  },
  {
    id: 3,
    group: "culture",
    value: "archaeological-site",
    icon:
      "https://wiki.openstreetmap.org/w/images/7/7d/Archaeological-site-16.svg",
    query: `
    nwr["historic"="archaeological_site"];
    nwr["geological"="palaeontological_site"];`,
    color: "#F4A460",
    tags: ["historic=archaeological_site", "geological=palaeontological_site"],
    edit: ["historic=archaeological_site"]
  },
  {
    id: 4,
    group: "education",
    value: "trail",
    icon: "https://wiki.openstreetmap.org/w/images/7/77/Board-14.svg",
    query: `
    nw["information"="board"]["board_type"~"wildlife|plants|geology|nature|planet_walk|astronomy|forestry|botany|biology|birds|tree|panorama|agriculture|science|technology"];
    nw["information"="nature"];
    nw["information"="wild_life"];
    nw["information"="wildlife"];
    relation["type"="route"]["educational"="yes"];
    relation["route"="educational_trail"];`,
    color: "#222222",
    tags: [
      "educational=yes",
      "route=educational_trail",
      "board_type=wildlife",
      "board_type=plants",
      "board_type=geology",
      "board_type=nature",
      "board_type=planet_walk",
      "board_type=astronomy",
      "board_type=forestry",
      "board_type=botany",
      "board_type=biology",
      "board_type=birds",
      "board_type=tree",
      "board_type=panorama",
      "board_type=science",
      "board_type=technology"
    ],
    edit: ["tourism=information", "type=route"]
  },
  {
    id: 5,
    group: "education",
    value: "book-exchange",
    icon: "https://wiki.openstreetmap.org/w/images/b/b2/Public_bookcase-14.svg",
    query: `
// Public bookcases
nw["amenity"="public_bookcase"];

// Library free of charge
${nwFee(`["amenity"="library"]`)}`,
    color: "#A0522D",
    tags: ["amenity=public_bookcase", "amenity=library"],
    edit: ["amenity=public_bookcase", "amenity=library"]
  },
  {
    id: 6,
    group: "education",
    value: "internet",
    icon: "https://wiki.openstreetmap.org/w/images/8/89/Internet_cafe-14.svg",
    query: `
nwr["internet_access"]["internet_access"!="no"]["internet_access:fee"!~"^(customers|yes)$"];

nwr["wifi"]["wifi"!="no"];`,
    color: "#FF1493",
    tags: ["internet_access=*", "wifi=*"],
    edit: ["amenity", "shop"]
  },
  {
    id: 11,
    group: "culture",
    value: "castle",
    icon: "https://wiki.openstreetmap.org/w/images/3/31/Fortress-14.svg",
    query: `
    nwr["historic"="castle"][!"ruins"];
    nwr["historic"="castle"]["ruins"="no"];

    nwr["historic"="tower"][!"ruins"];
    nwr["historic"="tower"]["ruins"="no"];

    nwr["historic"="fort"][!"ruins"];
    nwr["historic"="fort"]["ruins"="no"];`,
    color: "#808080",
    tags: ["historic=castle", "historic=tower", "historic=fort"],
    edit: ["historic=castle", "historic=fort", "historic"]
  },
  {
    id: 12,
    group: "culture",
    value: "mill",
    icon: "https://wiki.openstreetmap.org/w/images/0/0b/Windmill-16.svg",
    query: `
    nwr["man_made"="watermill"][!"ruins"];
    nwr["man_made"="watermill"]["ruins"="no"];

    nwr["man_made"="windmill"][!"ruins"];
    nwr["man_made"="windmill"]["ruins"="no"];`,
    color: "#e63d00",
    tags: ["man_made=watermill", "man_made=windmill"],
    edit: ["man_made=watermill", "man_made=windmill"]
  },
  {
    id: 13,
    group: "culture",
    value: "history",
    icon: "https://wiki.openstreetmap.org/w/images/c/c8/Acheological.png",
    query: `
    nwr["historic"!~"^(castle|tower|fort|ruins|memorial|monument|archaeological_site)$"]["building"!="bunker"]["military"!="bunker"];

    nw["board_type"="history"];
    nw["information"="history"];`,
    color: "#e0e094",
    tags: ["historic=*", "board_type=history"],
    edit: ["historic", "tourism=information"]
  },
  {
    id: 14,
    group: "culture",
    value: "memorial",
    icon: "https://wiki.openstreetmap.org/w/images/6/6e/Memorial-16.svg",
    query: `
    nwr["historic"="memorial"];`,
    color: "#B8860B",
    tags: ["historic=memorial"],
    edit: ["historic=memorial"]
  },
  {
    id: 15,
    group: "culture",
    value: "monument",
    icon: "https://wiki.openstreetmap.org/w/images/9/94/Monument-16.svg",
    query: `
    // Historic Monument
    nwr["historic"="monument"];`,
    color: "#DAA520",
    tags: ["historic=monument"],
    edit: ["historic=monument"]
  },
  {
    id: 16,
    group: "education",
    value: "museum",
    icon: "https://wiki.openstreetmap.org/w/images/a/a9/Museum-16.svg",
    query: `
    ${nwrFee(`["tourism"="museum"]`)}
    ${nwFee(`["tourism"="gallery"]`)}
    ${nwFee(`["amenity"="arts_centre"]`)}`,
    color: "#DCDCDC",
    tags: ["tourism=museum", "tourism=gallery", "amenity=arts_centre"],
    edit: ["tourism=museum", "tourism=gallery", "amenity=arts_centre"]
  },
  {
    id: 17,
    group: "education",
    value: "observatory",
    icon: "https://wiki.openstreetmap.org/w/images/e/e0/Telescope_dome-14.svg",
    query: `
    ${nwrFee(`["man_made"="observatory"]`)}

    ${nwrFee(`["amenity"="observatory"]`)}

    ${nwrFee(`["landuse"="observatory"]`)}`,
    color: "#00008B",
    tags: ["man_made=observatory"],
    edit: ["man_made=observatory", "landuse"]
  },
  {
    id: 18,
    group: "culture",
    value: "ruins",
    icon:
      "https://wiki.openstreetmap.org/w/images/7/78/Building_ruins_generic.svg",
    query: `
    nwr["historic"="ruins"];

    nwr["ruins"]["ruins"!="no"];

    nwr["building"="ruins"];`,
    color: "#A9A9A9",
    tags: ["historic=ruins", "building=ruins", "ruins=*"],
    edit: ["historic=ruins", "building=ruins", "historic", "building"]
  },
  {
    id: 19,
    group: "natural",
    value: "cave",
    icon: "https://wiki.openstreetmap.org/w/images/b/b1/Cave.14.svg",
    query: `
    nw["natural"="cave_entrance"];`,
    color: "#2F4F4F",
    tags: ["natural=cave_entrance"],
    edit: ["natural=cave_entrance"]
  },
  {
    id: 20,
    group: "natural",
    value: "natural_monument",
    icon: "/lib/maki-icons/park-15.svg",
    query: `
    nw["denotation"~"^(natural_monument|landmark|religious|memorial)$"]

    node["natural"="tree"][religion];
    way["natural"="tree_row"][religion];

    node["natural"="tree"]["historic"];
    way["natural"="tree_row"]["historic"];`,
    color: "#228B22",
    tags: ["denotation=natural_monument", "denotation=landmark"],
    edit: ["natural=tree", "natural=tree_row", "natural"]
  },
  {
    id: 21,
    group: "natural",
    value: "pond",
    icon: "/lib/maki-icons/water-15.svg",
    query: `
    nwr["natural"="water"]["water"~"^(pond|lake|reservoir|reflecting_pool)$"];`,
    color: "#5F9EA0",
    tags: [
      "natural=water",
      "water=pond",
      "water=lake",
      "water=reservoir",
      "water=reflecting_pool"
    ],
    edit: ["natural=water"]
  },
  {
    id: 22,
    group: "natural",
    value: "rock",
    icon: "/lib/maki-icons/circle-15.svg",
    query: `
    nwr["natural"="^(rock|stone)$"];`,
    color: "#D3D3D3",
    tags: ["natural=rock", "natural=stone"],
    edit: ["natural=rock", "natural=stone"]
  },
  {
    id: 23,
    group: "natural",
    value: "viewpoint",
    icon: "https://wiki.openstreetmap.org/w/images/c/c2/Viewpoint-16.svg",
    query: `
    nwr["tourism"="viewpoint"];

    nw["viewpoint"="yes"];

    nwr["tower:type"="observation"];`,
    color: "#98FB98",
    tags: ["tourism=viewpoint", "viewpoint=*", "tower:type=observation"],
    edit: ["tourism=viewpoint", "man_made=tower", "man_made", "natural"]
  },
  {
    id: 24,
    group: "natural",
    value: "waterfall",
    icon: "https://wiki.openstreetmap.org/w/images/7/72/Waterfall-14.svg",
    query: `
    nwr["waterway"="^(waterfall|dam|weir)$"];`,
    color: "#20B2AA",
    tags: ["waterway=waterfall", "waterway=dam", "waterway=weir"],
    edit: ["waterway=waterfall", "waterway=dam", "waterway=weir"]
  },
  {
    id: 25,
    group: "community",
    value: "assistance",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/0b/Community_centre-14.svg",
    query: `
      nwr["social_facility"="outreach"];

      nwr["amenity"="social_centre"];

      ${nwFee(`["healthcare"]`)}`,
    color: "#DC143C",
    tags: ["social_facility=outreach", "amenity=social_centre", "healthcare"],
    edit: ["amenity=social_facility", "amenity=social_centre", "healthcare"]
  },
  {
    id: 26,
    group: "community",
    value: "assisted-repair",
    icon: "/lib/temaki-icons/tools.svg",
    query: `
  node["repair"="assisted_self_service"];

  nw["leisure"="hackerspace"]["repair"];

  node["network"~"Repair Caf[eé]",i];
  node["name"~"Repair Caf[eé]",i];
  node["brand"~"Repair Caf[eé]",i];`,
    color: "#1975ae",
    tags: ["repair=assisted_self_service", "leisure=hackerspace", "repair=*"],
    edit: ["amenity", "leisure=hackerspace"]
  },
  {
    id: 27,
    group: "object_of_utility",
    value: "barbecue",
    icon: "https://wiki.openstreetmap.org/w/images/5/50/Bbq-14.svg",
    query: `
nwr["amenity"="bbq"];
nwr["bbq"="yes"];
nwr["barbecue_grill"="yes"];`,
    color: "#708090",
    tags: ["amenity=bbq", "bbq=*"],
    edit: ["amenity=bbq", "tourism"]
  },
  {
    id: 28,
    group: "object_of_utility",
    value: "baking-oven",
    icon: "https://wiki.openstreetmap.org/w/images/f/fe/Bakery-16.svg",
    query: `
    nw["amenity"="baking_oven"][!"historic"];

    nw["building"="bakehouse"]["disused:amenity"!="baking_oven"]["disused:amenity"!="oven"][!"disused:oven"]["abandoned:amenity"!="baking_oven"]["abandoned:amenity"!="oven"][!"abandoned:oven"][!"shop"][!"historic"];`,
    color: "#D2B48C",
    tags: ["amenity=baking_oven", "building=bakehouse"],
    edit: ["amenity", "building"]
  },
  {
    id: 132,
    group: "object_of_utility",
    value: "bicycle-rental",
    icon: "https://wiki.openstreetmap.org/w/images/d/d5/Rental-bicycle-16.svg",
    query: `
    ${nwFee(`["amenity"="bicycle_rental"]`)}`,
    color: "#2E8B57",
    tags: ["amenity=bicycle_rental"],
    edit: ["amenity=bicycle_rental"]
  },
  {
    id: 29,
    group: "object_of_utility",
    value: "bicycle-self-repair",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/01/Bicycle_repair_station-14.svg",
    query: `
      nw["amenity"="bicycle_repair_station"]["service:bicycle:tools"!="no"];

      ${assistedRepair("bicycle")}

      nw["service:bicycle:diy"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=bicycle_repair_station",
      "repair=assisted_self_service",
      "service:bicycle:repair=*",
      "bicycle:repair=*",
      "service:bicycle:diy=*"
    ],
    edit: ["amenity=bicycle_repair_station", "amenity", "shop"]
  },
  {
    id: 30,
    group: "object_of_utility",
    value: "charging-station",
    icon:
      "https://wiki.openstreetmap.org/w/images/a/af/Charging_station.16.svg",
    query: `
    (nw["amenity"="charging_station"]["fee"="no"]["parking:fee"!="yes"];
      - nw["amenity"="charging_station"]["fee"="no"]["parking:fee"!="yes"][~"^authentication:.*$"~"^yes$"];);
      nw["amenity"="charging_station"]["fee"="no"]["parking:fee"!="yes"]["authentication:none"="yes"];`,
    color: "#0092da",
    tags: ["amenity=charging_station"],
    edit: ["amenity=charging_station"]
  },
  {
    id: 31,
    group: "community",
    value: "community-centre",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/0b/Community_centre-14.svg",
    query: `
  nwr["amenity"="community_centre"];`,
    color: "#da532c",
    tags: ["amenity=community_centre"],
    edit: ["amenity=community_centre"]
  },
  {
    id: 32,
    group: "community",
    value: "community-garden",
    icon: "/lib/maki-icons/garden-centre-15.svg",
    query: `
nwr["garden:type"="community"];

nw["landuse"="community_food_growing"];`,
    color: "#228B22",
    tags: ["garden:type=community", "landuse=community_food_growing"],
    edit: ["leisure=garden"]
  },
  {
    id: 42,
    group: "health",
    value: "diaper-changing-table",
    icon: "https://wiki.openstreetmap.org/w/images/f/ff/Babycare_01.png",
    query: `
  nwr["changing_table"]["changing_table"!="no"]["changing_table:fee"!="yes"]["fee"!="yes"];

  nwr["diaper"]["diaper"!="no"]["diaper:fee"!="yes"]["fee"!="yes"];`,
    color: "#F4A460",
    tags: ["changing_table=*"],
    edit: ["amenity=toilets", "amenity", "shop"]
  },
  {
    id: 44,
    group: "health",
    value: "kneipp_water_cure",
    icon: "https://wiki.openstreetmap.org/w/images/c/c1/Kneipp_water_cure.svg",
    query: `
  nwr["amenity"="kneipp_water_cure"];`,
    color: "#33CCCC",
    tags: ["amenity=kneipp_water_cure"],
    edit: ["amenity=kneipp_water_cure"]
  },
  {
    id: 45,
    group: "health",
    value: "drinking-water",
    icon: "https://wiki.openstreetmap.org/w/images/0/08/Drinking-water-16.svg",
    query: `
nwr["drinking_water"="yes"];

nwr["amenity"="drinking_water"];

node["amenity"="water_point"];

nw["drinking_water:refill"="yes"];`,
    color: "#4169E1",
    tags: [
      "amenity=drinking_water",
      "drinking_water=*",
      "amenity=water_point",
      "drinking_water:refill=*"
    ],
    edit: [
      "amenity=drinking_water",
      "amenity=water_point",
      "amenity=toilets",
      "amenity=shelter",
      "tourism=wilderness_hut",
      "highway=rest_area",
      "man_made=water_well",
      "amenity=fountain",
      "natural=spring",
      "amenity"
    ]
  },
  {
    id: 144,
    group: "health",
    value: "defibrillator",
    icon: "/lib/maki-icons/defibrillator-15.svg",
    query: `
nw["emergency"="defibrillator"];`,
    color: "#008855",
    tags: ["emergency=defibrillator"],
    edit: ["emergency=defibrillator"]
  },
  {
    id: 46,
    group: "health",
    value: "food-sharing",
    icon: "https://wiki.openstreetmap.org/w/images/3/3c/Foodbank.svg",
    query: `
      nw["social_facility"~"^(food_bank|soup_kitchen|dairy_kitchen)$"];

      nw["amenity"="food_sharing"];
      nw["social_facility"="food_sharing"];

      nw["recycling:food"="yes"];

      nw["reuse"="fridge"];

      nw["amenity"="fridge"];`,
    color: "#FFD700",
    tags: [
      "amenity=food_sharing",
      "social_facility=food_bank",
      "social_facility=soup_kitchen",
      "social_facility=dairy_kitchen"
    ],
    edit: ["amenity=social_facility", "amenity"]
  },
  {
    id: 48,
    group: "object_of_utility",
    value: "goods-exchange",
    icon: "/lib/maki-icons/gift-15.svg",
    query: `
      // Givebox (Preferred tag)
      nw["amenity"="give_box"];

      nw["amenity"="givebox"];

      // Reuse
      nw["amenity"="reuse"]["reuse:books"!="only"];

      // Give-away shop
      nw["shop"="charity"]["payment:none"="yes"];
      nw["shop"]["charity"="yes"]["payment:none"="yes"];
      nw["shop"="second_hand"]["payment:none"="yes"];
      nw["shop"]["second_hand"="yes"]["payment:none"="yes"];

      nw["shop"="charity"]["fee"="no"];
      nw["shop"]["charity"="yes"]["fee"="no"];
      nw["shop"="second_hand"]["fee"="no"];
      nw["shop"]["second_hand"="yes"]["fee"="no"];

      // Toy library free of charge
      nw["amenity"="toy_library"]["fee"="no"];`,
    color: "#8A2BE2",
    tags: [
      "amenity=give_box",
      "shop=charity",
      "shop=second_hand",
      "amenity=toy_library"
    ],
    edit: ["amenity", "shop=charity", "shop=second_hand", "amenity=toy_library"]
  },
  {
    id: 50,
    group: "community",
    value: "hackerspace",
    icon: "/lib/temaki-icons/toolbox.svg",
    query: `
      nw["leisure"="hackerspace"]["repair"!="only"];

      nw["club"="doityourself"];`,
    color: "#333333",
    tags: ["leisure=hackerspace", "club=doityourself"],
    edit: ["leisure=hackerspace", "club"]
  },
  {
    id: 51,
    group: "community",
    value: "contribute",
    icon: "/lib/maki-icons/heart-15.svg",
    query: `
      nw["shop"="charity"];
      nw["office"~"^(charity|ngo|foundation|association)$"];
      nw["club"="charity"];
      nw["charity"]["charity"!="no"];
      nw["operator:type"~"^(charitable|community|private_non_profit|ngo|association|cooperative)$",i]["amenity"!="parking"];
      nw["operator_type"~"^(charitable|community|private_non_profit|ngo|association|cooperative)$",i]["amenity"!="parking"];
      nw["operator"="community"]["amenity"!="parking"];

      nwr["healthcare"="blood_donation"];`,
    color: "#FF69B4",
    tags: [
      "office=charity",
      "shop=charity",
      "charity=yes",
      "operator:type=private_non_profit",
      "operator:type=charitable",
      "operator:type=community",
      "office=ngo",
      "operator:type=ngo",
      "office=foundation",
      "office=association",
      "healthcare=blood_donation"
    ],
    edit: [
      "office=charity",
      "shop=charity",
      "office=ngo",
      "office=foundation",
      "office=association",
      "healthcare=blood_donation",
      "shop",
      "amenity"
    ]
  },
  {
    id: 52,
    group: "community",
    value: "coworking",
    icon: "/lib/maki-icons/building-15.svg",
    query: `
    ${nwFee(`["amenity"="coworking_space"]`)}

    ${nwFee(`["office"="coworking"]`)}`,
    color: "#8FBC8F",
    tags: ["amenity=coworking_space", "office=coworking"],
    edit: ["amenity=coworking_space", "office=coworking"]
  },
  {
    id: 53,
    group: "health",
    value: "public-shower",
    icon: "https://wiki.openstreetmap.org/w/images/5/5a/Shower-14.svg",
    query: `
     // Show only showers that are not inside a bath
  (
    (
nw["amenity"="shower"];
  );
  -(
    (
      wr["amenity"="public_bath"]["fee"!="no"];
      wr["leisure"~"water_park|sports_centre|stadium"]["fee"!="no"];
    );
    map_to_area -> .b;
    (
      nw(area.b)["amenity"="shower"];
    );
  );
);`,
    color: "#1E90FF",
    tags: ["amenity=shower"],
    edit: ["amenity=shower"]
  },
  {
    id: 54,
    group: "object_of_utility",
    value: "pump",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/01/Bicycle_repair_station-14.svg",
    query: `
  nw["amenity"="compressed_air"];

  nw["compressed_air"="yes"]["compressed_air:fee"!="yes"];

  nw["service:bicycle:pump"="yes"];`,
    color: "#00BFFF",
    tags: [
      "amenity=compressed_air",
      "compressed_air=*",
      "service:bicycle:pump=*"
    ],
    edit: [
      "amenity=compressed_air",
      "amenity=bicycle_repair_station",
      "amenity",
      "shop"
    ]
  },
  {
    id: 55,
    group: "health",
    value: "toilet",
    icon: "https://wiki.openstreetmap.org/w/images/f/fa/Toilets-16.svg",
    query: `
  // Public toilet
  nw["amenity"="toilets"];

  // Public toilet (Alternativ)
  nw["building"="toilets"];

  // Toilet in other Feature
  nwr["toilets"="yes"];`,
    color: "#8B4513",
    tags: ["amenity=toilets", "building=toilets", "toilets=*"],
    edit: ["amenity=toilets", "building", "amenity"]
  },
  {
    id: 56,
    group: "communitySport",
    value: "basketball",
    icon: "/lib/maki-icons/basketball-15.svg",
    query: `
    nwr["sport"~"basketball|multi"]["leisure"!~"sports_centre|stadium"]["surface"!="grass"];
    ${nwrFee(
      `["sport"~"basketball|multi"]["leisure"~"sports_centre|stadium"]`
    )}`,
    color: "#FF4500",
    tags: ["leisure=pitch", "sport=basketball", "sport=multi"],
    edit: ["leisure=pitch"]
  },
  {
    id: 57,
    group: "sport",
    value: "bath",
    icon: "https://wiki.openstreetmap.org/w/images/0/01/Public_bath.svg",
    query: `
    ${nwrFee(`["amenity"="public_bath"]`)}
    ${nwrFee(`["leisure"="water_park"]`)}
    nwr["leisure"="bathing_place"];

    ${nwrFee(`["sport"="swimming"]["leisure"~"sports_centre|stadium"]`)}

  // Show only swimming pools that are not inside a bath
  (
    (
      nwr["leisure"="swimming_pool"];
      nwr["leisure"="swimming_area"];
      nwr["sport"="swimming"]["leisure"!~"sports_centre|stadium"];
    );
    -(
      (
        wr["amenity"="public_bath"];
        wr["leisure"~"water_park|sports_centre|stadium"];
      );
      map_to_area -> .b;
      (
        nwr(area.b)["leisure"="swimming_pool"];
        nwr(area.b)["leisure"="swimming_area"];
        nwr(area.b)["sport"="swimming"]["leisure"!~"sports_centre|stadium"];
      );
    );
  );`,
    color: "#0000CD",
    tags: [
      "sport=swimming",
      "amenity=public_bath",
      "leisure=water_park",
      "leisure=swimming_pool",
      "leisure=swimming_area"
    ],
    edit: [
      "amenity=public_bath",
      "leisure=sports_centre",
      "leisure=water_park",
      "leisure=swimming_pool",
      "leisure=swimming_area"
    ]
  },
  {
    id: 58,
    group: "sport",
    value: "bikepark",
    icon: "/lib/maki-icons/bicycle-15.svg",
    query: `
    nwr["sport"~"bmx|cycling"]["leisure"!~"sports_centre|stadium"];
    ${nwrFee(`["sport"~"bmx|cycling"]["leisure"~"sports_centre|stadium"]`)}`,
    color: "#A52A2A",
    tags: ["sport=bmx", "sport=cycling"],
    edit: ["leisure=track", "landuse=recreation_ground", "leisure=pitch"]
  },
  {
    id: 59,
    group: "sport",
    value: "skatepark",
    icon: "/lib/temaki-icons/skateboarding.svg",
    query: `
    nwr["sport"="skateboard"]["leisure"!~"sports_centre|stadium"];
    ${nwrFee(`["sport"="skateboard"]["leisure"~"sports_centre|stadium"]`)}`,
    color: "#E9967A",
    tags: ["sport=skateboard"],
    edit: ["leisure=pitch"]
  },
  {
    id: 60,
    group: "communitySport",
    value: "chess",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_pictogram.svg",
    query: `
    nw["sport"="chess"];`,
    color: "#000000",
    tags: ["sport=chess"],
    edit: ["leisure=pitch"]
  },
  {
    id: 61,
    group: "sport",
    value: "climbing",
    icon: "/lib/temaki-icons/abseiling.svg",
    query: `
      // climbing and rock_climbing
      nwr["sport"~"climbing"]["leisure"!~"sports_centre|stadium"];
      ${nwrFee(`["sport"~"climbing"]["leisure"~"sports_centre|stadium"]`)}

      nwr["playground"="climbingwall"];`,
    color: "#696969",
    tags: ["sport=climbing", "playground=climbingwall"],
    edit: ["natural", "landuse=recreation_ground", "playground"]
  },
  {
    id: 62,
    group: "communitySport",
    value: "boules",
    icon: "/lib/maki-icons/pitch-15.svg",
    query: `
    nwr["sport"~"boules|bowls"]["leisure"!~"sports_centre|stadium"];
    ${nwrFee(`["sport"~"boules|bowls"]["leisure"~"sports_centre|stadium"]`)}`,
    color: "#f1c68e",
    tags: ["sport=boules", "sport=bowls"],
    edit: ["leisure=pitch"]
  },
  {
    id: 63,
    group: "sport",
    value: "fitness",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    query: `
nwr["leisure"="fitness_station"];

nwr["leisure"="pitch"]["sport"~"fitness|crossfit|exercise|gymnastics|yoga|bodybuilding"];

nw["playground"~"horizontal_bar|exercise|balance(_)?beam|slackline"];

nw["playground:horizontal_bar"="yes"];
nw["playground:exercise"="yes"];
nw["playground:balancebeam"="yes"];
nw["playground:balance_beam"="yes"];
nw["playground:slackline"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    id: 64,
    group: "sport",
    subgroup: "fitness",
    value: "horizontal_bar",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-minus",
    query: `
    nwr["fitness_station"~"horizontal_bar"];
    nwr["fitness_station:horizontal_bar"="yes"];

    nw["playground"~"horizontal_bar"];
    nw["playground:horizontal_bar"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    id: 65,
    group: "sport",
    subgroup: "fitness",
    value: "parallel_bars",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-grip-lines-vertical",
    query: `
nwr["fitness_station"~"parallel_bars"];
nwr["fitness_station:parallel_bars"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    id: 66,
    group: "sport",
    subgroup: "fitness",
    value: "rings",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "far fa-circle",
    query: `
    nwr["fitness_station"~"rings"];
    nwr["fitness_station:rings"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    id: 67,
    group: "sport",
    subgroup: "fitness",
    value: "exercise-machine",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-biking",
    query: `
    nwr["fitness_station"~"elliptical_trainer|air_walker|exercise_bike|rower"];

    nwr["fitness_station:elliptical_trainer"="yes"];
    nwr["fitness_station:air_walker"="yes"];
    nwr["fitness_station:exercise_bike"="yes"];
    nwr["fitness_station:rower"="yes"];

    nw["playground"~"exercise"];
    nw["playground:exercise"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    id: 68,
    group: "sport",
    subgroup: "fitness",
    value: "balance",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-street-view",
    query: `
    nwr["fitness_station"~"slackline|balance(_)?beam"];

    nwr["fitness_station:slackline"="yes"];
    nwr["fitness_station:balance_beam"="yes"];
    nwr["fitness_station:balancebeam"="yes"];

    nw["playground"~"slackline|balance(_)?beam"];

    nw["playground:slackline"="yes"];
    nw["playground:balance_beam"="yes"];
    nw["playground:balancebeam"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    id: 69,
    group: "sport",
    value: "sledding",
    icon: "/lib/temaki-icons/sledding.svg",
    query: `
  nwr["sport"="toboggan"];

  nwr["piste:type"="sled"];

  nwr["playground"="sledding"];`,
    color: "#D2691E",
    tags: ["sport=toboggan", "piste:type=sled", "playground=sledding"],
    edit: []
  },
  {
    id: 70,
    group: "sport",
    value: "fitness-trail",
    icon: "/lib/maki-icons/pitch-15.svg",
    query: `
  nwr["route"="fitness_trail"];`,
    color: "#8B008B",
    tags: ["route=fitness_trail"],
    edit: ["type=route"]
  },
  {
    id: 71,
    group: "sport",
    value: "running",
    icon: "/lib/maki-icons/pitch-15.svg",
    query: `
  nwr["sport"="running"]["leisure"!~"sports_centre|stadium"];
  ${nwrFee(`["sport"="running"]["leisure"~"sports_centre|stadium"]`)}

  nwr["leisure"="track"]["sport"="athletics"];`,
    color: "#8B0000",
    tags: ["sport=running", "sport=athletics"],
    edit: ["sport=running", "sport=athletics"]
  },
  {
    id: 72,
    group: "communitySport",
    value: "soccer",
    icon: "/lib/maki-icons/soccer-15.svg",
    query: `
    // exclude table_soccer
      nwr["sport"~"(^soccer)|;soccer|multi"]["leisure"!~"sports_centre|stadium"];
      ${nwrFee(
        `["sport"~"(^soccer)|;soccer|multi"]["leisure"~"sports_centre|stadium"]`
      )}`,
    color: "#ADFF2F",
    tags: ["leisure=pitch", "sport=soccer", "sport=multi"],
    edit: ["leisure=pitch"]
  },
  {
    id: 73,
    group: "communitySport",
    value: "table-tennis",
    icon: "/lib/maki-icons/table-tennis-15.svg",
    query: `
  // Table tennis
  nw["sport"="table_tennis"];

  // Table tennis (obsolete)
  nw["leisure"="table_tennis_table"];`,
    color: "#008000",
    tags: ["sport=table_tennis"],
    edit: ["leisure=pitch"]
  },
  {
    id: 74,
    group: "communitySport",
    value: "table-soccer",
    icon: "https://wiki.openstreetmap.org/w/images/c/c8/Kicker02.png",
    query: `
      nwr["leisure"="pitch"]["sport"="table_soccer"]["fee"];`,
    color: "#7CFC00",
    tags: ["sport=table_soccer"],
    edit: ["leisure=pitch"]
  },
  {
    id: 75,
    group: "communitySport",
    value: "volleyball",
    icon: "/lib/maki-icons/volleyball-15.svg",
    query: `
      // volleyball and beachvolleyball
      nwr["sport"~"volleyball"]["leisure"!~"sports_centre|stadium"];
      ${nwrFee(`["sport"~"volleyball"]["leisure"~"sports_centre|stadium"]`)}`,
    color: "#F4A460",
    tags: ["leisure=pitch", "sport=volleyball", "sport=beachvolleyball"],
    edit: ["leisure=pitch"]
  },
  {
    id: 76,
    group: "trip",
    value: "animal",
    icon: "/lib/maki-icons/zoo-15.svg",
    query: `
  nwr["tourism"="zoo"];
  nwr["zoo"];

  // Show only animals that are not inside a zoo
  (
    nwr["attraction"="animal"];
    -(
      wr["tourism"="zoo"];
      map_to_area -> .z;
      (
        nwr(area.z)["attraction"="animal"];
      );
    );
  );

  nwr["tourism"="aquarium"];

  nw["man_made"="beehive"];
  nwr["landuse"="apiary"];

  nwr["landuse"="animal_keeping"];
  nwr["animal_keeping"];
  way["landuse"="animal_enclosure"];

  way["landuse"="meadow"]["animal"];
  way["landuse"="farmyard"]["animal"];

  way["landuse"="meadow"]["livestock"];
  way["landuse"="farmyard"]["livestock"];
  nw["landuse"="livestock"];
  wr["meadow"="pasture"];

  way["landuse"="meadow"]["species"];
  way["landuse"="farmyard"]["species"];

  way["landuse"="paddock"];
  wr["meadow"="paddock"];`,
    color: "#DAA520",
    tags: [
      "tourism=zoo",
      "attraction=animal",
      "tourism=aquarium",
      "man_made=beehive",
      "landuse=apiary",
      "landuse=animal_keeping",
      "landuse=meadow",
      "landuse=farmyard"
    ],
    edit: [
      "tourism=zoo",
      "attraction=animal",
      "tourism=aquarium",
      "man_made=beehive",
      "landuse=meadow",
      "landuse=farmyard",
      "landuse"
    ]
  },
  {
    id: 77,
    group: "trip",
    subgroup: "animal",
    value: "observation",
    icon: "/lib/temaki-icons/binoculars.svg",
    button: "fas fa-binoculars",
    query: `
  nw["leisure"="bird_hide"];
  nw["leisure"="wildlife_hide"];
  nw["observation"="wild_animal"];
  nw["man_made"="nesting_site"];
  nw["man_made"="insect_hotel"];
  node["natural"="anthill"];
  node["natural"="termite_mound"];`,
    color: "#DAA520",
    tags: [
      "leisure=bird_hide",
      "leisure=wildlife_hide",
      "observation=wild_animal",
      "man_made=nesting_site",
      "man_made=insect_hotel",
      "natural=anthill",
      "natural=termite_mound"
    ],
    edit: [
      "leisure=bird_hide",
      "man_made=tower",
      "leisure",
      "man_made",
      "natural"
    ]
  },
  {
    id: 78,
    group: "trip",
    value: "maze",
    icon: "/lib/temaki-icons/compass.svg",
    query: `
nwr["attraction"="maze"];
nwr["leisure"="maze"];`,
    color: "#197419",
    tags: ["attraction=maze"],
    edit: ["attraction=maze"]
  },
  {
    id: 79,
    group: "trip",
    value: "webcam",
    icon: "/lib/temaki-icons/security_camera.svg",
    query: `
node["man_made"="surveillance"]["website"];
node["man_made"="surveillance"]["contact:website"];
node["man_made"="surveillance"]["website:webcam"];

node["man_made"="surveillance"]["webcam"];
node["man_made"="surveillance"]["contact:webcam"];
node["man_made"="surveillance"]["webcam:url"];

node["man_made"="surveillance"]["url"];
node["man_made"="surveillance"]["url:webcam"];

node["man_made"="surveillance"]["image"];`,
    color: "#a6a6a6",
    tags: ["man_made=surveillance"],
    edit: ["man_made=surveillance"]
  },
  {
    id: 80,
    group: "object_of_utility",
    value: "piano",
    icon: "/lib/maki-icons/music-15.svg",
    query: `
nw["amenity"="piano"][!"craft"][!"shop"];
nw["piano"="yes"][!"craft"][!"shop"];

nw["musical_instrument"="piano"][!"craft"][!"shop"];
nw["musical_instrument:piano"="yes"][!"craft"][!"shop"];`,
    color: "#008B8B",
    tags: [
      "amenity=piano",
      "musical_instrument=piano",
      "musical_instrument:piano=*"
    ],
    edit: ["amenity"]
  },
  {
    id: 82,
    group: "object_of_utility",
    value: "advertising",
    icon: "https://wiki.openstreetmap.org/w/images/2/20/Column-14.svg",
    query: `
      nwr["advertising"]["access"];
      nwr["man_made"="advertising"]["access"];

      node["advertising"]["operator:type"="community"];
      node["advertising"]["operator:type"="public"];

      nw["board_type"="notice"]["access"];`,
    color: "#e6007a",
    tags: ["man_made=advertising", "board_type=notice"],
    edit: [
      "advertising=board",
      "advertising=column",
      "advertising=poster_box",
      "advertising=billboard",
      "tourism=information"
    ]
  },
  {
    id: 83,
    group: "trip",
    value: "fireplace",
    icon: "https://wiki.openstreetmap.org/w/images/d/df/Firepit.svg",
    query: `
  nwr["leisure"="firepit"];
  nwr["fireplace"="yes"];

  nwr["openfire"="yes"]["tourism"!="camp_site"];

  nwr["amenity"="bbq"];
  nwr["bbq"="yes"];
  nwr["barbecue_grill"="yes"];`,
    color: "#B22222",
    tags: [
      "leisure=firepit",
      "fireplace=*",
      "openfire=*",
      "amenity=bbq",
      "bbq=*"
    ],
    edit: ["leisure=firepit", "amenity=bbq", "tourism"]
  },
  {
    id: 84,
    group: "trip",
    value: "map",
    icon: "https://wiki.openstreetmap.org/w/images/c/ca/Map-14.svg",
    query: `
      node["information"="map"];`,
    color: "#FFE4C4",
    tags: ["information=map"],
    edit: ["tourism=information"]
  },
  {
    id: 85,
    group: "trip",
    subgroup: "map",
    value: "openstreetmap",
    icon: "https://wiki.openstreetmap.org/w/images/c/ca/Map-14.svg",
    button: "fas fa-heart",
    query: `
      node["information"="map"][~"map[:_]{0,1}source"~"^(OSM|OpenStreetMap)$",i];`,
    color: "#9fd485",
    tags: ["information=map"],
    edit: ["tourism=information"]
  },
  {
    id: 86,
    group: "trip",
    value: "garden",
    icon: "/lib/maki-icons/garden-15.svg",
    query: `
  nwr["leisure"="garden"];`,
    color: "#BA55D3",
    tags: ["leisure=garden"],
    edit: ["leisure=garden"]
  },
  {
    id: 87,
    group: "trip",
    subgroup: "garden",
    value: "garden-with-name",
    icon: "/lib/maki-icons/garden-15.svg",
    button: "far fa-minus-square",
    query: `
  nwr["leisure"="garden"]["name"];`,
    color: "#BA55D3",
    tags: ["leisure=garden"],
    edit: ["leisure=garden"]
  },
  {
    id: 88,
    group: "natural",
    value: "nature-park",
    icon: "/lib/maki-icons/natural-15.svg",
    query: `
      nwr["leisure"="nature_reserve"];
      nwr["boundary"="national_park"];
      nwr["boundary"="protected_area"];`,
    color: "#006400",
    tags: [
      "leisure=nature_reserve",
      "boundary=national_park",
      "boundary=protected_area"
    ],
    edit: ["leisure=nature_reserve", "boundary"]
  },
  {
    id: 89,
    group: "trip",
    value: "park",
    icon: "/lib/maki-icons/park-15.svg",
    query: `
  nwr["leisure"="park"];
  nwr["landuse"="recreation_ground"];
  nwr["leisure"="recreation_ground"];`,
    color: "#90EE90",
    tags: ["leisure=park", "landuse=recreation_ground"],
    edit: ["leisure=park", "landuse=recreation_ground"]
  },
  {
    id: 90,
    group: "trip",
    subgroup: "park",
    value: "park-with-name",
    icon: "/lib/maki-icons/park-15.svg",
    button: "far fa-minus-square",
    query: `
  nwr["leisure"="park"]["name"];
  nwr["landuse"="recreation_ground"]["name"];
  nwr["leisure"="recreation_ground"]["name"];`,
    color: "#90EE90",
    tags: ["leisure=park", "landuse=recreation_ground"],
    edit: ["leisure=park", "landuse=recreation_ground"]
  },
  {
    id: 91,
    group: "material",
    value: "battery-recycling",
    icon: "/lib/temaki-icons/power.svg",
    query: `
    ${recycling("batteries", "car_batteries")}`,
    color: "#ffe000",
    tags: ["recycling:batteries=yes", "recycling:car_batteries=yes"],
    edit: ["amenity=recycling"]
  },
  {
    id: 92,
    group: "material",
    value: "reusable-bottle-reuse",
    icon: "https://wiki.openstreetmap.org/w/images/e/eb/Alcohol-16.svg",
    query: `
    nw["vending"="bottle_return"];
    nw["recycling:refund_bottles"="yes"];`,
    color: "#267b26",
    tags: ["vending=bottle_return"],
    edit: ["vending=bottle_return"]
  },
  {
    id: 93,
    group: "material",
    value: "oil-recycling",
    icon: "/lib/maki-icons/water-15.svg",
    query: `
    ${recycling("cooking_oil", "engine_oil", "oil", "waste_oil")}`,
    color: "#582d19",
    tags: [
      "recycling:cooking_oil=yes",
      "recycling:engine_oil=yes",
      "recycling:oil=yes",
      "recycling:waste_oil=yes"
    ],
    edit: ["amenity=recycling"]
  },
  {
    id: 94,
    group: "material",
    value: "hazardous-recycling",
    icon: "/lib/maki-icons/danger-15.svg",
    query: `
    ${recycling("hazardous_waste", "hydrargyrum", "paint")}`,
    color: "#000000",
    tags: [
      "recycling:hazardous_waste=yes",
      "recycling:hydrargyrum=yes",
      "recycling:paint=yes"
    ],
    edit: ["amenity=recycling"]
  },
  {
    id: 95,
    group: "material",
    value: "rubble-recycling",
    icon: "/lib/temaki-icons/ruins.svg",
    query: `
    ${recycling("hardcore", "rubble")}`,
    color: "#d39476",
    tags: ["recycling:hardcore=yes", "recycling:rubble=yes"],
    edit: ["amenity=recycling"]
  },
  {
    id: 96,
    group: "material",
    value: "plastic-recycling",
    icon: "https://wiki.openstreetmap.org/w/images/9/98/Beverages-14.svg",
    query: `
    ${recycling(
      "plastic",
      "plastic_bottles",
      "plastic_packaging",
      "PET",
      "plastic_bags",
      "polystyrene_foam",
      "polyester",
      "styrofoam",
      "foil"
    )}`,
    color: "#5F9EA0",
    tags: [
      "recycling:plastic=yes",
      "recycling:plastic_bottles=yes",
      "recycling:plastic_packaging=yes",
      "recycling:PET=yes",
      "recycling:plastic_bags=yes",
      "recycling:polystyrene_foam=yes",
      "recycling:polyester=yes",
      "recycling:styrofoam=yes",
      "recycling:foil=yes"
    ],
    edit: ["amenity=recycling"]
  },
  {
    id: 97,
    group: "trip",
    value: "picnic-site",
    icon: "https://wiki.openstreetmap.org/w/images/f/fc/Picnic_site.svg",
    query: `
  nwr["tourism"="picnic_site"];

  nw["leisure"="picnic_table"];

  nw["shelter_type"="picnic_shelter"];`,
    color: "#DEB887",
    tags: [
      "tourism=picnic_site",
      "leisure=picnic_table",
      "shelter_type=picnic_shelter"
    ],
    edit: ["tourism=picnic_site", "leisure=picnic_table", "amenity=shelter"]
  },
  {
    id: 98,
    group: "trip",
    value: "square",
    icon: "/lib/temaki-icons/pedestrian.svg",
    query: `
nw["place"="square"];
nw["leisure"="common"];

way["highway"="pedestrian"]["area"="yes"];
way["highway"="footway"]["area"="yes"];`,
    color: "#666666",
    tags: [
      "place=square",
      "leisure=common",
      "highway=pedestrian",
      "highway=footway"
    ],
    edit: ["place=square", "leisure=common", "highway"]
  },
  {
    id: 99,
    group: "trip",
    subgroup: "square",
    value: "square-with-name",
    icon: "/lib/temaki-icons/pedestrian.svg",
    button: "far fa-minus-square",
    query: `
nw["place"="square"]["name"];
nw["leisure"="common"]["name"];

way["highway"="pedestrian"]["area"="yes"]["name"];
way["highway"="footway"]["area"="yes"]["name"];`,
    color: "#666666",
    tags: [
      "place=square",
      "leisure=common",
      "highway=pedestrian",
      "highway=footway"
    ],
    edit: ["place=square", "leisure=common", "highway"]
  },
  {
    id: 100,
    group: "trip",
    value: "playground",
    icon: "https://wiki.openstreetmap.org/w/images/3/31/Playground-16.svg",
    query: `
      nwr["leisure"="playground"];
      nw["playground"];
      nw[~"^playground:.*$"~".*"];`,
    color: "#32CD32",
    tags: ["leisure=playground", "playground=*"],
    edit: ["leisure=playground", "playground"]
  },
  {
    id: 101,
    group: "trip",
    value: "lounger",
    icon: "/lib/maki-icons/beach-15.svg",
    query: `
  nw["amenity"="lounger"];

  nw["amenity"="hammock"];`,
    color: "#e6e600",
    tags: ["amenity=lounger", "amenity=hammock"],
    edit: ["amenity"]
  },
  {
    id: 102,
    group: "goods",
    value: "clothes",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    query: `
      // Give
      ${recycling("belts", "clothes", "shoes", "textiles")}

      // Give and take
      nw["social_facility"="clothing_bank"];
      nw["amenity"="give_box"]["clothes"!="no"];

      // Repair
      ${assistedRepair("clothes", "shoes", "fabrik")}`,
    color: "#FF7F50",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity=social_facility", "amenity"]
  },
  {
    id: 103,
    group: "goods",
    subgroup: "clothes",
    value: "clothes-give",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
      ${recycling("belts", "clothes", "shoes", "textiles")}

      nw["social_facility"="clothing_bank"];

      nw["amenity"="give_box"]["clothes"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#FF7F50",
    tags: [
      "recycling:clothes=yes",
      "recycling:shoes=yes",
      "social_facility=clothing_bank",
      "amenity=give_box"
    ],
    edit: ["amenity=recycling", "amenity=social_facility", "amenity"]
  },
  {
    id: 104,
    group: "goods",
    subgroup: "clothes",
    value: "clothes-take",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
      nw["social_facility"="clothing_bank"];

      nw["amenity"="give_box"]["clothes"!="no"];`,
    color: "#FF7F50",
    tags: ["social_facility=clothing_bank", "amenity=give_box"],
    edit: ["amenity=social_facility", "amenity"]
  },
  {
    id: 105,
    group: "goods",
    subgroup: "clothes",
    value: "clothes-repair",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    button: "fas fa-tools",
    query: `
    ${assistedRepair("clothes", "shoes", "fabrik")}`,
    color: "#FF7F50",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    id: 106,
    group: "goods",
    value: "mobile-phones",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    query: `
      // Give
      ${recycling("mobile_phones")}

      // Give and take
      nw["amenity"="give_box"]["electronics"!="no"];

      // Repair
      ${assistedRepair("mobile_phone")}

      // Charge
      node["amenity"="device_charging_station"]["fee"!="yes"];`,
    color: "#191970",
    tags: [
      "recycling:mobile_phones=yes",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*",
      "amenity=device_charging_station"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 107,
    group: "goods",
    subgroup: "mobile-phones",
    value: "mobile-phones-give",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    ${recycling("mobile_phones")}

      nw["amenity"="give_box"]["electronics"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#191970",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 108,
    group: "goods",
    subgroup: "mobile-phones",
    value: "mobile-phones-take",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["amenity"="give_box"]["electronics"!="no"];`,
    color: "#191970",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    id: 109,
    group: "goods",
    subgroup: "mobile-phones",
    value: "mobile-phones-repair",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    button: "fas fa-tools",
    query: `
     ${assistedRepair("mobile_phone")}`,
    color: "#191970",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    id: 110,
    group: "goods",
    value: "computers",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    query: `
      // Give
      ${recycling("computers")}

      // Give and take
      nw["amenity"="give_box"]["electronics"!="no"];

      // Repair
      ${assistedRepair("computer")}`,
    color: "#ABAB9A",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 111,
    group: "goods",
    subgroup: "computers",
    value: "computers-give",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
      ${recycling("computers")}

      nw["amenity"="give_box"]["electronics"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#ABAB9A",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling"]
  },
  {
    id: 112,
    group: "goods",
    subgroup: "computers",
    value: "computers-take",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
      nw["amenity"="give_box"]["electronics"!="no"];`,
    color: "#ABAB9A",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    id: 113,
    group: "goods",
    subgroup: "computers",
    value: "computers-repair",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    button: "fas fa-tools",
    query: `
    ${assistedRepair("computer")}`,
    color: "#ABAB9A",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    id: 114,
    group: "goods",
    value: "toys",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    query: `
      // Give
      ${recycling("toys")}

      // Give and take
      nw["amenity"="give_box"];

      // Rent
      nw["amenity"="toy_library"]["fee"="no"];

      // Repair
      ${assistedRepair("toy")}`,
    color: "#800000",
    tags: [
      "recycling:toys=yes",
      "amenity=give_box",
      "amenity=toy_library",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity=toy_library", "amenity"]
  },
  {
    id: 115,
    group: "goods",
    subgroup: "toys",
    value: "toys-give",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
      ${recycling("toys")}

      nw["amenity"="give_box"]["give_box:policy"!="free_to_take"];`,
    color: "#800000",
    tags: ["recycling:toys=yes", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 116,
    group: "goods",
    subgroup: "toys",
    value: "toys-take",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
      nw["amenity"="give_box"];`,
    color: "#800000",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  // {
  //   id: 117,
  //   group: "goods",
  //   subgroup: "toys",
  //   value: "toys-rent",
  //   icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
  //   button: "fas fa-redo-alt",
  //   query: `
  //   nw["amenity"="toy_library"]["fee"="no"];`,
  //   color: "#800000",
  //   tags: ["amenity=toy_library"],
  //   edit: ["amenity=toy_library"]
  // },
  {
    id: 118,
    group: "goods",
    subgroup: "toys",
    value: "toys-repair",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    button: "fas fa-tools",
    query: `
    ${assistedRepair("toy")}`,
    color: "#800000",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    id: 119,
    group: "goods",
    value: "electronics",
    icon: "/lib/temaki-icons/electronic.svg",
    query: `
      // Give
      ${recycling(
        "small_electrical_appliances",
        "chipboard",
        "electrical_items",
        "electrical_appliances",
        "electronic",
        "electronics",
        "fridge_and_freezer",
        "small_appliances",
        "white_goods",
        "tv_monitor"
      )}

      // Give and take
      nw["amenity"="give_box"]["electronics"!="no"];

      // Repair
      ${assistedRepair("small_electronics_device", "electronics", "camera")}`,
    color: "#800080",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 120,
    group: "goods",
    subgroup: "electronics",
    value: "electronics-give",
    icon: "/lib/temaki-icons/electronic.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    ${recycling(
      "small_electrical_appliances",
      "small_appliances",
      "chipboard",
      "electrical_items",
      "electrical_appliances",
      "electronic",
      "electronics",
      "fridge_and_freezer",
      "white_goods",
      "tv_monitor"
    )}

      nw["amenity"="give_box"]["electronics"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#800080",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 121,
    group: "goods",
    subgroup: "electronics",
    value: "electronics-take",
    icon: "/lib/temaki-icons/electronic.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["amenity"="give_box"]["electronics"!="no"];`,
    color: "#800080",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    id: 122,
    group: "goods",
    subgroup: "electronics",
    value: "electronics-repair",
    icon: "/lib/temaki-icons/electronic.svg",
    button: "fas fa-tools",
    query: `
    ${assistedRepair("small_electronics_device", "electronics", "camera")}`,
    color: "#800080",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    id: 123,
    group: "goods",
    value: "furniture",
    icon: "/lib/temaki-icons/furniture.svg",
    query: `
      // Give
      ${recycling("furniture", "interior_decoration", "wood", "pallets")}

      // Give and take
      nw["amenity"="give_box"];

      // Repair
      ${assistedRepair("furniture")}`,
    color: "#B8860B",
    tags: [
      "recycling:furniture=yes",
      "recycling:wood=yes",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 124,
    group: "goods",
    subgroup: "furniture",
    value: "furniture-give",
    icon: "/lib/temaki-icons/furniture.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    ${recycling("furniture", "interior_decoration", "wood", "pallets")}

      nw["amenity"="give_box"]["give_box:policy"!="free_to_take"];`,
    color: "#B8860B",
    tags: ["recycling:furniture=yes", "recycling:wood=yes", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    id: 125,
    group: "goods",
    subgroup: "furniture",
    value: "furniture-take",
    icon: "/lib/temaki-icons/furniture.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
      nw["amenity"="give_box"];`,
    color: "#B8860B",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    id: 126,
    group: "goods",
    subgroup: "furniture",
    value: "furniture-repair",
    icon: "/lib/temaki-icons/furniture.svg",
    button: "fas fa-tools",
    query: `
    ${assistedRepair("furniture")}`,
    color: "#B8860B",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    id: 127,
    group: "goods",
    value: "bicycle",
    icon: "/lib/maki-icons/bicycle-15.svg",
    query: `
      // Give
      ${recycling("bicycles")}

      // Rent
      ${nwFee(`["amenity"="bicycle_rental"]`)}

      // Repair
      nw["amenity"="bicycle_repair_station"];
      ${assistedRepair("bicycle")}
      nw["service:bicycle:diy"="yes"];

      // Pump
      nw["amenity"="compressed_air"];
      nw["compressed_air"="yes"];
      nw["service:bicycle:pump"="yes"];

      // Park
      nwr["sport"~"bmx|cycling"]["leisure"!~"sports_centre|stadium"];
      ${nwrFee(`["sport"~"bmx|cycling"]["leisure"~"sports_centre|stadium"]`)}

      // Charge
      (nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"];
      - nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"][~"^authentication:.*$"~"^yes$"];);
      nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"]["authentication:none"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=recycling",
      "amenity=bicycle_rental",
      "amenity=bicycle_repair_station",
      "repair=assisted_self_service",
      "repair=*",
      "service:bicycle:repair=*",
      "service:bicycle:diy=*",
      "amenity=compressed_air",
      "compressed_air=*",
      "service:bicycle:pump=*",
      "sport=bmx",
      "sport=cycling",
      "amenity=charging_station"
    ],
    edit: [
      "amenity=recycling",
      "amenity=bicycle_rental",
      "amenity=bicycle_repair_station",
      "amenity",
      "shop",
      "leisure=track",
      "landuse=recreation_ground",
      "leisure=pitch",
      "amenity=charging_station"
    ]
  },
  {
    id: 128,
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-give",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    ${recycling("bicycles")}`,
    color: "#4682B4",
    tags: ["amenity=recycling"],
    edit: ["amenity=recycling"]
  },
  {
    id: 130,
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-rent",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-redo-alt",
    query: `
    ${nwFee(`["amenity"="bicycle_rental"]`)}`,
    color: "#4682B4",
    tags: ["amenity=bicycle_rental"],
    edit: ["amenity=bicycle_rental"]
  },
  {
    id: 131,
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-repair",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-tools",
    query: `
    nw["amenity"="bicycle_repair_station"]["service:bicycle:tools"!="no"];

    ${assistedRepair("bicycle")}

    nw["service:bicycle:diy"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=bicycle_repair_station",
      "repair=assisted_self_service",
      "repair=*",
      "service:bicycle:repair=*",
      "service:bicycle:diy=*"
    ],
    edit: ["amenity=bicycle_repair_station", "amenity", "shop"]
  },
  {
    id: 133,
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-pump",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-tachometer-alt",
    query: `
      nw["amenity"="compressed_air"];

      nw["compressed_air"="yes"];

      nw["service:bicycle:pump"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=compressed_air",
      "compressed_air=*",
      "service:bicycle:pump=*"
    ],
    edit: [
      "amenity=compressed_air",
      "amenity=bicycle_repair_station",
      "amenity",
      "shop"
    ]
  },
  {
    id: 134,
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-park",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-infinity",
    query: `
      nwr["sport"~"bmx|cycling"]["leisure"!~"sports_centre|stadium"];
      ${nwrFee(`["sport"~"bmx|cycling"]["leisure"~"sports_centre|stadium"]`)}`,
    color: "#4682B4",
    tags: ["sport=bmx", "sport=cycling"],
    edit: ["leisure=track", "landuse=recreation_ground", "leisure=pitch"]
  },
  {
    id: 135,
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-charge",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-charging-station",
    query: `
      (nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"];
      - nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"][~"^authentication:.*$"~"^yes$"];);
      nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"]["authentication:none"="yes"];`,
    color: "#4682B4",
    tags: ["amenity=charging_station"],
    edit: ["amenity=charging_station"]
  }
];
