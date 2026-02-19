export function includes<T>(arr: T[], target: T[]) {
  return target.every((v) => arr.includes(v));
}
export function some<T>(arr: T[], target: T[]) {
  return target.some((v) => arr.includes(v));
}

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
