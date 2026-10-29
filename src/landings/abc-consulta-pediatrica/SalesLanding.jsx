import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  HeartHandshake,
  ListChecks,
  MessageCircleQuestion,
  Monitor,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

import doctorImage from "../../assets/papa-primerizo/doctor-papa-primerizo.png";
import { LogoExit } from "../../components/landing/LogoExit";
import { ActiveCampaignModal } from "./ActiveCampaignModal";
import { abcConsultaConfig } from "./config";
import {
  captureAbcAttribution,
  configureAbcMetaPixel,
} from "./tracking";
import "./sales.css";

const method = [
  {
    icon: HeartHandshake,
    title: "Conectar",
    copy: "Genera confianza antes de realizar la primera maniobra.",
  },
  {
    icon: Eye,
    title: "Observar",
    copy: "Lee postura, conducta, juego, mirada y vínculo familiar.",
  },
  {
    icon: Users,
    title: "Crear cooperación",
    copy: "Aprende a construir cooperación sin forzar al paciente.",
  },
  {
    icon: Search,
    title: "Explorar",
    copy: "Acércate con intención, ritmo y una secuencia clara.",
  },
  {
    icon: ListChecks,
    title: "Cerrar con claridad",
    copy: "Deja un plan que la familia comprenda y pueda seguir.",
  },
];

const outcomes = [
  "Una estructura aplicable desde tu siguiente consulta.",
  "Recursos para mejorar cooperación y exploración física.",
  "Criterios para comunicar indicaciones con mayor claridad.",
  "Una experiencia más ordenada para el paciente y su familia.",
];

const idealFor = [
  "Médicos generales que atienden pacientes pediátricos.",
  "Pediatras que desean fortalecer la experiencia de consulta.",
  "Estudiantes e internos que quieren desarrollar criterio práctico.",
  "Profesionales de la salud que trabajan con niños y familias.",
];

export default function AbcConsultaPediatricaLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = `${abcConsultaConfig.title} | Clase gratuita | DocLevel`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Clase gratuita para aprender a conducir la consulta pediátrica con estructura, cooperación y claridad. Reserva tu lugar para el 2 de noviembre de 2026."
      );
    captureAbcAttribution(window.location.search);
    configureAbcMetaPixel();
  }, []);

  const openRegistration = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="abc-page abc-sales-page">
      <header className="abc-header">
        <LogoExit />
        <div className="abc-sales-badge">
          <BadgeCheck aria-hidden="true" />
          <span>
            Clase gratuita
            <span className="abc-badge-modality"> · 100% en línea</span>
          </span>
        </div>
      </header>

      <section className="abc-hero abc-sales-hero" aria-labelledby="abc-title">
        <div className="abc-hero-copy">
          <p className="abc-kicker">
            <BookOpenCheck aria-hidden="true" />
            Clase para médicos y profesionales de la salud
          </p>

          <h1 id="abc-title">
            La consulta pediátrica <span>también se aprende.</span>
          </h1>

          <p className="abc-lead">
            Participa en esta clase gratuita y aprende una estructura práctica
            para conectar, observar, explorar y cerrar cada consulta con mayor
            claridad, cooperación y confianza.
          </p>

          <div className="abc-sales-proof" aria-label="Datos de la clase">
            <div>
              <CalendarDays aria-hidden="true" />
              <span>Lunes 2 de noviembre de 2026</span>
            </div>
            <div>
              <Clock3 aria-hidden="true" />
              <span>1:00 p. m. · Hora CDMX</span>
            </div>
            <div>
              <Monitor aria-hidden="true" />
              <span>Clase gratuita en línea</span>
            </div>
          </div>

          <div className="abc-conversion-actions">
            <button
              className="abc-checkout-cta"
              type="button"
              onClick={openRegistration}
            >
              Reservar mi lugar gratis
              <ArrowRight aria-hidden="true" />
            </button>
          </div>

          <p className="abc-sales-disclosure">
            <ShieldCheck aria-hidden="true" />
            Registro gratuito. Recibirás el acceso y los recordatorios de la
            clase después de completar tus datos.
          </p>
        </div>

        <div className="abc-hero-visual" aria-label={abcConsultaConfig.instructor}>
          <div className="abc-visual-orbit" aria-hidden="true" />
          <div className="abc-visual-word" aria-hidden="true">ABC</div>
          <span className="abc-floating-note abc-note-one">
            La confianza empieza antes de explorar.
          </span>
          <span className="abc-floating-note abc-note-two">
            El plan que no se entiende, no existe.
          </span>
          <img src={doctorImage} alt={abcConsultaConfig.instructor} />
          <aside className="abc-speaker-card">
            <span>Clase impartida por</span>
            <strong>{abcConsultaConfig.instructor}</strong>
            <small>DocLevel</small>
          </aside>
        </div>
      </section>

      <section className="abc-sales-intro" aria-labelledby="abc-intro-title">
        <div className="abc-section-heading">
          <p>Más que llegar a un diagnóstico</p>
          <h2 id="abc-intro-title">La forma de conducir la consulta también importa.</h2>
          <span>
            En pediatría no solo evalúas síntomas. También necesitas ganarte la
            confianza del niño, obtener información útil, realizar una buena
            exploración y dar tranquilidad a su familia.
          </span>
        </div>

        <div className="abc-contrast-grid">
          <article className="abc-contrast-card abc-contrast-card-muted">
            <span>Cuando falta estructura</span>
            <h3>Prisa, resistencia y dudas.</h3>
            <ul>
              <li><MessageCircleQuestion aria-hidden="true" /> Preguntas que reaparecen después de la consulta.</li>
              <li><MessageCircleQuestion aria-hidden="true" /> Exploración apresurada y poca cooperación.</li>
              <li><MessageCircleQuestion aria-hidden="true" /> Indicaciones que la familia no logra recordar.</li>
            </ul>
          </article>

          <article className="abc-contrast-card abc-contrast-card-blue">
            <span>Cuando existe un método</span>
            <h3>Cooperación, claridad y plan.</h3>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Un niño acompañado, no forzado.</li>
              <li><CheckCircle2 aria-hidden="true" /> Una exploración con secuencia e intención.</li>
              <li><CheckCircle2 aria-hidden="true" /> Una familia que sabe qué hacer y cuándo volver.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="abc-method" aria-labelledby="abc-method-title">
        <div className="abc-section-heading abc-section-heading-light">
          <p>Lo que aprenderás en la clase</p>
          <h2 id="abc-method-title">No es solo “tener mano” con los niños. Es estructura.</h2>
          <span>Un sistema en cinco momentos para conducir la consulta con intención.</span>
        </div>

        <div className="abc-method-grid">
          {method.map(({ icon: Icon, title, copy }, index) => (
            <article className="abc-method-card" key={title}>
              <span className="abc-method-number">0{index + 1}</span>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="abc-sales-details" aria-labelledby="abc-details-title">
        <div className="abc-sales-details-copy">
          <p className="abc-kicker"><Sparkles aria-hidden="true" /> Una clase pensada para la práctica</p>
          <h2 id="abc-details-title">¿Qué puedes llevarte?</h2>
          <p>
            El objetivo es ayudarte a convertir conceptos clínicos y de
            comunicación en una secuencia que puedas aplicar de forma consciente.
          </p>
          <div className="abc-outcomes-list">
            {outcomes.map((outcome) => (
              <div key={outcome}><Check aria-hidden="true" /><span>{outcome}</span></div>
            ))}
          </div>
        </div>

        <aside className="abc-audience-card">
          <p>Esta clase puede ser para ti si eres:</p>
          <h2>Médico o profesional que atiende a pacientes pediátricos.</h2>
          <ul>
            {idealFor.map((profile) => (
              <li key={profile}><CheckCircle2 aria-hidden="true" /> {profile}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="abc-sales-close">
        <div className="abc-sales-close-copy">
          <p>Reserva tu lugar</p>
          <h2>Da el siguiente paso en tu consulta pediátrica.</h2>
          <span>
            Regístrate gratis para asistir el lunes 2 de noviembre de 2026 a
            la 1:00 p. m., hora CDMX. Después de completar tus datos podrás
            entrar al grupo oficial de WhatsApp para recibir el acceso y los
            recordatorios.
          </span>
        </div>

        <div className="abc-sales-close-action">
          <button
            className="abc-checkout-cta abc-checkout-cta-final"
            type="button"
            onClick={openRegistration}
          >
            <ClipboardCheck aria-hidden="true" />
            Registrarme gratis
            <ArrowRight aria-hidden="true" />
          </button>
          <p><ShieldCheck aria-hidden="true" /> Registro gratuito y cupo sujeto a disponibilidad.</p>
        </div>
      </section>

      <button
        className="abc-floating-checkout"
        type="button"
        onClick={openRegistration}
      >
        <ClipboardCheck aria-hidden="true" />
        <span>Registrarme gratis</span>
      </button>

      <ActiveCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
