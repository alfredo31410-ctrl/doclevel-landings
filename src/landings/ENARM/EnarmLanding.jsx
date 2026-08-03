import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";

import doclevelLogo from "../../assets/papa-primerizo/doclevel-logo.png";
import doctorRaulImage from "../../assets/papa-primerizo/doctor-papa-primerizo.png";

import {
  captureEnarmAttribution,
  getEnarmAttributionQuery,
  savePendingEnarmAttempt,
} from "./tracking";

const attributionKeys = [
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

function syncAttributionFields(wrapper) {
  const attribution = captureEnarmAttribution(window.location.search);
  const fields = wrapper.querySelectorAll("input, select, textarea");

  for (const field of fields) {
    const fieldDescriptor = [
      field.name,
      field.id,
      field.placeholder,
      field.getAttribute("aria-label"),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const key = attributionKeys.find((candidate) =>
      fieldDescriptor.includes(candidate)
    );

    if (key && attribution[key] && !field.value) {
      field.value = attribution[key];
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
}

function EnarmRegistrationModal({ isOpen, onClose, onSuccess }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    let hasAttemptedSubmit = false;
    let hasCompleted = false;
    let hasSavedAttempt = false;
    const existingScript = document.querySelector(
      'script[data-active-campaign-form="305"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://cefincapacitacion.activehosted.com/f/embed.php?id=305";
      script.charset = "utf-8";
      script.async = true;
      script.dataset.activeCampaignForm = "305";
      document.body.appendChild(script);
    }

    const handleClick = (event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) return;

      const wrapper = target.closest("._form_305");
      if (!wrapper) return;

      const submitControl = target.closest(
        'button, input[type="submit"], ._submit'
      );

      if (submitControl) {
        const form = submitControl.closest("form");

        if (
          form &&
          typeof form.checkValidity === "function" &&
          !form.checkValidity()
        ) {
          return;
        }

        if (hasSavedAttempt) return;

        hasAttemptedSubmit = true;
        hasSavedAttempt = Boolean(savePendingEnarmAttempt());
        syncAttributionFields(wrapper);
      }
    };

    const observer = new MutationObserver(() => {
      if (!hasAttemptedSubmit || hasCompleted) return;

      const wrapper = document.querySelector("._form_305");
      if (!wrapper) return;

      syncAttributionFields(wrapper);

      const successMessage = [
        ...wrapper.querySelectorAll(
          "._form-thank-you, ._form-thank-you-message, ._form_success"
        ),
      ].find((node) => {
        if (!(node instanceof HTMLElement)) return false;

        return (
          Boolean(node.textContent?.trim()) &&
          window.getComputedStyle(node).display !== "none"
        );
      });

      if (!successMessage) return;

      hasCompleted = true;
      onSuccess();
    });

    document.addEventListener("click", handleClick, true);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("click", handleClick, true);
      observer.disconnect();
    };
  }, [isOpen, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal enarm-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Registro a la clase gratis de ENARM 2026"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          <X aria-hidden="true" />
        </button>

        <p className="enarm-modal-kicker">Registro gratuito</p>
        <h2>Reserva tu lugar en la clase</h2>
        <p className="enarm-modal-copy">
          Déjanos tus datos y recibirás los detalles para asistir con el Dr. Raúl
          de Lira.
        </p>

        <div className="active-campaign-embed">
          <div className="_form_305" />
        </div>
      </section>
    </div>
  );
}

export function EnarmLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Clase gratis ENARM 2026 | DocLevel";
    captureEnarmAttribution(window.location.search);
  }, []);

  const openRegistration = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="enarm-page">
      <header className="enarm-header">
        <a href="https://www.doclevelacademy.com/" aria-label="DocLevel">
          <img src={doclevelLogo} alt="DocLevel" />
        </a>
        <span>Clase especial para aspirantes ENARM</span>
      </header>

      <section className="enarm-hero">
        <div className="enarm-hero-copy">
          <p className="enarm-eyebrow">
            <SparkIcon /> Clase gratis · ENARM 2026
          </p>
          <h1>
            De aspirante a residente:
            <span>Estrategias efectivas para el ENARM 2026</span>
          </h1>
          <p className="enarm-lead">
            Aprende a prepararte con más estrategia para responder mejor el examen
            y acercarte a la residencia de la especialidad que quieres.
          </p>

          <div className="enarm-meta-grid">
            <div><CalendarDays aria-hidden="true" /><span><strong>Viernes 7 de agosto</strong>Clase en vivo</span></div>
            <div><Clock3 aria-hidden="true" /><span><strong>11:00 a. m.</strong>Hora CDMX</span></div>
            <div><GraduationCap aria-hidden="true" /><span><strong>Con el Dr. Raúl de Lira</strong>Experiencia y estrategia</span></div>
          </div>

          <button className="enarm-primary-button" type="button" onClick={openRegistration}>
            Quiero reservar mi lugar <ArrowRight aria-hidden="true" />
          </button>
          <small className="enarm-button-note">Cupo gratuito · Registro en menos de un minuto</small>
        </div>

        <aside className="enarm-hero-card">
          <img
            className="enarm-doctor-image"
            src={doctorRaulImage}
            alt="Dr. Raúl de Lira"
          />
          <div className="enarm-card-orbit orbit-one" aria-hidden="true" />
          <div className="enarm-card-orbit orbit-two" aria-hidden="true" />
          <div className="enarm-card-icon"><Target aria-hidden="true" /></div>
          <p className="enarm-card-label">Tu siguiente paso</p>
          <h2>Convierte tu preparación en una estrategia.</h2>
          <p>
            Una clase para estudiantes de Medicina que presentarán el ENARM 2026
            y quieren prepararse con dirección.
          </p>
          <div className="enarm-card-divider" />
          <div className="enarm-card-footer"><ShieldCheck aria-hidden="true" /> Acceso 100% gratuito</div>
        </aside>
      </section>

      <EnarmRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          const query = getEnarmAttributionQuery({
            source: "activecampaign",
          });

          window.location.assign(
            `${import.meta.env.BASE_URL}ENARM/gracias${query}`
          );
        }}
      />
    </main>
  );
}

function SparkIcon() {
  return <span className="enarm-spark" aria-hidden="true">✦</span>;
}
