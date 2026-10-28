import { trackMetaEventOnce } from "../../utils/tracking";
import { abcConsultaConfig, registrationTrackingKey } from "./config";

const ATTRIBUTION_STORAGE_KEY = `${registrationTrackingKey}:attribution`;
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

function registrationParameters(extra = {}) {
  return {
    content_name: abcConsultaConfig.title,
    content_category: "Clase gratuita de pediatría",
    ...getAbcAttribution(),
    ...extra,
  };
}

export function trackAbcRegistrationView() {
  const parameters = registrationParameters();
  pushDataLayer("view_registration_page", parameters);

  return trackMetaEventOnce(
    "ViewContent",
    `${registrationTrackingKey}:registration`,
    parameters
  );
}

export function trackAbcRegistrationIntent(location = "unknown") {
  const parameters = registrationParameters({ cta_location: location });
  pushDataLayer("registration_intent", parameters);

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "RegistrationIntent", parameters);
  }
}

export function trackAbcCompleteRegistration() {
  const parameters = registrationParameters({ status: "completed" });
  const tracked = trackMetaEventOnce(
    "CompleteRegistration",
    registrationTrackingKey,
    parameters
  );

  if (tracked) pushDataLayer("complete_registration", parameters);
  return tracked;
}

export function trackAbcWhatsAppContact() {
  const parameters = registrationParameters({
    content_name: `${abcConsultaConfig.title} · Grupo de WhatsApp`,
    channel: "whatsapp",
  });
  const tracked = trackMetaEventOnce(
    "Contact",
    `${registrationTrackingKey}:whatsapp`,
    parameters
  );

  if (tracked) pushDataLayer("join_whatsapp_group", parameters);
  return tracked;
}
