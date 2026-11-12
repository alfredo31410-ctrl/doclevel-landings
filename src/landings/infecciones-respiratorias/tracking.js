import { trackMetaEventOnce } from "../../utils/tracking";
import { infeccionesRespiratoriasConfig } from "./config";

const trackingKey = infeccionesRespiratoriasConfig.slug;
const attributionKey = `${trackingKey}:attribution`;
const attributionFields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campaign_id", "adset_id", "ad_id", "placement", "fbclid", "gclid"];

export function captureRespiratoryAttribution(search = "") {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  let attribution = {};
  try { attribution = JSON.parse(window.sessionStorage.getItem(attributionKey) || "{}"); } catch { attribution = {}; }
  attributionFields.forEach((field) => { const value = params.get(field); if (value) attribution[field] = value; });
  attribution.landing_slug = trackingKey;
  try { window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution)); } catch { /* Tracking must not block registration. */ }
}

function getAttribution() {
  try { return JSON.parse(window.sessionStorage.getItem(attributionKey) || "{}"); } catch { return {}; }
}

export function trackRespiratoryLead() {
  return trackMetaEventOnce("Lead", `${trackingKey}:completed`, {
    content_name: infeccionesRespiratoriasConfig.title,
    content_category: "Clase gratuita de pediatría",
    status: "completed",
    ...getAttribution(),
  });
}

export function trackRespiratoryWhatsAppJoin() {
  return trackMetaEventOnce("Contact", `${trackingKey}:whatsapp`, {
    content_name: "Ingreso al grupo de WhatsApp",
    ...getAttribution(),
  });
}
