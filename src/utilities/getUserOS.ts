// See: https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-details-using-javascript/73619300#73619300
function get_platform() {
  // 2022 way of detecting. Note : this userAgentData feature is available only in secure contexts (HTTPS)
  if (
    typeof (navigator as any).userAgentData !== "undefined" &&
    (navigator as any).userAgentData != null
  ) {
    return (navigator as any).userAgentData.platform;
  }
  // Deprecated but still works for most of the browser
  if (typeof navigator.platform !== "undefined") {
    if (
      typeof navigator.userAgent !== "undefined" &&
      /android/.test(navigator.userAgent.toLowerCase())
    ) {
      // android device’s navigator.platform is often set as 'linux', so let’s use userAgent for them
      return "android";
    }
    return navigator.platform;
  }
  return "unknown";
}

let platform = get_platform();

// examples of use
let isOSX = /mac/.test(platform.toLowerCase()); // Mac desktop
let isIOS = ["iphone", "ipad", "ipod"].indexOf(platform.toLowerCase()) !== -1; // Mac iOs
let isWindows = /win/.test(platform.toLowerCase()); // Windows
let isAndroid = /android/.test(platform.toLowerCase()); // Android
let isLinux = /linux/.test(platform.toLowerCase()); // Linux

export function getUserOS() {
  if (isOSX) {
    return "Mac OS";
  } else if (isIOS) {
    return "iOS";
  } else if (isWindows) {
    return "Windows";
  } else if (isAndroid) {
    return "Android";
  } else if (isLinux) {
    return "Linux";
  }
}
