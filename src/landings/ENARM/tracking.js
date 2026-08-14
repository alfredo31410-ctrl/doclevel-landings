const ATTRIBUTION_STORAGE_KEY = "enarm:attribution";
const PENDING_ATTEMPT_STORAGE_KEY = "enarm:pending-attempt";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "adset_id",
  "ad_id",
  "placement",
  "fbclid",
];

let lastTrackedPage = null;
const trackedEvents = new Set();

export function trackMetaEvent(eventName, parameters = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, parameters);
  }
}

export function trackMetaEventOnce(eventName, dedupeKey, parameters = {}) {
  if (
    typeof window === "undefined" ||
    typeof window.fbq !== "function"
  ) {
    return false;
  }

  const key = `${eventName}:${dedupeKey}`;

  if (trackedEvents.has(key)) return false;

  try {
    if (window.sessionStorage.getItem(`meta_pixel:${key}`)) return false;

    window.sessionStorage.setItem(`meta_pixel:${key}`, "1");
  } catch {
    // Tracking must never block the registration flow.
  }

  trackedEvents.add(key);
  trackMetaEvent(eventName, parameters);
  return true;
}

export function trackMetaCustomEventOnce(eventName, dedupeKey, parameters = {}) {
  if (
    typeof window === "undefined" ||
    typeof window.fbq !== "function"
  ) {
    return false;
  }

  const key = `custom:${eventName}:${dedupeKey}`;

  if (trackedEvents.has(key)) return false;

  try {
    if (window.sessionStorage.getItem(`meta_pixel:${key}`)) return false;

    window.sessionStorage.setItem(`meta_pixel:${key}`, "1");
  } catch {
    // Tracking must never block the WhatsApp handoff.
  }

  trackedEvents.add(key);
  window.fbq("trackCustom", eventName, parameters);
  return true;
}

const SPRINT_CHECKOUT_BASE_URL = "https://pay.hotmart.com/F107052904P?off=n0xyh3i0&checkoutMode=10";

export function getEnarmSprintCheckoutUrl() {
  const url = new URL(SPRINT_CHECKOUT_BASE_URL);
  const attribution = getEnarmAttribution();
  const allowedKeys = [...UTM_KEYS, "landing", "producto"];

  for (const key of allowedKeys) {
    const value = key === "landing" ? "enarm-sprint" : key === "producto" ? "sprint-enarm-2026" : attribution[key];
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
}

export function trackEnarmSprintCheckoutClick() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "CheckoutButtonClick", {
      content_name: "Sprint ENARM 2026",
      value: 1987,
      currency: "MXN",
    });
  }
}

export function trackRoutePageView(routePath) {
  if (lastTrackedPage === routePath) return;

  lastTrackedPage = routePath;
  trackMetaEvent("PageView");

  if (routePath === "/enarm") {
    trackMetaEvent("ViewContent", {
      content_name: "Clase gratis ENARM 2026",
      content_category: "Captación ENARM 2026",
    });
  }

  if (routePath === "/enarm/sprint") {
    trackMetaEventOnce("ViewContent", "enarm-sprint", {
      content_name: "Sprint ENARM 2026",
      content_category: "Venta directa ENARM 2026",
      value: 1987,
      currency: "MXN",
    });
  }
}

export function captureEnarmAttribution(search = "") {
  const params = new URLSearchParams(search);
  let stored = {};

  try {
    stored = JSON.parse(
      window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}"
    );
  } catch {
    stored = {};
  }

  const next = { ...stored };

  for (const key of UTM_KEYS) {
    const value = params.get(key);

    if (value) next[key] = value;
  }

  next.landing_slug = "enarm";

  try {
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(next)
    );
  } catch {
    // Attribution is helpful but must not block the page.
  }

  return next;
}

export function getEnarmAttribution() {
  try {
    return JSON.parse(
      window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}

export function getEnarmAttributionQuery(extra = {}) {
  const values = { ...getEnarmAttribution(), ...extra };
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(values)) {
    if (value) query.set(key, value);
  }

  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
}

export function savePendingEnarmAttempt() {
  const id = crypto.randomUUID();
  const attempt = {
    id,
    createdAt: Date.now(),
    consumed: false,
  };

  try {
    window.sessionStorage.setItem(
      PENDING_ATTEMPT_STORAGE_KEY,
      JSON.stringify(attempt)
    );
  } catch {
    return null;
  }

  return attempt;
}

export function getPendingEnarmAttempt() {
  try {
    const raw = window.sessionStorage.getItem(PENDING_ATTEMPT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function consumePendingEnarmCompleteRegistration() {
  const attempt = getPendingEnarmAttempt();

  if (
    !attempt ||
    attempt.consumed ||
    !attempt.id ||
    Date.now() - attempt.createdAt > 15 * 60 * 1000
  ) {
    return false;
  }

  const tracked = trackMetaEventOnce("CompleteRegistration", attempt.id);

  if (!tracked) return false;

  try {
    window.sessionStorage.setItem(
      PENDING_ATTEMPT_STORAGE_KEY,
      JSON.stringify({ ...attempt, consumed: true })
    );
  } catch {
    // The pixel dedupe key still prevents a second event.
  }

  return true;
}

export function isFreshPendingEnarmAttempt() {
  const attempt = getPendingEnarmAttempt();

  return Boolean(
    attempt &&
      !attempt.consumed &&
      attempt.id &&
      Date.now() - attempt.createdAt <= 15 * 60 * 1000
  );
}
