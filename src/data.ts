import { toWikimediaCommonsUrl, toMapillaryUrl } from "./utilities/image";
import { toUrl } from "./utilities/url";

export function extractName(tags: any, langCode: string) {
  return (
    tags[`name:${langCode}`] ||
    tags[`short_name:${langCode}`] ||
    tags[`official_name:${langCode}`] ||
    tags[`int_name:${langCode}`] ||
    tags[`nat_name:${langCode}`] ||
    tags[`reg_name:${langCode}`] ||
    tags[`loc_name:${langCode}`] ||
    tags[`old_name:${langCode}`] ||
    tags[`alt_name:${langCode}`] ||
    tags.name ||
    tags.short_name ||
    tags.official_name ||
    tags.int_name ||
    tags.nat_name ||
    tags.reg_name ||
    tags.loc_name ||
    tags.old_name ||
    tags.alt_name
  );
}

export function extractType(local: any, tags: any, value: string) {
  return (
    local["public_bookcase:type"][tags["public_bookcase:type"]] ||
    local["garden:type"][tags["garden:type"]] ||
    local["garden:style"][tags["garden:style"]] ||
    local["castle_type"][tags["castle_type"]] ||
    local["historic"][tags["historic"]] ||
    local["fitness_station"][tags["fitness_station"]] ||
    local["site_type"][tags["site_type"]] ||
    tags["species:" + (local.code || "en")] ||
    tags.species ||
    tags["genus:" + (local.code || "en")] ||
    tags.genus ||
    tags.protection_title ||
    local.boules[tags.boules] ||
    local.sport[tags.sport] ||
    local.amenity[tags.amenity] ||
    local.leisure[tags.leisure] ||
    local.man_made[tags.man_made] ||
    local.landuse[tags.landuse] ||
    local.natural[tags.natural] ||
    local.type[value].name
  );
}

export function extractOperator(tags: any) {
  return (
    tags.operator || tags["heritage:operator"] || tags.brand || tags.network
  );
}

export function extractImage(tags: any): string | undefined {
  return (
    toWikimediaCommonsUrl(tags.wikimedia_commons) ||
    toMapillaryUrl(tags.mapillary) ||
    toUrl(tags.flickr) ||
    toWikimediaCommonsUrl(tags.image) ||
    toUrl(tags.picture) ||
    toUrl(tags["website:webcam"]) ||
    toUrl(tags["webcam"]) ||
    toUrl(tags["contact:webcam"]) ||
    toUrl(tags["webcam:url"]) ||
    toUrl(tags["url:webcam"])
  );
}

export function extractLocality(address: any): any {
  return (
    address.city ||
    address.town ||
    address.village ||
    address.suburb ||
    address.neighbourhood ||
    address.state ||
    address.county
  );
}

export function extractStreet(result: any, local: { code: string }): any {
  return (
    result.address.path ||
    result.address.footway ||
    result.address.road ||
    result.address.cycleway ||
    result.address.pedestrian ||
    result.address.farmyard ||
    result.address.construction ||
    extractName(result.namedetails, local.code || "en") ||
    result.address.neighbourhood
  );
}
