export const isDevelopment =
  typeof window !== "undefined" && window.location.host.startsWith("localhost");
