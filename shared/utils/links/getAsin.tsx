export function getAsin(asin: string | undefined) {
  if (!asin) {
    return undefined;
  }

  return `https://www.amazon.com/dp/${asin}`;
}
