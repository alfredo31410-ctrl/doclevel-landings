import { primerMesBebeMx } from "./primer-mes-bebe-mx/config";
import { ebookNaceUnBebe } from "./ebook-nace-un-bebe/config";
import { agenteIaDoctores } from "./agente-ia-doctores/config";

export const landings = [
  primerMesBebeMx,
  ebookNaceUnBebe,
  agenteIaDoctores,
];

export function getLandingBySlug(slug) {
  return landings.find((landing) => landing.slug === slug) || null;
}
