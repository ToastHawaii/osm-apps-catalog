import { Attribute } from "./Generator";

const template = (title: string, icon: string, value?: string) =>
  `<span title="${title}" class="attribut"><i class="${icon}"></i>${
    value !== undefined ? " " + value : ""
  }</span>`;

export const attributes: Attribute<{}>[] = [
  {
    check: tags =>
      (!!tags.internet_access &&
        tags.internet_access !== "no" &&
        tags["internet_access:fee"] !== "customers" &&
        tags["internet_access:fee"] !== "yes") ||
      (!!tags.wifi && tags.wifi !== "no"),
    template: local => template(local.internet, "fas fa-wifi")
  },
  {
    check: tags => !!tags["piste:difficulty"],
    template: (local, tags) =>
      template(
        local.difficulty,
        "fas fa-exclamation-circle",
        (local["piste:difficulty"] as any)[tags["piste:difficulty"]]
      )
  },
  {
    check: tags =>
      tags["bottle"] === "yes" || tags["drinking_water:refill"] === "yes",
    template: local => template(local.bottle, "fas fa-wine-bottle")
  },
  {
    check: (tags, value) => !!tags.capacity && value === "book-exchange",
    template: (local, tags) =>
      template(local.capacity, "fas fa-book", tags.capacity)
  },
  {
    check: tags =>
      tags["amenity"] === "drinking_water" ||
      tags["amenity"] === "water_point" ||
      tags["drinking_water"] === "yes" ||
      tags["drinking_water:refill"] === "yes",
    template: local => template(local.water, "fas fa-tint")
  },
  {
    check: tags =>
      tags["service:bicycle:pump"] === "yes" ||
      tags["amenity"] === "compressed_air" ||
      tags["compressed_air"] === "yes",
    template: local => template(local.pump, "fas fa-tachometer-alt")
  },
  {
    check: tags =>
      tags.leisure === "playground" ||
      !!tags.playground ||
      tags.swimming_pool === "paddling_pool" ||
      tags.swimming_pool === "kids" ||
      tags.swimming_pool === "wading" ||
      tags.swimming_pool === "children's_pool" ||
      tags.children === "designated" ||
      tags.children === "yes" ||
      (tags.kids_area === "yes" && tags["kids_area:fee"] !== "yes"),
    template: local => template(local.playground, "fas fa-child")
  },
  {
    check: tags =>
      (!!tags.changing_table &&
        tags.changing_table !== "no" &&
        tags["changing_table:fee"] !== "yes") ||
      (!!tags.diaper && tags.diaper !== "no" && tags["diaper:fee"] !== "yes") ||
      (!!tags.baby_feeding && tags.baby_feeding !== "no"),
    template: local => template(local.changing_table, "fas fa-baby")
  },
  {
    check: tags =>
      tags["service:bicycle:repair"] === "yes" ||
      tags["bicycle:repair"] === "yes" ||
      tags["service:bicycle:tools"] === "yes" ||
      tags["service:bicycle:diy"] === "yes" ||
      hasPropThatEndsWith(tags, ":repair", "yes"),
    template: local => template(local.tools, "fas fa-tools")
  },
  {
    check: tags =>
      tags["service:bicycle:chain_tool"] === "yes" ||
      tags["service:bicycle:chaintool"] === "yes",
    template: local => template(local.chainTool, "fas fa-link")
  },
  {
    check: tags =>
      tags["service:bicycle:repair"] === "yes" ||
      tags["bicycle:repair"] === "yes" ||
      tags["reuse:bicycles"] === "yes" ||
      tags["recycling:bicycles"] === "yes" ||
      tags["bicycle"] === "yes",
    template: local => template(local.bicycle, "fas fa-bicycle")
  },
  {
    check: tags => tags["car"] === "yes",
    template: local => template(local.car, "fas fa-car-side")
  },
  {
    check: tags =>
      tags["service:clothes:repair"] === "yes" ||
      tags["clothes:repair"] === "yes" ||
      tags["service:fabrik:repair"] === "yes" ||
      tags["fabrik:repair"] === "yes" ||
      tags["reuse:clothes"] === "yes" ||
      tags["recycling:clothes"] === "yes",
    template: local => template(local.clothes, "fas fa-tshirt")
  },
  {
    check: tags =>
      tags["service:mobile_phone:repair"] === "yes" ||
      tags["mobile_phone:repair"] === "yes" ||
      tags["reuse:mobile_phones"] === "yes" ||
      tags["recycling:mobile_phones"] === "yes",
    template: local => template(local.mobile, "fas fa-mobile-alt")
  },
  {
    check: tags =>
      tags["service:small_electronics_device:repair"] === "yes" ||
      tags["small_electronics_device:repair"] === "yes" ||
      tags["service:electronics:repair"] === "yes" ||
      tags["electronics:repair"] === "yes" ||
      tags["recycling:small_electrical_appliances"] === "yes" ||
      tags["recycling:small_appliances"] === "yes" ||
      tags["recycling:electrical_items"] === "yes" ||
      tags["recycling:electrical_appliances"] === "yes" ||
      tags["recycling:electronic"] === "yes" ||
      tags["recycling:electronics"] === "yes" ||
      tags["reuse:small_electrical_appliances"] === "yes" ||
      tags["reuse:small_appliances"] === "yes" ||
      tags["reuse:electrical_items"] === "yes" ||
      tags["reuse:electrical_appliances"] === "yes" ||
      tags["reuse:electronics"] === "yes" ||
      tags["reuse:electronic"] === "yes",
    template: local => template(local.electronics, "fas fa-plug")
  },
  {
    check: tags =>
      tags["service:furniture:repair"] === "yes" ||
      tags["furniture:repair"] === "yes" ||
      tags["reuse:furniture"] === "yes" ||
      tags["recycling:furniture"] === "yes",
    template: local => template(local.furniture, "fas fa-chair")
  },
  {
    check: tags =>
      tags["service:computer:repair"] === "yes" ||
      tags["computer:repair"] === "yes" ||
      tags["reuse:computers"] === "yes" ||
      tags["recycling:computers"] === "yes",
    template: local => template(local.computer, "fas fa-laptop")
  },
  {
    check: tags =>
      tags["service:toy:repair"] === "yes" ||
      tags["toy:repair"] === "yes" ||
      tags["reuse:toys"] === "yes" ||
      tags["recycling:toys"] === "yes",
    template: local => template(local.toy, "fas fa-horse")
  },
  {
    check: tags => hasPropThatStartsWith(tags, "recycling:", "yes"),
    template: local => template(local.freeToGive, "fas fa-long-arrow-alt-right")
  },
  {
    check: tags => tags["reuse:policy"] === "free_to_take",
    template: local => template(local.freeToTake, "fas fa-long-arrow-alt-left")
  },
  {
    check: tags =>
      tags["reuse:policy"] === "free_to_take_or_give" ||
      (!tags["reuse:policy"] &&
        (tags["amenity"] === "reuse" ||
          hasPropThatStartsWith(tags, "reuse:", "yes"))),
    template: local => template(local.freeToTakeOrGive, "fas fa-exchange-alt")
  },
  {
    check: tags =>
      (tags.amenity === "library" && tags.library !== "booksharing") ||
      tags.amenity === "toy_library" ||
      tags.amenity === "bicycle_rental",
    template: local => template(local.borrow, "fas fa-redo-alt")
  },
  {
    check: tags => tags.sport === "bmx" || tags.sport === "cycling",
    template: local => template(local.park, "fas fa-infinity")
  },
  {
    check: tags => tags.amenity === "charging_station",
    template: local => template(local.charging, "fas fa-charging-station")
  },
  {
    check: tags => tags.amenity === "device_charging_station",
    template: local => template(local.mobileCharging, "fas fa-battery-full")
  },
  {
    check: tags => !!tags.hoops,
    template: (local, tags) =>
      `<span title="${local.hoops}" class="attribut"><img style="height: 13px;vertical-align: text-top;" src="/lib/maki-icons/basketball-15.svg"> ${tags.hoops}</span>`
  },
  {
    check: tags => tags.female === "yes" || tags.unisex === "yes",
    template: local => template(local.female, "fas fa-female")
  },
  {
    check: tags => tags.male === "yes" || tags.unisex === "yes",
    template: local => template(local.male, "fas fa-male")
  },
  {
    check: tags =>
      tags.location === "indoor" ||
      tags["public_bookcase:type"] === "building" ||
      !!(tags.indoor && tags.indoor !== "no") ||
      !!(tags.building && tags.building !== "no"),
    template: local => template(local.indoor, "far fa-building")
  },
  {
    check: tags =>
      (!!tags.covered && tags.covered !== "no") || tags.amenity === "shelter",
    template: local => template(local.covered, "fas fa-chevron-up")
  },
  {
    check: tags => tags.lit === "yes",
    template: local => template(local.light, "far fa-lightbulb")
  },
  {
    check: tags =>
      /horizontal_bar/.test(tags["fitness_station"]) ||
      tags["fitness_station:horizontal_bar"] === "yes" ||
      /horizontal_bar/.test(tags["playground"]) ||
      tags["playground:horizontal_bar"] === "yes",
    template: local => template(local.horizontalBar, "fas fa-minus")
  },
  {
    check: tags =>
      /parallel_bars/.test(tags["fitness_station"]) ||
      tags["fitness_station:parallel_bars"] === "yes",
    template: local =>
      template(local.parallelBars, "fas fa-grip-lines-vertical")
  },
  {
    check: tags =>
      /rings/.test(tags["fitness_station"]) ||
      tags["fitness_station:rings"] === "yes",
    template: local => template(local.rings, "far fa-circle")
  },
  {
    check: tags =>
      /elliptical_trainer|air_walker|exercise_bike|rower/.test(
        tags["fitness_station"]
      ) ||
      tags["fitness_station:elliptical_trainer"] === "yes" ||
      tags["fitness_station:air_walker"] === "yes" ||
      tags["fitness_station:exercise_bike"] === "yes" ||
      tags["fitness_station:rower"] === "yes" ||
      /exercise/.test(tags["playground"]) ||
      tags["playground:exercise"] === "yes",
    template: local => template(local.exerciseMachine, "fas fa-biking")
  },
  {
    check: tags =>
      /slackline|balance(_)?beam/.test(tags["fitness_station"]) ||
      tags["fitness_station:slackline"] === "yes" ||
      tags["fitness_station:balance_beam"] === "yes" ||
      tags["fitness_station:balancebeam"] === "yes" ||
      /slackline|balance(_)?beam/.test(tags["playground"]) ||
      tags["playground:slackline"] === "yes" ||
      tags["playground:balance_beam"] === "yes" ||
      tags["playground:balancebeam"] === "yes",
    template: local => template(local.balance, "fas fa-street-view")
  },
  {
    check: tags => !!wheelchairAccesIcon(tags),
    template: (local, tags) =>
      `<span title="${wheelchairAccesText(
        tags,
        local
      )}" class="attribut"><i class="fab fa-accessible-icon"></i> <i class="fas fa-${wheelchairAccesIcon(
        tags
      )}" style="color: ${wheelchairAccesColor(tags)};"></i></span>`
  }
];

