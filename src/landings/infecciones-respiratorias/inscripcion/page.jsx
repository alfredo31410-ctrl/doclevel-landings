import { useEffect } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  HeartPulse,
  Monitor,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import doctorImage from "../../../assets/papa-primerizo/doctor-papa-primerizo.png";
import doclevelLogo from "../../../../public/imgs-logos/doclevel-logo-blue-cropped.png";
import { infeccionesRespiratoriasConfig } from "../config";
import { captureRespiratoryAttribution, trackRespiratoryCheckout } from "../tracking";
import "./styles.css";

const { purchase } = infeccionesRespiratoriasConfig;

const outcomes = [
  ["Evaluar", "Ordena los datos clínicos que necesitas desde el inicio."],
  ["Priorizar", "Distingue lo urgente de lo que requiere vigilancia."],
  ["Integrar", "Relaciona síntomas, evolución y exploración."],
  ["Decidir", "Define una conducta clínica con mayor claridad."],
];

function CheckoutButton({ className = "", children }) {
  return (
    <a className={`resp-sale-cta ${className}`} href={purchase.checkoutUrl} onClick={trackRespiratoryCheckout}>
      {children} <ArrowRight aria-hidden="true" />
    </a>
  );
}

export default function InfeccionesRespiratoriasInscripcionPage() {
  useEffect(() => {
    document.title = `Inscripción | ${infeccionesRespiratoriasConfig.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Inscríbete a Infecciones respiratorias pediátricas: de la A a la Z y fortalece tu criterio clínico para la consulta."
    );
    captureRespiratoryAttribution(window.location.search);
  }, []);

  return (
    <main className="resp-sale-page">
      <header className="resp-sale-header">
        <a className="resp-sale-logo" href="https://www.doclevelacademy.com/" aria-label="Volver al sitio principal de DocLevel">
          <img src={doclevelLogo} alt="DocLevel" />
        </a>
        <CheckoutButton className="resp-sale-cta--header">INSCRIBIRME AHORA</CheckoutButton>
      </header>

      <section className="resp-sale-hero" aria-labelledby="resp-sale-title">
        <div className="resp-sale-hero-copy">
          <p className="resp-sale-eyebrow"><Stethoscope aria-hidden="true" /> Formación clínica para médicos</p>
          <h1 id="resp-sale-title">{purchase.productTitle}</h1>
          <p className="resp-sale-lead">Una ruta clínica para evaluar, integrar y decidir con mayor claridad ante tos, fiebre y síntomas respiratorios en pediatría.</p>
          <div className="resp-sale-points" aria-label="Lo que fortalecerás">
            <span><Check aria-hidden="true" /> Criterio para priorizar</span>
            <span><Check aria-hidden="true" /> Enfoque práctico para consulta</span>
            <span><Check aria-hidden="true" /> Decisiones más claras</span>
          </div>
          <CheckoutButton>INSCRIBIRME AHORA</CheckoutButton>
          <p className="resp-sale-trust"><ShieldCheck aria-hidden="true" /> Pago seguro a través de Hotmart</p>
        </div>
        <div className="resp-sale-hero-visual" aria-label={infeccionesRespiratoriasConfig.instructor}>
          <div className="resp-sale-orbit" aria-hidden="true" />
          <div className="resp-sale-route" aria-hidden="true">
            {outcomes.map(([title], index) => <span key={title}><b>0{index + 1}</b>{title}</span>)}
          </div>
          <img src={doctorImage} alt={infeccionesRespiratoriasConfig.instructor} />
          <aside><small>Impartido por</small><strong>{infeccionesRespiratoriasConfig.instructor}</strong></aside>
        </div>
      </section>

      <section className="resp-sale-problem" aria-labelledby="resp-sale-problem-title">
        <div><p>El reto de la consulta diaria</p><h2 id="resp-sale-problem-title">No toda tos y fiebre <span>significan lo mismo.</span></h2></div>
        <p>Edad, evolución, antecedentes, exploración y estado general cambian las prioridades. Esta formación te ayuda a ordenar esos datos antes de tomar una decisión.</p>
      </section>

      <section className="resp-sale-outcomes" aria-labelledby="resp-sale-outcomes-title">
        <div className="resp-sale-section-heading"><p>Una ruta para la consulta respiratoria</p><h2 id="resp-sale-outcomes-title">Lo que vas a fortalecer.</h2></div>
        <div className="resp-sale-outcome-grid">
          {outcomes.map(([title, copy], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="resp-sale-instructor" aria-labelledby="resp-sale-instructor-title">
        <div className="resp-sale-instructor-mark"><HeartPulse aria-hidden="true" /></div>
        <div><p>Tu instructor</p><h2 id="resp-sale-instructor-title">{infeccionesRespiratoriasConfig.instructor}</h2><span>Una formación enfocada en llevar una ruta más clara a tu próxima consulta.</span></div>
        <CheckoutButton className="resp-sale-cta--outline">INSCRIBIRME AHORA</CheckoutButton>
      </section>

      <section className="resp-sale-offer" aria-labelledby="resp-sale-offer-title">
        <div><p>Inscripción en línea</p><h2 id="resp-sale-offer-title">Empieza a decidir con <span>más claridad clínica.</span></h2><p>Completa tu inscripción a {purchase.productTitle} de forma segura y recibe las indicaciones de acceso directamente desde Hotmart.</p></div>
        <div className="resp-sale-offer-card"><Monitor aria-hidden="true" /><strong>Acceso online</strong><span>Inscripción y pago seguro</span><CheckoutButton>INSCRIBIRME AHORA</CheckoutButton><small><CheckCircle2 aria-hidden="true" /> Plataforma de pago Hotmart</small></div>
      </section>

      <footer className="resp-sale-footer"><img src={doclevelLogo} alt="DocLevel" /><span>© {new Date().getFullYear()} DocLevel Academy</span></footer>
      <div className="resp-sale-mobile-cta"><CheckoutButton>INSCRIBIRME AHORA</CheckoutButton></div>
    </main>
  );
}
