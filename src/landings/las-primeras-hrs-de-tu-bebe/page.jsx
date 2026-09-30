import { useEffect, useState } from "react";
import {
  ArrowRight,
  Baby,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Monitor,
  MoonStar,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Utensils,
  Wind,
} from "lucide-react";

import { LogoExit } from "../../components/landing/LogoExit";
import { ActiveCampaignModal } from "./ActiveCampaignModal";
import { PersonSlot } from "./components/PersonSlot";
import { landingConfig } from "./config";
import {
  captureRegistrationAttribution,
  trackRegistrationView,
} from "./tracking";

const signals = [
  {
    icon: Thermometer,
    title: "Fiebre",
    description: "Qué temperatura requiere atención y cómo medirla.",
  },
  {
    icon: Wind,
    title: "Respiración y color",
    description: "Cómo reconocer cambios que no deberías pasar por alto.",
  },
  {
    icon: Utensils,
    title: "Alimentación",
    description: "Señales de hambre, saciedad y rechazo al alimento.",
  },
  {
    icon: MoonStar,
    title: "Sueño",
    description: "Qué es esperable y cuándo el sueño resulta excesivo.",
  },
  {
    icon: Baby,
    title: "Pañal y evacuaciones",
    description: "Color, frecuencia, gases y reflujo en sus primeros días.",
  },
  {
    icon: HeartPulse,
    title: "Cambios inesperados",
    description: "Cuándo observar, cuándo consultar y cuándo actuar.",
  },
];

export default function LasPrimerasHorasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = `${landingConfig.title} | DocLevel`;
    captureRegistrationAttribution(window.location.search);
    trackRegistrationView();
  }, []);

  return (
    <main className="landing-page baby-course-page">
      <header className="baby-header">
        <LogoExit />

        <div className="baby-header-badge">
          <span className="baby-live-dot" aria-hidden="true" />
          Clase gratuita · 100% en línea
        </div>
      </header>

      <section className="baby-hero" aria-labelledby="baby-hero-title">
        <div className="baby-hero-copy">
          <p className="baby-kicker">
            <Stethoscope aria-hidden="true" />
            Curso para mamás y papás
          </p>

          <h1 id="baby-hero-title">
            Las primeras <span>24 horas</span>
            <strong>no son para improvisar.</strong>
          </h1>

          <p className="baby-hero-lead">
            Aprende qué observar, qué es normal y cuándo pedir orientación
            médica durante los primeros días de tu bebé.
          </p>

          <div className="baby-topic-list" aria-label="Temas de la clase">
            <span>Fiebre</span>
            <span>Respiración</span>
            <span>Alimentación</span>
            <span>Sueño</span>
            <span>Pañal</span>
          </div>

          <button
            className="baby-primary-cta"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Reservar mi lugar gratis
            <ArrowRight aria-hidden="true" />
          </button>

          <p className="baby-cta-note">
            <ShieldCheck aria-hidden="true" />
            Registro gratuito. Recibirás el acceso y recordatorios de la clase.
          </p>
        </div>

        <div
          className="baby-hero-visual"
          aria-label="Doctor Raúl G. de Lira López"
        >
          <span className="baby-visual-glow" aria-hidden="true" />
          <span
            className="baby-visual-ring baby-visual-ring-one"
            aria-hidden="true"
          />
          <span
            className="baby-visual-ring baby-visual-ring-two"
            aria-hidden="true"
          />
          <span className="baby-visual-time" aria-hidden="true">
            24:00
          </span>

          <span className="baby-signal-chip baby-signal-chip-one">
            ¿Es normal?
          </span>
          <span className="baby-signal-chip baby-signal-chip-two">
            ¿Debo consultar?
          </span>

          <PersonSlot alt={landingConfig.instructor} />

          <aside className="baby-event-card" aria-label="Datos de la clase">
            <div className="baby-event-heading">
              <span>Curso gratuito</span>
              <h2>{landingConfig.title}</h2>
            </div>

            <div className="baby-event-row">
              <CalendarDays aria-hidden="true" />
              <p>
                <strong>{landingConfig.date}</strong>
                <span>
                  {landingConfig.time} · {landingConfig.timezone}
                </span>
              </p>
            </div>

            <div className="baby-event-row">
              <Stethoscope aria-hidden="true" />
              <p>
                <span>Impartido por</span>
                <strong>{landingConfig.instructor}</strong>
              </p>
            </div>

            <div className="baby-event-row baby-event-row-compact">
              <Monitor aria-hidden="true" />
              <p>
                <strong>100% en línea</strong>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="baby-signals"
        id="temario"
        aria-labelledby="baby-signals-title"
      >
        <div className="baby-section-heading">
          <p>Lo que aprenderás</p>
          <h2 id="baby-signals-title">
            6 señales en un recién nacido que no deberías pasar por alto
          </h2>
          <span>
            Sal de la clase con criterios claros para observar con calma y
            actuar a tiempo.
          </span>
        </div>

        <div className="baby-signals-grid">
          {signals.map(({ icon: Icon, title, description }) => (
            <article className="baby-signal-card" key={title}>
              <div className="baby-signal-icon">
                <Icon aria-hidden="true" />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <CheckCircle2
                className="baby-signal-check"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        <div className="baby-bottom-cta">
          <div>
            <Clock3 aria-hidden="true" />
            <p>
              <span>{landingConfig.date}</span>
              <strong>
                {landingConfig.time} · {landingConfig.timezone}
              </strong>
            </p>
          </div>

          <button type="button" onClick={() => setIsModalOpen(true)}>
            Registrarme gratis
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <ActiveCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
