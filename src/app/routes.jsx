import { NotFoundLanding } from "../components/landing/NotFoundLanding";
import AgenteIaDoctoresPage from "../landings/agente-ia-doctores/page";
import AbcConsultaPediatricaPage from "../landings/abc-consulta-pediatrica/SalesLanding";
import EbookNaceUnBebePage from "../landings/ebook-nace-un-bebe/page";
import EnarmPage from "../landings/ENARM/page";
import EnarmGraciasPage from "../landings/ENARM/gracias/page";
import EnarmSprintPage from "../landings/ENARM/sprint/page";
import EnarmWhatsAppPage from "../landings/ENARM/unirse-whatsapp/page";
import LasPrimerasHorasPage from "../landings/las-primeras-hrs-de-tu-bebe/page";
import LasPrimerasHorasGraciasPage from "../landings/las-primeras-hrs-de-tu-bebe/gracias/page";
import MedicosDocentesPage from "../landings/medicos-docentes/page";
import PrimerMesBebePage from "../landings/primer-mes-bebe-mx/page";

function normalizePath(pathname) {
  const normalized = pathname.toLowerCase().replace(/\/+$/, "");

  return normalized || "/";
}

const routes = new Map();

function register(paths, page, options = {}) {
  paths.forEach((path) => {
    routes.set(path, {
      page,
      trackingPath: path.replace(/^\/landings/, "") || "/",
      captureEnarmAttribution: false,
      ...options,
    });
  });
}

register(
  ["/", "/landings/las-primeras-hrs-de-tu-bebe"],
  LasPrimerasHorasPage
);
register(
  ["/landings/las-primeras-hrs-de-tu-bebe/gracias"],
  LasPrimerasHorasGraciasPage
);

register(
  ["/enarm", "/enarm-2026", "/landings/enarm", "/landings/enarm-2026"],
  EnarmPage,
  { captureEnarmAttribution: true }
);
register(
  [
    "/enarm/gracias",
    "/enarm-2026/gracias",
    "/landings/enarm/gracias",
    "/landings/enarm-2026/gracias",
  ],
  EnarmGraciasPage
);
register(
  ["/enarm/sprint", "/landings/enarm/sprint"],
  EnarmSprintPage,
  { captureEnarmAttribution: true }
);
register(
  ["/enarm/unirse-whatsapp", "/landings/enarm/unirse-whatsapp"],
  EnarmWhatsAppPage
);

register(
  ["/medicos-docentes", "/landings/medicos-docentes"],
  MedicosDocentesPage
);
register(["/landings/primer-mes-bebe-mx"], PrimerMesBebePage);
register(["/landings/ebook-nace-un-bebe"], EbookNaceUnBebePage);
register(["/landings/agente-ia-doctores"], AgenteIaDoctoresPage);
register(["/landings/abc-consulta-pediatrica"], AbcConsultaPediatricaPage);

export function resolveRoute(pathname) {
  const path = normalizePath(pathname);
  const route = routes.get(path);

  if (route) return route;

  if (
    path.startsWith("/medicos-docentes/") ||
    path.startsWith("/landings/medicos-docentes/")
  ) {
    return {
      page: MedicosDocentesPage,
      trackingPath: "/medicos-docentes",
      captureEnarmAttribution: false,
    };
  }

  return {
    page: NotFoundLanding,
    trackingPath: path.replace(/^\/landings/, "") || "/",
    captureEnarmAttribution: false,
  };
}
