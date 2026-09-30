import { trackMetaEventOnce } from "../../utils/tracking";
import { landingConfig, registrationTrackingKey } from "./config";

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
];

export function captureRegistrationAttribution(search = "") {
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

  try {
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution)
    );
  } catch {
    // Attribution should never block the landing.
  }
}

function getRegistrationAttribution() {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(
      window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}

export function trackRegistrationView() {
  return trackMetaEventOnce("ViewContent", registrationTrackingKey, {
    content_name: landingConfig.title,
    content_category: "Clase gratuita de pediatría",
    ...getRegistrationAttribution(),
  });
}

export function trackBabyCompleteRegistration() {
  return trackMetaEventOnce("CompleteRegistration", registrationTrackingKey, {
    content_name: landingConfig.title,
    content_category: "Clase gratuita de pediatría",
    status: "completed",
    ...getRegistrationAttribution(),
  });
}

export function trackBabyWhatsAppContact() {
  return trackMetaEventOnce("Contact", `${registrationTrackingKey}:whatsapp`, {
    content_name: `${landingConfig.title} · Grupo de WhatsApp`,
    content_category: "Clase gratuita de pediatría",
    ...getRegistrationAttribution(),
  });
}
