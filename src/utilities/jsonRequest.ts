import { utilQsString } from "./url";

export async function getJson(url: string, params: any) {
  const response = await fetch(`${url}?${utilQsString(params)}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  return await response.json();
}
