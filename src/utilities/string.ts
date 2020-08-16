export function equalsIgnoreCase(
  s1: string | undefined,
  s2: string | undefined
) {
  return (s1 || "").toUpperCase() === (s2 || "").toUpperCase();
}

export function startsWithIgnoreCase(
  s: string,
  searchString: string,
  position?: number
) {
  return s.toUpperCase().startsWith(searchString.toUpperCase(), position);
}

export function findClosingBracketIndex(str: string, pos: number) {
  if (str[pos] !== "{") {
    throw new Error("The position must contain an opening bracket");
  }
  let level = 1;
  for (let index = pos + 1; index < str.length; index++) {
    if (str[index] === "{") {
      level++;
    } else if (str[index] === "}") {
      level--;
    }

    if (level === 0) {
      return index;
    }
  }
  return -1;
}
