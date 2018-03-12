export function parseQueryString(
  url: string
): { [key: string]: string[] | undefined } {
  const queryObject: { [key: string]: string[] | undefined } = {};
  const pairs = url.slice(url.indexOf("?") + 1).split("&");
  for (const pair of pairs) {
    const pairParts = pair.split("=");
    if (pairParts[0] && pairParts[1]) {
      queryObject[pairParts[0]] = pairParts[1].split(",");
    }
  }

  return queryObject;
}
