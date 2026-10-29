const trackedMetaEvents = new Set();

export function trackMetaEvent(eventName, parameters = {}, eventOptions = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (Object.keys(eventOptions).length > 0) {
      window.fbq("track", eventName, parameters, eventOptions);
    } else {
      window.fbq("track", eventName, parameters);
    }
    return true;
  }

  return false;
}

export function trackMetaEventOnce(
  eventName,
  dedupeKey,
  parameters = {},
  eventOptions = {}
) {
  if (
    typeof window === "undefined" ||
    typeof window.fbq !== "function"
  ) {
    return false;
  }

  const eventKey = `${eventName}:${dedupeKey}`;

  if (trackedMetaEvents.has(eventKey)) return false;

  try {
    const storageKey = `meta_pixel:${eventKey}`;

    if (window.sessionStorage.getItem(storageKey)) return false;

    window.sessionStorage.setItem(storageKey, "1");
  } catch {
    // Tracking must never prevent the conversion flow.
  }

  trackedMetaEvents.add(eventKey);
  return trackMetaEvent(eventName, parameters, eventOptions);
}

export function getCurrencyFromPrice(price = "") {
  if (price.includes("USD")) return "USD";
  if (price.includes("COP")) return "COP";
  return "MXN";
}