function wheelchairAccesText(tags: { wheelchair: string }, local: any) {
  switch (tags.wheelchair) {
    case "yes":
    case "designated":
      return local.wheelchairYes;
    case "limited":
      return local.wheelchairLimited;
    case "no":
      return local.wheelchairNo;
    default:
      // do not display for others values or undefined
      return "";
  }
}

function wheelchairAccesColor(tags: { wheelchair: string }) {
  switch (tags.wheelchair) {
    case "yes":
    case "designated":
      return "green";
    case "limited":
      return "orange";
    case "no":
      return "red";
    default:
      // do not display for others values or undefined
      return "black";
  }
}

function wheelchairAccesIcon(tags: { wheelchair: string }) {
  switch (tags.wheelchair) {
    case "yes":
    case "designated":
      return "check-circle";
    case "limited":
      return "exclamation-circle";
    case "no":
      return "times-circle";
    default:
      // do not display icon for others values or undefined
      return undefined;
  }
}

function hasPropThatStartsWith(tags: any, name: string, value: string) {
  for (const tag in tags) {
    if (
      tags.hasOwnProperty(tag) &&
      tag.toUpperCase().startsWith(name.toUpperCase()) &&
      tags[tag] === value
    ) {
      return true;
    }
  }
  return false;
}

function hasPropThatEndsWith(tags: any, name: string, value: string) {
  for (const tag in tags) {
    if (
      tags.hasOwnProperty(tag) &&
      tag.toUpperCase().endsWith(name.toUpperCase()) &&
      tags[tag] === value
    ) {
      return true;
    }
  }
  return false;
}
