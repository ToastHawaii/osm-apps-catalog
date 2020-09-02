export function include<T>(arr: T[], target: T[]) {
  return target.every(v => arr.includes(v));
}

export function removeDuplicates<T>(arr: T[]) {
  return arr.filter((c, index) => {
    return arr.indexOf(c) === index;
  });
}

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
