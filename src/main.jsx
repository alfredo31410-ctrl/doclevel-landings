import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, MessageCircle, ShieldCheck, X } from "lucide-react";
import "./styles.css";

const whatsappGroupUrl =
  import.meta.env.VITE_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/REEMPLAZAR_ENLACE";
const landingBasePath = "/papa-primerizo";

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

function RegistrationLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="single-screen register-screen">
      <section className="landing-shell">
        <div className="copy-column">
          <a className="brand" href={getLandingHomePath()} aria-label="Doc Level">
            <span className="brand-mark">DL</span>
            <span>Doc Level</span>
          </a>
          <div className="message-box">
            <ShieldCheck aria-hidden="true" />
            <strong>Mensaje importante</strong>
            <span>
              Esta guia esta pensada para papas primerizos en el dia de parto y los primeros
              dias posteriores.
            </span>
          </div>
          <p className="eyebrow">Papa primerizo</p>
          <h1>Una guia medica simple para acompanar a mama y bebe.</h1>
          <p className="lead">
            Aprende que observar, que preguntar y como apoyar con mas calma durante una de
            las etapas mas importantes de tu familia.
          </p>
          <button className="primary-button pulse-button" type="button" onClick={() => setIsModalOpen(true)}>
            Quiero registrarme
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className="image-column" aria-label="Imagen principal pendiente">
        <div className="image-placeholder">
            <span>Imagen pendiente</span>
            <strong>Espacio listo para banner o foto final</strong>
          </div>
        </div>
      </section>

      <ActiveCampaignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

function ThanksLanding() {
  return (
    <main className="single-screen thanks-screen">
      <section className="thanks-shell">
        <a className="brand centered-brand" href={getLandingHomePath()} aria-label="Doc Level">
          <span className="brand-mark">DL</span>
          <span>Doc Level</span>
        </a>
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
