import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";
import "./styles.css";

import doclevelLogoMedicos from "./assets/medicos-docentes/doclevel-logo.png";
import equipoMedicoGracias from "./assets/medicos-docentes/equipo-medico-gracias.png";

const whatsappGroupUrl =
  import.meta.env.VITE_WHATSAPP_GROUP_URL ||
  "https://chat.whatsapp.com/C6A7e7xUM1EFtiMSWctmIH";

const medicosDocentesWhatsappUrl =
  import.meta.env.VITE_MEDICOS_DOCENTES_WHATSAPP_URL ||
  "https://wa.me/524495075559?text=Hola%2C%20ya%20envi%C3%A9%20mis%20datos%20para%20la%20convocatoria%20de%20m%C3%A9dicos%20docentes%20de%20DocLevel%20y%20quiero%20conocer%20el%20siguiente%20paso.";

const canonicalThanksUrl =
  "https://www.doclevelacademy.com/landings/papa-primerizo/gracias";

function trackMetaEvent(eventName, parameters = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, parameters);
  }
}

function ActiveCampaignModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    let hasAttemptedActiveCampaignSubmit = false;
    let hasRedirected = false;

    const existingScript = document.querySelector(
      'script[data-active-campaign-form="227"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.src =
        "https://cefincapacitacion.activehosted.com/f/embed.php?id=227";
      script.charset = "utf-8";
      script.async = true;
      script.dataset.activeCampaignForm = "227";

      document.body.appendChild(script);
    }

    const goToThanks = () => {
      if (hasRedirected) return;

      hasRedirected = true;

      window.setTimeout(() => {
        window.location.assign(canonicalThanksUrl);
      }, 900);
    };

    const handleClick = (event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) return;

      const wrapper = target.closest("._form_227");

      if (!wrapper) return;

      const submitControl = target.closest(
        'button, input[type="submit"], ._submit'
      );

      if (submitControl) {
        hasAttemptedActiveCampaignSubmit = true;
      }
    };

    const observer = new MutationObserver(() => {
      const formWrapper = document.querySelector("._form_227");

      if (!hasAttemptedActiveCampaignSubmit || !formWrapper) return;

      const successMessage = [
        ...formWrapper.querySelectorAll(
          "._form-thank-you, ._form-thank-you-message, ._form_success"
        ),
      ].find((node) => {
        if (!(node instanceof HTMLElement)) return false;

        const text = node.textContent?.trim();

        return Boolean(text) && window.getComputedStyle(node).display !== "none";
      });

      if (!successMessage) return;

      trackMetaEvent("CompleteRegistration", {
        content_name: "Registro papá primerizo",
      });

      goToThanks();
    });

    document.addEventListener("click", handleClick, true);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("click", handleClick, true);
      observer.disconnect();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Formulario de registro"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          <X aria-hidden="true" />
        </button>

        <p className="eyebrow">Registro</p>
        <h2>Deja tus datos para recibir el acceso</h2>

        <div className="active-campaign-embed">
          <div className="_form_227" />
        </div>
      </section>
    </div>
  );
}

function LogoExit({
  logoSrc = "/landings/papa-primerizo/doclevel-logo.png",
  ariaLabel = "Volver al sitio principal de DocLevel",
}) {
  return (
    <a
      className="logo-exit"
      href="https://www.doclevelacademy.com/"
      aria-label={ariaLabel}
    >
      <img src={logoSrc} alt="DocLevel" />
    </a>
  );
}

function PersonSlot({
  imageSrc = "/landings/papa-primerizo/doctor-papa-primerizo.png",
  alt = "Doctor del curso",
}) {
  return (
    <div className="person-slot" aria-label={alt}>
      <img src={imageSrc} alt={alt} />
    </div>
  );
}

function RegistrationLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="landing-page register-page">
      <LogoExit />

      <div className="landing-layout">
        <section
          className="headline-block"
          aria-label="Curso para padres primerizos"
        >
          <h1>
            Las primeras
            <span> horas de tu bebé:</span>
            <em>qué es normal, qué debe preocuparte y cómo cuidarlo</em>
          </h1>

          <p className="headline-subtitle">
            Guía práctica para el primer mes de vida de su bebé
          </p>

          <strong>Curso gratuito 100% en línea</strong>

          <small>24 de junio - 12:00 (hora CDMX)</small>
        </section>

        <PersonSlot />

        <section className="cta-panel register-panel" aria-label="Registro">
          <p className="eyebrow">Registro</p>

          <h2>Reserva tu acceso gratuito</h2>

          <p>
            Deja tus datos para recibir la guía y los siguientes pasos del curso.
          </p>

          <button
            className="cta-button register-button"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            <UserPlus aria-hidden="true" />
            Registrarme ahora
          </button>
        </section>
      </div>

      <ActiveCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}

function ThanksLanding() {
  useEffect(() => {
    trackMetaEvent("CompleteRegistration", {
      content_name: "Gracias papá primerizo",
    });
  }, []);

  return (
    <main className="landing-page thanks-page">
      <LogoExit />

      <div className="landing-layout">
        <section
          className="headline-block thanks-headline"
          aria-label="Registro completado"
        >
          <h1>
            Tu registro
            <span> está casi</span>
            <em>completo</em>
          </h1>

          <p className="headline-subtitle">Último paso obligatorio</p>

          <strong>Únete al grupo para recibir el acceso</strong>
        </section>

        <PersonSlot />

        <section className="cta-panel thanks-panel" aria-label="Gracias">
          <p className="eyebrow">Falta poco</p>

          <div className="progress-card" aria-label="Progreso del registro">
            <div className="progress-label">
              <span>Proceso de registro</span>
              <strong>80%</strong>
            </div>

            <div className="progress-track">
              <span className="progress-fill" />
            </div>
          </div>

          <h1>Ya casi terminas el proceso.</h1>

          <p>
            El último paso obligatorio es unirte al grupo de WhatsApp. Ahí
            recibirás avisos, instrucciones y acceso al material cuando esté
            disponible.
          </p>

          <a
            className="cta-button whatsapp-button"
            href={whatsappGroupUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            Unirme al grupo
          </a>
        </section>
      </div>
    </main>
  );
}

function MedicosMiniCard({ icon, title, text }) {
  return (
    <article className="medicos-mini-card">
      <div className="medicos-mini-card-icon">{icon}</div>

      <div className="medicos-mini-card-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function MedicosDocentesThanksLanding() {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "Gracias por postularte como médico docente",
      content_category: "Convocatoria médicos docentes",
    });
  }, []);

  const handleWhatsappClick = () => {
    trackMetaEvent("Contact", {
      content_name: "WhatsApp médicos docentes",
      content_category: "Convocatoria médicos docentes",
    });
  };

  return (
    <main className="landing-page thanks-page medicos-thanks-page">
      <LogoExit
        logoSrc={doclevelLogoMedicos}
        ariaLabel="Ir al sitio principal de DocLevel"
      />

      <div className="medicos-thanks-layout">
        <section
          className="medicos-thanks-copy"
          aria-label="Gracias por postularte como médico docente"
        >
          <p className="medicos-thanks-eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Postulación recibida
          </p>

        <h1 className="medicos-title">
  <span className="medicos-title-line">Gracias por</span>

  <span className="medicos-title-line">
    <span className="medicos-title-highlight">postularte</span>
    <span className="medicos-title-connector">para</span>
  </span>

  <span className="medicos-title-line">compartir tu</span>
  <span className="medicos-title-line">experiencia</span>
  <span className="medicos-title-line">con DocLevel</span>
</h1>
          <p className="medicos-thanks-lead">
            Tu información fue recibida correctamente. Nuestro equipo revisará
            tu perfil profesional, especialidad y experiencia para evaluar una
            posible colaboración académica contigo.
          </p>

          <div className="medicos-thanks-badges">
            <span>Perfil recibido</span>
            <span>Proceso activo</span>
            <span>Respuesta del equipo</span>
          </div>

          <div className="medicos-thanks-grid">
            <MedicosMiniCard
              icon={<ClipboardCheck size={18} aria-hidden="true" />}
              title="Información recibida"
              text="Tus datos ya entraron correctamente al proceso de revisión."
            />

            <MedicosMiniCard
              icon={<ShieldCheck size={18} aria-hidden="true" />}
              title="Revisión profesional"
              text="Evaluaremos tu perfil, experiencia y los temas que podrías compartir."
            />

            <MedicosMiniCard
              icon={<CheckCircle2 size={18} aria-hidden="true" />}
              title="Siguiente paso claro"
              text="Si quieres avanzar más rápido, puedes hablar directamente con el equipo."
            />
          </div>
        </section>

        <aside className="medicos-thanks-sidebar">
          <section
            className="medicos-hero-visual medicos-hero-visual-transparent"
            aria-label="Equipo médico de DocLevel"
          >
            <span
              className="medicos-hero-glow glow-1"
              aria-hidden="true"
            />
            <span
              className="medicos-hero-glow glow-2"
              aria-hidden="true"
            />
            <span
              className="medicos-hero-ring ring-1"
              aria-hidden="true"
            />
            <span
              className="medicos-hero-ring ring-2"
              aria-hidden="true"
            />

            <img
              className="medicos-hero-team-image"
              src={equipoMedicoGracias}
              alt="Equipo médico de DocLevel"
            />

            <div className="medicos-hero-visual-badge">
              <span>DocLevel</span>
              <strong>Tu perfil ya está en revisión</strong>
            </div>
          </section>

          <section
            className="cta-panel thanks-panel medicos-thanks-panel"
            aria-label="Siguiente paso"
          >
            <p className="eyebrow">Siguiente paso</p>

            <div className="progress-card" aria-label="Estado de postulación">
              <div className="progress-label">
                <span>Estado de tu postulación</span>
                <strong>Recibida</strong>
              </div>

              <div className="progress-track">
                <span className="progress-fill" />
              </div>
            </div>

            <h2>¿Quieres hablar con el equipo?</h2>

            <p>
              Podemos resolver tus dudas y explicarte qué sigue dentro del
              proceso de selección para médicos docentes de DocLevel.
            </p>

            <a
              className="cta-button whatsapp-button medicos-whatsapp-button"
              href={medicosDocentesWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsappClick}
            >
              <MessageCircle aria-hidden="true" />
              Hablar con el equipo
            </a>

            <small className="medicos-panel-note">
              Atención directa por WhatsApp para dar seguimiento a tu
              postulación.
            </small>
          </section>

          <section
            className="medicos-visual-stack"
            aria-label="Proceso de seguimiento"
          >
            <article className="medicos-step-card step-card-1">
              <span className="medicos-step-number">01</span>
              <h3>Perfil recibido</h3>
              <p>Tu postulación ya fue enviada correctamente.</p>
            </article>

            <article className="medicos-step-card step-card-2">
              <span className="medicos-step-number">02</span>
              <h3>Revisión del equipo</h3>
              <p>
                Validamos experiencia, especialidad y compatibilidad académica.
              </p>
            </article>

            <article className="medicos-step-card step-card-3">
              <span className="medicos-step-number">03</span>
              <h3>Seguimiento directo</h3>
              <p>
                Si lo deseas, puedes escribirnos ahora mismo para continuar el
                proceso.
              </p>
            </article>
          </section>
        </aside>
      </div>
    </main>
  );
}
function App() {
  const path = window.location.pathname.toLowerCase();

  if (
    path === "/medicos-docentes" ||
    path.startsWith("/medicos-docentes/") ||
    path.startsWith("/landings/medicos-docentes")
  ) {
    return <MedicosDocentesThanksLanding />;
  }

  if (path.startsWith("/landings/papa-primerizo/gracias")) {
    return <ThanksLanding />;
  }

  return <RegistrationLanding />;
}
createRoot(document.getElementById("root")).render(<App />);