import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  HeartPulse,
  Monitor,
  SearchCheck,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

import doctorImage from "../../assets/papa-primerizo/doctor-papa-primerizo.png";
import doclevelLogo from "../../../public/imgs-logos/doclevel-logo-blue-cropped.png";
import { ActiveCampaignModal } from "./ActiveCampaignModal";
import { infeccionesRespiratoriasConfig } from "./config";
import { captureRespiratoryAttribution, configureRespiratoryMetaPixel } from "./tracking";
import "./styles.css";

const route = [
  { icon: Stethoscope, title: "Evaluar", copy: "Ordena los datos clínicos que necesitas desde el inicio." },
  { icon: ShieldAlert, title: "Priorizar", copy: "Distingue lo urgente de lo que requiere vigilancia." },
  { icon: SearchCheck, title: "Integrar", copy: "Relaciona síntomas, evolución y exploración." },
  { icon: CheckCircle2, title: "Decidir", copy: "Define la conducta más adecuada para el paciente." },
  { icon: HeartPulse, title: "Dar seguimiento", copy: "Explica qué esperar, qué vigilar y cuándo volver." },
];

function RespLogo() {
  return (
    <a className="resp-logo" href="https://www.doclevelacademy.com/" aria-label="Volver al sitio principal de DocLevel">
      <img src={doclevelLogo} alt="DocLevel" />
    </a>
  );
}

export default function InfeccionesRespiratoriasPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    document.title = `${infeccionesRespiratoriasConfig.title} | DocLevel`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Clase gratuita para médicos: una ruta clínica clara para evaluar, integrar y decidir ante infecciones respiratorias pediátricas."
    );
    captureRespiratoryAttribution(window.location.search);
    configureRespiratoryMetaPixel();
  }, []);

  return (
    <main className="resp-page">
      <header className="resp-header">
        <RespLogo />
        <button className="resp-header-cta" type="button" onClick={() => setIsRegistrationOpen(true)}>
          Registrarme gratis <ArrowRight aria-hidden="true" />
        </button>
      </header>

      <section className="resp-hero" aria-labelledby="resp-title">
        <div className="resp-hero-copy">
          <p className="resp-eyebrow"><Stethoscope aria-hidden="true" /> Clase para médicos</p>
          <h1 id="resp-title">Infecciones respiratorias pediátricas: <span>de la A a la Z.</span></h1>
          <p className="resp-lead">Una ruta clínica clara para decidir ante tos, fiebre y síntomas respiratorios en pediatría.</p>

          <div className="resp-event-data" aria-label="Datos de la clase">
            <span><CalendarDays aria-hidden="true" /> {infeccionesRespiratoriasConfig.date}</span>
            <span><Clock3 aria-hidden="true" /> {infeccionesRespiratoriasConfig.time} · {infeccionesRespiratoriasConfig.timezone}</span>
            <span><Monitor aria-hidden="true" /> {infeccionesRespiratoriasConfig.modality}</span>
          </div>

          <button className="resp-cta" type="button" onClick={() => setIsRegistrationOpen(true)}>
            Quiero registrarme gratis <ArrowRight aria-hidden="true" />
          </button>
          <p className="resp-note"><CheckCircle2 aria-hidden="true" /> Registro gratuito · Acceso y recordatorios incluidos</p>
        </div>

        <div className="resp-hero-visual" aria-label={infeccionesRespiratoriasConfig.instructor}>
          <div className="resp-orbit" aria-hidden="true" />
          <div className="resp-route-preview" aria-hidden="true">
            {route.map(({ title }, index) => <span key={title}><b>0{index + 1}</b>{title}</span>)}
          </div>
          <img src={doctorImage} alt={infeccionesRespiratoriasConfig.instructor} />
          <aside className="resp-instructor-card">
            <small>Clase impartida por</small>
            <strong>{infeccionesRespiratoriasConfig.instructor}</strong>
          </aside>
        </div>
      </section>

      <section className="resp-problem" aria-labelledby="resp-problem-title">
        <div className="resp-lung-mark" aria-hidden="true">⌁</div>
        <div>
          <p className="resp-section-label">El reto de la consulta diaria</p>
          <h2 id="resp-problem-title">No toda tos y fiebre <span>significan lo mismo.</span></h2>
        </div>
        <p>Edad, evolución, antecedentes, exploración y estado general cambian las prioridades. Esta clase te ayudará a organizar esas piezas antes de tomar una decisión.</p>
      </section>

      <section className="resp-route" aria-labelledby="resp-route-title">
        <div className="resp-section-heading">
          <p>Lo que veremos en la clase</p>
          <h2 id="resp-route-title">Una ruta para la consulta respiratoria.</h2>
        </div>
        <div className="resp-route-grid">
          {route.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="resp-route-card">
              <span className="resp-route-number">0{index + 1}</span>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resp-learnings" aria-labelledby="resp-learnings-title">
        <div>
          <p className="resp-section-label">Enfoque práctico para consulta</p>
          <h2 id="resp-learnings-title">Antes del antibiótico, una pregunta: <span>¿qué cuadro estás tratando?</span></h2>
        </div>
        <ul>
          <li><Check aria-hidden="true" /> Claves para integrar los hallazgos clínicos y decidir con mayor claridad.</li>
          <li><Check aria-hidden="true" /> Criterios para reconocer cuándo la evolución requiere una nueva valoración.</li>
          <li><Check aria-hidden="true" /> Una manera de explicar el plan y los datos de alarma a cada familia.</li>
        </ul>
      </section>

      <section className="resp-close" aria-labelledby="resp-close-title">
        <div>
          <p>Clase gratuita para médicos</p>
          <h2 id="resp-close-title">Lleva una ruta más clara a tu próxima consulta.</h2>
          <span>Para médicos generales, pediatras, residentes y profesionales que atienden pacientes pediátricos.</span>
        </div>
        <button className="resp-cta resp-cta-light" type="button" onClick={() => setIsRegistrationOpen(true)}>
          <ClipboardCheck aria-hidden="true" /> Reservar mi lugar gratis
        </button>
      </section>

      <ActiveCampaignModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
    </main>
  );
}
