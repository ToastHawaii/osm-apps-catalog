export function getUserOS() {
  const userAgent = navigator.userAgent;
  const platform =
    (navigator as any).userAgentData?.platform || navigator.platform;

  if (
    ["iphone", "ipad", "ipod"].indexOf(platform.toLowerCase()) !== -1 ||
    (userAgent.match(/Mac/) && navigator.maxTouchPoints)
  ) {
    return "iOS";
  } else if (/mac/.test(platform.toLowerCase())) {
    return "MacOS";
  } else if (/win/.test(platform.toLowerCase())) {
    return "Windows";
  } else if (/android/.test(userAgent.toLowerCase())) {
    return "Android";
  } else if (/linux/.test(platform.toLowerCase())) {
    return "Linux";
  }

  return undefined;
}
