import { trackMetaEventOnce } from "../../utils/tracking";
import { infeccionesRespiratoriasConfig } from "./config";

const trackingKey = infeccionesRespiratoriasConfig.slug;
const attributionKey = `${trackingKey}:attribution`;
const leadEventIdKey = `${trackingKey}:lead:event-id`;
const metaPixelId = "1022353930324591";
const attributionFields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campaign_id", "adset_id", "ad_id", "placement", "fbclid", "gclid"];

export function captureRespiratoryAttribution(search = "") {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  let attribution = {};
  try { attribution = JSON.parse(window.sessionStorage.getItem(attributionKey) || "{}"); } catch { attribution = {}; }
  attributionFields.forEach((field) => { const value = params.get(field); if (value) attribution[field] = value; });
  attribution.landing_slug = trackingKey;
  try { window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution)); } catch { /* Attribution must never block registration. */ }
}

function getAttribution() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.sessionStorage.getItem(attributionKey) || "{}"); } catch { return {}; }
}

function pushDataLayer(event, parameters = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}

function createEventId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getLeadEventId() {
  if (typeof window === "undefined") return createEventId();
  try {
    const storedEventId = window.sessionStorage.getItem(leadEventIdKey);
    if (storedEventId) return storedEventId;
    const eventId = createEventId();
    window.sessionStorage.setItem(leadEventIdKey, eventId);
    return eventId;
  } catch {
    return createEventId();
  }
}

function leadParameters(extra = {}) {
  return { content_name: infeccionesRespiratoriasConfig.title, content_category: "Clase gratuita de pediatría", ...getAttribution(), ...extra };
}

export function configureRespiratoryMetaPixel() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq("set", "autoConfig", false, metaPixelId);
}

export function trackRespiratoryLead() {
  const parameters = leadParameters({ status: "completed" });
  const eventId = getLeadEventId();
  const tracked = trackMetaEventOnce("Lead", trackingKey, parameters, { eventID: eventId });
  if (tracked) pushDataLayer("lead", { ...parameters, event_id: eventId });
  return tracked;
}

export function trackRespiratoryWhatsAppJoin() {
  const parameters = leadParameters({ content_name: "Ingreso al grupo de WhatsApp" });
  const tracked = trackMetaEventOnce("Contact", `${trackingKey}:whatsapp`, parameters);
  if (tracked) pushDataLayer("join_whatsapp_group", parameters);
  return tracked;
}
