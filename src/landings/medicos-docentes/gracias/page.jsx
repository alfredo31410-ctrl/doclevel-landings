import { useEffect } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import doclevelLogoMedicos from "../../../assets/medicos-docentes/doclevel-logo.png";
import equipoMedicoGracias from "../../../assets/medicos-docentes/equipo-medico-gracias.png";
import { LogoExit } from "../../../components/landing/LogoExit";
import { trackMetaEvent } from "../../../utils/tracking";
import { medicosDocentesWhatsappUrl } from "../config";

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

export default function MedicosDocentesGraciasPage() {
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
            <span className="medicos-hero-glow glow-1" aria-hidden="true" />
            <span className="medicos-hero-glow glow-2" aria-hidden="true" />
            <span className="medicos-hero-ring ring-1" aria-hidden="true" />
            <span className="medicos-hero-ring ring-2" aria-hidden="true" />

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
