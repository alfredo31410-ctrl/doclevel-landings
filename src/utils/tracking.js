export function trackMetaEvent(eventName, parameters = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, parameters);
  }
}

export function getCurrencyFromPrice(price = "") {
  if (price.includes("USD")) return "USD";
  if (price.includes("COP")) return "COP";
  return "MXN";
}