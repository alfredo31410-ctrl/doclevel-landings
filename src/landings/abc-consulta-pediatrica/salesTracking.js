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
    // Attribution must never interrupt the sales flow.
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

function salesParameters(extra = {}) {
  return {
    content_name: abcConsultaConfig.title,
    content_category: "Venta directa por WhatsApp",
    ...getAbcAttribution(),
    ...extra,
  };
}

export function trackAbcSalesView() {
  const parameters = salesParameters();
  pushDataLayer("view_sales_page", parameters);
  return trackMetaEventOnce(
    "ViewContent",
    `${registrationTrackingKey}:sales`,
    parameters
  );
}

export function trackAbcWhatsAppSalesIntent(location = "unknown") {
  const parameters = salesParameters({
    cta_location: location,
    channel: "whatsapp",
    sales_assisted: true,
  });

  pushDataLayer("whatsapp_sales_intent", parameters);

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "WhatsAppSalesIntent", parameters);
  }

  return trackMetaEventOnce(
    "Contact",
    `${registrationTrackingKey}:sales:${location}`,
    parameters
  );
}

