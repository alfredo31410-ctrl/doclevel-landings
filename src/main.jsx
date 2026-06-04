import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Info, MessageCircle, Play, Search, X } from "lucide-react";
import "./styles.css";

const whatsappGroupUrl =
  import.meta.env.VITE_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/REEMPLAZAR_ENLACE";
const landingBasePath = "/papa-primerizo";
const heroImageUrl =
  "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=1600&q=80";

function getLandingHomePath() {
  return window.location.pathname.toLowerCase().startsWith(landingBasePath)
    ? landingBasePath
    : "/";
}

function getLandingThanksPath() {
  return `${getLandingHomePath().replace(/\/$/, "")}/gracias`;
}

function ActiveCampaignModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    let hasAttemptedActiveCampaignSubmit = false;
    let hasRedirected = false;

    const existingScript = document.querySelector('script[data-active-campaign-form="227"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://cefincapacitacion.activehosted.com/f/embed.php?id=227";
      script.charset = "utf-8";
      script.async = true;
      script.dataset.activeCampaignForm = "227";
      document.body.appendChild(script);
    }

    const goToThanks = () => {
      if (hasRedirected) return;
      hasRedirected = true;
      window.setTimeout(() => {
        window.location.assign(getLandingThanksPath());
      }, 900);
    };

    const handleClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const wrapper = target.closest("._form_227");
      if (!wrapper) return;
      const submitControl = target.closest('button, input[type="submit"], ._submit');
      if (submitControl) hasAttemptedActiveCampaignSubmit = true;
    };

    const observer = new MutationObserver(() => {
      const formWrapper = document.querySelector("._form_227");
      if (!hasAttemptedActiveCampaignSubmit || !formWrapper) return;

      const successMessage = [...formWrapper.querySelectorAll(
        "._form-thank-you, ._form-thank-you-message, ._form_success"
      )].find((node) => {
        if (!(node instanceof HTMLElement)) return false;
        const text = node.textContent?.trim();
        return Boolean(text) && window.getComputedStyle(node).display !== "none";
      });

      if (successMessage) goToThanks();
    });

    document.addEventListener("click", handleClick, true);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("click", handleClick, true);
      observer.disconnect();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-label="Formulario de registro">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar formulario">
          <X aria-hidden="true" />
        </button>
        <p className="eyebrow">Registro</p>
        <h2>Deja tus datos para recibir el acceso</h2>
        <div className="active-campaign-embed">
          <div className="_form_227"></div>
        </div>
      </section>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-logo" href={getLandingHomePath()} aria-label="DocLevel">
          <img src="/papa-primerizo/doclevel-logo.png" alt="DocLevel" />
        </a>
        <nav className="main-nav" aria-label="Navegacion principal">
          <a href="https://www.doclevelacademy.com/">Inicio</a>
          <a href="https://www.doclevelacademy.com/courses">Cursos</a>
          <a href="https://www.doclevelacademy.com/contact">Contacto</a>
        </nav>
        <div className="header-spacer"></div>
        <a className="search-link" href="https://www.doclevelacademy.com/courses">
          <Search aria-hidden="true" />
          <span>Buscar</span>
        </a>
      </div>
    </header>
  );
}

function RegistrationLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="doclevel-page">
      <Header />
      <section className="hero">
        <img className="hero-bg" src={heroImageUrl} alt="Bebe Seguro, Papas Tranquilos" />
        <div className="hero-shade hero-shade-bottom"></div>
        <div className="hero-shade hero-shade-side"></div>
        <div className="hero-content">
          <div className="hero-copy">
            <div className="course-badge">Curso destacado · Pediatria</div>
            <h1>Bebe Seguro, Papas Tranquilos</h1>
            <p className="hero-lead">
              Guia pediatrica para papas primerizos durante los primeros 12 meses del bebe,
              con acompanamiento medico y pasos claros para vivir esta etapa con mas calma.
            </p>
            <p className="hero-support">
              El registro abre una guia de acompanamiento pensada para ayudarte a entender
              el desarrollo, cuidar cada etapa y distinguir entre lo normal, lo importante y
              lo urgente.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => setIsModalOpen(true)}>
                <Play aria-hidden="true" />
                Registrarme
              </button>
              <a className="secondary-button" href="https://www.doclevelacademy.com/courses">
                <Info aria-hidden="true" />
                Explorar catalogo
              </a>
            </div>
            <div className="hero-meta">
              <span>Formacion medica especializada</span>
              <span>Doctores con experiencia clinica</span>
              <span>Aprendizaje practico y actualizado</span>
            </div>
          </div>
        </div>
      </section>

      <section className="purpose-panel" aria-label="Mensaje importante">
        <div>
          <p className="section-kicker">Mensaje importante</p>
          <h2>Una ruta basica para papas primerizos en el dia de parto y los primeros dias.</h2>
          <p>
            Dejamos esta landing lista para recibir banner, frase y material visual final,
            manteniendo la misma presencia oscura y medica de DocLevel.
          </p>
        </div>
      </section>

      <ActiveCampaignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

function ThanksLanding() {
  return (
    <main className="doclevel-page thanks-page">
      <Header />
      <section className="thanks-shell">
        <p className="course-badge">Falta poco</p>
        <div className="progress-card" aria-label="Progreso del registro">
          <div className="progress-label">
            <span>Proceso de registro</span>
            <strong>80%</strong>
          </div>
          <div className="progress-track">
            <span className="progress-fill"></span>
          </div>
        </div>
        <h1>Ya casi terminas el proceso.</h1>
        <p className="lead">
          El ultimo paso obligatorio es unirte al grupo de WhatsApp. Ahi recibiras los
          avisos, instrucciones y el acceso al material cuando este disponible.
        </p>
        <a className="primary-button whatsapp pulse-button" href={whatsappGroupUrl} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" />
          Unirme al grupo
        </a>
      </section>
    </main>
  );
}

function App() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("gracias")) {
    return <ThanksLanding />;
  }

  return <RegistrationLanding />;
}

createRoot(document.getElementById("root")).render(<App />);
