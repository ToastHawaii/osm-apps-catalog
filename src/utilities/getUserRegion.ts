import latest from "moment-timezone/data/meta/latest.json";

export function getUserRegion() {
  const timeZoneCityToCountry: { [city: string]: string } = {};

  Object.keys(latest.zones).forEach((zone) => {
    const zoneSplitted = zone.split("/");
    const city = zoneSplitted[zoneSplitted.length - 1];
    timeZoneCityToCountry[city] = [
      ...zoneSplitted.slice(0, -1),
      (latest.countries as any)[(latest.zones as any)[zone].countries[0]].name,
    ].join(", ");
  });

  if (Intl) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var tzArr = userTimeZone.split("/");
    const userCity = tzArr[tzArr.length - 1];
    return timeZoneCityToCountry[userCity];
  }

  return undefined;
}
