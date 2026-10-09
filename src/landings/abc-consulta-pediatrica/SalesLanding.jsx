import { useEffect } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Eye,
  HeartHandshake,
  ListChecks,
  MessageCircle,
  MessageCircleQuestion,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

import doctorImage from "../../assets/papa-primerizo/doctor-papa-primerizo.png";
import { LogoExit } from "../../components/landing/LogoExit";
import { abcConsultaConfig } from "./config";
import {
  captureAbcAttribution,
  trackAbcSalesView,
  trackAbcWhatsAppSalesIntent,
} from "./salesTracking";
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

function getWhatsAppUrl() {
  const { whatsappUrl, whatsappMessage } = abcConsultaConfig.sales;
  if (!whatsappUrl) return "";

  try {
    const url = new URL(whatsappUrl);
    if (!url.searchParams.has("text")) {
      url.searchParams.set("text", whatsappMessage);
    }
    return url.toString();
  } catch {
    return whatsappUrl;
  }
}

function WhatsAppCta({ location, className = "abc-primary-cta", children }) {
  const href = getWhatsAppUrl();

  if (!href) {
    return (
      <button className={className} type="button" disabled>
        WhatsApp pendiente de conectar
      </button>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackAbcWhatsAppSalesIntent(location)}
    >
      {children}
    </a>
  );
}

export default function AbcConsultaPediatricaSalesLanding() {
  useEffect(() => {
    document.title = `${abcConsultaConfig.title} | DocLevel`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Programa práctico para aprender a conducir la consulta pediátrica con estructura, cooperación y claridad. Solicita temario, costo e inscripción por WhatsApp."
      );
    captureAbcAttribution(window.location.search);
    trackAbcSalesView();
  }, []);

  return (
    <main className="abc-page abc-sales-page">
      <header className="abc-header">
        <LogoExit />
        <div className="abc-sales-badge">
          <BadgeCheck aria-hidden="true" />
          Formación práctica DocLevel
        </div>
      </header>

      <section className="abc-hero abc-sales-hero" aria-labelledby="abc-sales-title">
        <div className="abc-hero-copy">
          <p className="abc-kicker">
            <BookOpenCheck aria-hidden="true" />
            Programa para médicos y profesionales de la salud
          </p>

          <h1 id="abc-sales-title">
            La consulta pediátrica <span>también se aprende.</span>
          </h1>

          <p className="abc-lead">
            Aprende una estructura práctica para conectar, observar, explorar y
            cerrar cada consulta con mayor claridad, cooperación y confianza.
          </p>

          <div className="abc-sales-proof">
            <div><Stethoscope aria-hidden="true" /><span>Método clínico aplicable</span></div>
            <div><Users aria-hidden="true" /><span>Enfoque en niño y familia</span></div>
            <div><ClipboardCheck aria-hidden="true" /><span>Consulta de inicio a cierre</span></div>
          </div>

          <WhatsAppCta location="hero">
            <MessageCircle aria-hidden="true" />
            Quiero recibir información y costo
            <ArrowRight aria-hidden="true" />
          </WhatsAppCta>

          <p className="abc-sales-disclosure">
            <CircleDollarSign aria-hidden="true" />
            Al continuar por WhatsApp, un asesor te compartirá el temario,
            inversión y opciones de acceso para que decidas si es para ti.
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
            <span>Programa impartido por</span>
            <strong>{abcConsultaConfig.instructor}</strong>
            <small>DocLevel</small>
          </aside>
        </div>
      </section>

      <section className="abc-sales-intro" aria-labelledby="abc-sales-intro-title">
        <div className="abc-section-heading">
          <p>Más que llegar a un diagnóstico</p>
          <h2 id="abc-sales-intro-title">La forma de conducir la consulta también importa.</h2>
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

      <section className="abc-method" aria-labelledby="abc-sales-method-title">
        <div className="abc-section-heading abc-section-heading-light">
          <p>Lo que trabajarás en el programa</p>
          <h2 id="abc-sales-method-title">No es solo “tener mano” con los niños. Es estructura.</h2>
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

      <section className="abc-sales-details" aria-labelledby="abc-sales-details-title">
        <div className="abc-sales-details-copy">
          <p className="abc-kicker"><Sparkles aria-hidden="true" /> Una formación pensada para la práctica</p>
          <h2 id="abc-sales-details-title">¿Qué puedes llevarte?</h2>
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
          <p>Este programa puede ser para ti si eres:</p>
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
          <p>El siguiente paso</p>
          <h2>Conoce el programa antes de tomar una decisión.</h2>
          <span>
            Escríbenos por WhatsApp. Te compartiremos el temario completo, la
            inversión, modalidad y proceso de inscripción. Podrás resolver tus
            dudas directamente con nuestro equipo.
          </span>
        </div>

        <div className="abc-sales-close-action">
          <WhatsAppCta location="final" className="abc-whatsapp-sales-cta">
            <MessageCircle aria-hidden="true" />
            Ver temario, costo e inscripción
            <ArrowRight aria-hidden="true" />
          </WhatsAppCta>
          <p><ShieldCheck aria-hidden="true" /> Atención informativa y comercial por WhatsApp.</p>
        </div>
      </section>

      <WhatsAppCta location="floating" className="abc-floating-whatsapp">
        <MessageCircle aria-hidden="true" />
        <span>Hablar por WhatsApp</span>
      </WhatsAppCta>
    </main>
  );
}

