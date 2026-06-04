import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MessageCircle, UserPlus, X } from "lucide-react";
import "./styles.css";

const whatsappGroupUrl =
  import.meta.env.VITE_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/C6A7e7xUM1EFtiMSWctmIH";
const landingBasePath = "/papa-primerizo";
const canonicalThanksUrl = "https://www.doclevelacademy.com/papa-primerizo/gracias";

function getLandingHomePath() {
  return window.location.pathname.toLowerCase().startsWith(landingBasePath)
    ? landingBasePath
    : "/";
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
        window.location.assign(canonicalThanksUrl);
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

      if (successMessage){
        if (window.fbq) {
          fbq('track', 'CompleteRegistration');
        }
        goToThanks();
      } 
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

function LogoExit() {
  return (
    <a
      className="logo-exit"
      href="https://www.doclevelacademy.com/"
      aria-label="Volver a la pagina principal de DocLevel"
    >
      <img src="/papa-primerizo/doclevel-logo.png" alt="DocLevel" />
    </a>
  );
}

function PersonSlot() {
  return (
    <div className="person-slot" aria-label="Doctor del curso">
      <img src="/papa-primerizo/doctor-papa-primerizo.png" alt="Doctor del curso" />
    </div>
  );
}

function RegistrationLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="landing-page register-page">
      <LogoExit />
      <div className="landing-layout">
        <section className="headline-block" aria-label="Frase principal">
          <h1>
            Las primeras
            <span> horas de tu bebé:</span>
            <em>qué es normal, qué debe preocuparte y cómo cuidarlo</em>
          </h1>
          <p className="headline-subtitle">Guía práctica para el primer mes de vida de su bebé</p>
          <strong>Curso gratuito 100% en linea</strong>
          <small>24 de junio - 12:00 (hora CDMX)</small>
        </section>
        <PersonSlot />
        <section className="cta-panel register-panel" aria-label="Registro">
          <p className="eyebrow">Registro</p>
          <h2>Reserva tu acceso gratuito</h2>
          <p>
            Deja tus datos para recibir la guía y los siguientes pasos del curso.
          </p>
          <button className="cta-button register-button" type="button" onClick={() => setIsModalOpen(true)}>
            <UserPlus aria-hidden="true" />
            Registrarme ahora
          </button>
        </section>
      </div>

      <ActiveCampaignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

function ThanksLanding() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "CompleteRegistration");
    }
  }, []);
  return (
    <main className="landing-page thanks-page">
      <LogoExit />
      <div className="landing-layout">
        <section className="headline-block thanks-headline" aria-label="Frase principal">
          <h1>
            Tu registro
            <span> esta casi</span>
            <em>completo</em>
          </h1>
          <p className="headline-subtitle">Ultimo paso obligatorio</p>
          <strong>Unete al grupo para recibir el acceso</strong>
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
              <span className="progress-fill"></span>
            </div>
          </div>
          <h1>Ya casi terminas el proceso.</h1>
          <p>
            El último paso obligatorio es unirte al grupo de WhatsApp. Ahí recibirás
            avisos, instrucciones y acceso al material cuando esté disponible.
          </p>
          <a className="cta-button whatsapp-button" href={whatsappGroupUrl} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            Unirme al grupo
          </a>
        </section>
      </div>
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
