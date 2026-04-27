export function getTelegram(telegram: string | undefined) {
  if (!telegram) {
    return undefined;
  }

  return `https://telegram.me/${telegram}`;
}
