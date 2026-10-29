import { trackMetaEventOnce } from "../../utils/tracking";
import { abcConsultaConfig, registrationTrackingKey } from "./config";

const ATTRIBUTION_STORAGE_KEY = `${registrationTrackingKey}:attribution`;
const COMPLETE_REGISTRATION_EVENT_ID_KEY =
  `${registrationTrackingKey}:complete-registration:event-id`;
const META_PIXEL_ID = "1022353930324591";
const ATTRIBUTION_KEYS = [
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
  "gclid",
];

export function captureAbcAttribution(search = "") {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(search);
  let attribution = {};

  try {
    attribution = JSON.parse(
      window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}"
    );
  } catch {
    attribution = {};
  }

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value;
  });

  attribution.landing_slug = registrationTrackingKey;

  try {
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution)
    );
  } catch {
    // Attribution must never interrupt registration.
  }
}

function getAbcAttribution() {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(
      window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}

function pushDataLayer(event, parameters = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}

function createEventId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getCompleteRegistrationEventId() {
  if (typeof window === "undefined") return createEventId();

  try {
    const storedEventId = window.sessionStorage.getItem(
      COMPLETE_REGISTRATION_EVENT_ID_KEY
    );

    if (storedEventId) return storedEventId;

    const eventId = createEventId();
    window.sessionStorage.setItem(COMPLETE_REGISTRATION_EVENT_ID_KEY, eventId);
    return eventId;
  } catch {
    return createEventId();
  }
}

function registrationParameters(extra = {}) {
  return {
    content_name: abcConsultaConfig.title,
    content_category: "Clase gratuita de pediatría",
    ...getAbcAttribution(),
    ...extra,
  };
}

export function configureAbcMetaPixel() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("set", "autoConfig", false, META_PIXEL_ID);
  }
}

export function trackAbcCompleteRegistration() {
  const parameters = registrationParameters({ status: "completed" });
  const eventId = getCompleteRegistrationEventId();
  const tracked = trackMetaEventOnce(
    "CompleteRegistration",
    registrationTrackingKey,
    parameters,
    { eventID: eventId }
  );

  if (tracked) {
    pushDataLayer("complete_registration", { ...parameters, event_id: eventId });
  }

  return tracked;
}
