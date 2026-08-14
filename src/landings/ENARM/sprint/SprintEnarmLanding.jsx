import { useEffect, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Crosshair,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UsersRound,
} from "lucide-react";

import doclevelLogo from "../../../assets/papa-primerizo/doclevel-logo.png";
import doctorRaulImage from "../../../assets/papa-primerizo/doctor-papa-primerizo.png";
import enarmStudyGroupImage from "../../../assets/enarm/enarm-study-group.avif";
import {
  getEnarmSprintCheckoutUrl,
  trackEnarmSprintCheckoutClick,
} from "../tracking";

const faqs = [
  ["¿Necesito haber estudiado previamente para entrar?", "Este Sprint está diseñado para médicos que ya llevan una preparación previa para el ENARM y quieren fortalecer su estrategia de respuesta."],
  ["¿Es un curso completo de todo el ENARM?", "No. La propuesta del Sprint es utilizar la recta final para entrenar la aplicación de lo que ya estudiaste frente a preguntas y casos clínicos."],
  ["¿Cuándo comienza?", "20 de agosto."],
  ["¿Cuánto dura?", "Del 20 de agosto al 18 de septiembre."],
  ["¿Cuánto tiempo necesito al día?", "1 hora diaria de lunes a viernes."],
  ["¿Las sesiones son en vivo?", "Sí, el programa contempla sesiones en vivo con especialistas."],
  ["¿Cuánto cuesta?", "$1,987 MXN en pago único."],
  ["¿Dónde realizo el pago?", "El pago se realiza mediante el checkout seguro de Hotmart."],
];

function CheckoutButton({ children, className = "" }) {
  const handleClick = () => {
    trackEnarmSprintCheckoutClick();
    window.location.assign(getEnarmSprintCheckoutUrl());
  };

  return <button className={`sprint-cta ${className}`} type="button" onClick={handleClick}>{children}<ArrowRight aria-hidden="true" /></button>;
}

function Logo() {
  return <a className="sprint-logo" href="#inicio" aria-label="Doc Level Academy, ir al inicio"><img src={doclevelLogo} alt="Doc Level Academy" /></a>;
}

export function SprintEnarmLanding() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Sprint ENARM 2026 | Doc Level";
    const description = "Entrena tu estrategia de respuesta para el ENARM 2026 con práctica de casos clínicos, descarte de distractores y sesiones en vivo con especialistas.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
  }, []);

  return (
    <main className="sprint-page" id="inicio">
      <header className="sprint-header">
        <Logo />
        <nav aria-label="Navegación principal">
          <a href="#que-es">Qué es</a><a href="#como-funciona">Cómo funciona</a><a href="#instructor">Instructor</a><a href="#faq">FAQ</a>
        </nav>
        <CheckoutButton className="sprint-cta--small">Inscribirme ahora</CheckoutButton>
      </header>

      <section className="sprint-hero sprint-wrap" aria-labelledby="sprint-title">
        <div className="sprint-hero-copy">
          <p className="sprint-eyebrow"><Sparkles aria-hidden="true" /> Sprint ENARM 2026 · Inscripciones abiertas</p>
          <h1 id="sprint-title">Ya estudiaste.<br />Ahora entrena <span>cómo responder.</span></h1>
          <p className="sprint-lead">Usa tu recta final para entrenar cómo leer casos, detectar pistas, descartar distractores y tomar mejores decisiones bajo tiempo.</p>
          <div className="sprint-benefits" aria-label="Beneficios del Sprint">
            <span><FileCheck2 /> Casos clínicos</span><span><Crosshair /> Estrategia de respuesta</span><span><BrainCircuit /> Descarte de distractores</span><span><TimerReset /> Administración del tiempo</span>
          </div>
          <div className="sprint-price-row"><div><strong>$1,987 <small>MXN</small></strong><span>Pago único · programa completo</span></div><CheckoutButton>Inscribirme ahora</CheckoutButton></div>
          <p className="sprint-trust"><ShieldCheck aria-hidden="true" /> Pago seguro mediante Hotmart</p>
        </div>
        <aside className="sprint-hero-visual" aria-label="Información del programa">
          <div className="sprint-orbit sprint-orbit--one" aria-hidden="true" /><div className="sprint-orbit sprint-orbit--two" aria-hidden="true" />
          <img src={doctorRaulImage} alt="Dr. Raúl de Lira" />
          <div className="sprint-hero-card"><span>20 AGO — 18 SEP</span><strong>1 HORA AL DÍA</strong><small>Lunes a viernes · En vivo con especialistas</small></div>
        </aside>
      </section>

      <section className="sprint-problem sprint-section sprint-wrap" aria-labelledby="problem-title">
        <div><p className="sprint-section-label">El cambio de enfoque</p><h2 id="problem-title">Tu último mes no necesita otro temario.</h2><p className="sprint-section-lead">Ya tienes apuntes.<br />Ya viste clases.<br />Ya resolviste bancos.</p><p>Ahora necesitas practicar cómo usar lo que sabes frente a un caso clínico.</p></div>
        <div className="sprint-statement">Menos contenido nuevo.<br /><span>Más criterio<br />para responder.</span><CheckoutButton>Inscribirme ahora</CheckoutButton></div>
      </section>

      <section className="sprint-method sprint-section" aria-labelledby="method-title">
        <div className="sprint-wrap"><p className="sprint-section-label">Método de respuesta</p><h2 id="method-title">Dos respuestas parecen correctas.<br /><span>¿Cuál descartas?</span></h2><div className="sprint-steps"><article><b>01</b><h3>Leer</h3><p>Identifica lo esencial del caso.</p></article><article><b>02</b><h3>Interpretar</h3><p>Conecta los datos con lo que sabes.</p></article><article><b>03</b><h3>Descartar</h3><p>Elimina lo que no explica el caso.</p></article><article><b>04</b><h3>Decidir</h3><p>Elige la mejor opción con criterio clínico.</p></article></div><div className="sprint-section-cta"><CheckoutButton>Inscribirme ahora</CheckoutButton></div></div>
      </section>

      <section className="sprint-section sprint-about sprint-wrap" id="que-es" aria-labelledby="about-title"><div className="sprint-about-mark"><img src={enarmStudyGroupImage} alt="Estudiantes de medicina preparándose juntos" /></div><div><p className="sprint-section-label">El Sprint</p><h2 id="about-title">¿Qué es Sprint ENARM 2026?</h2><p className="sprint-section-lead">Un entrenamiento intensivo en vivo diseñado para médicos que ya llevan una preparación previa y quieren usar su recta final para fortalecer su estrategia de respuesta.</p><div className="sprint-check-list"><span><Check /> Sesiones en vivo con especialistas</span><span><Check /> Práctica diaria con casos clínicos</span><span><Check /> Preguntas tipo examen</span><span><Check /> Análisis de distractores</span><span><Check /> Técnicas de resolución</span><span><Check /> Acompañamiento en tiempo real</span></div><div className="sprint-section-cta"><CheckoutButton>Inscribirme ahora</CheckoutButton></div></div></section>

      <section className="sprint-timeline sprint-section" id="como-funciona" aria-labelledby="timeline-title"><div className="sprint-wrap"><p className="sprint-section-label">Una recta final con dirección</p><h2 id="timeline-title">Cómo funciona</h2><div className="sprint-timeline-grid"><div><CalendarDays /><strong>20 DE AGOSTO</strong><span>Inicia el Sprint.</span></div><div><Clock3 /><strong>LUNES A VIERNES</strong><span>1 hora diaria.</span></div><div><UsersRound /><strong>EN VIVO CON ESPECIALISTAS</strong><span>Práctica, análisis y estrategia.</span></div><div><CalendarDays /><strong>18 DE SEPTIEMBRE</strong><span>Cierre del Sprint.</span></div></div></div></section>

      <section className="sprint-instructor sprint-section sprint-wrap" id="instructor" aria-labelledby="instructor-title"><div className="sprint-instructor-photo"><img src={doctorRaulImage} alt="Dr. Raúl de Lira" /></div><div><p className="sprint-section-label">Instructor</p><h2 id="instructor-title">Dr. Raúl de Lira</h2><p className="sprint-section-lead">Aprobó el ENARM en su primer intento y hoy acompaña a médicos que se preparan para el ENARM 2026.</p><blockquote>“En la recta final me enfocaría en tres cosas: leer mejor, descartar mejor y decidir mejor bajo tiempo.”</blockquote><div className="sprint-section-cta"><CheckoutButton>Inscribirme ahora</CheckoutButton></div></div></section>

      <section className="sprint-offer sprint-section sprint-wrap" id="inscripcion" aria-labelledby="offer-title"><div><p className="sprint-section-label">Inscripciones abiertas</p><h2 id="offer-title">Tu recta final<br /><span>comienza aquí.</span></h2></div><div className="sprint-offer-card"><div><p>Sprint ENARM 2026</p><strong>$1,987 <small>MXN</small></strong><span>20 AGO — 18 SEP · 1 hora diaria · En vivo</span></div><CheckoutButton>Quiero entrar al Sprint</CheckoutButton><small className="sprint-trust"><ShieldCheck /> Pago seguro mediante Hotmart</small></div></section>

      <section className="sprint-after sprint-section sprint-wrap" aria-labelledby="after-title"><div><p className="sprint-section-label">Después de pagar</p><h2 id="after-title">¿Qué pasa después de pagar?</h2></div><div className="sprint-after-grid"><div><b>01</b><p>Completa tu pago de forma segura mediante Hotmart.</p></div><div><b>02</b><p>Recibirás la confirmación de tu compra.</p></div><div><b>03</b><p>Recibirás las instrucciones correspondientes para acceder al Sprint.</p></div><div><b>04</b><p>El entrenamiento comienza el 20 de agosto.</p></div></div></section>

      <section className="sprint-faq sprint-section sprint-wrap" id="faq" aria-labelledby="faq-title"><p className="sprint-section-label">Preguntas frecuentes</p><h2 id="faq-title">Resuelve tus dudas.</h2><div className="sprint-faq-list">{faqs.map(([question, answer], index) => <div className={`sprint-faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown aria-hidden="true" /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div><div className="sprint-section-cta sprint-section-cta--center"><CheckoutButton>Inscribirme ahora</CheckoutButton></div></section>

      <footer className="sprint-footer sprint-wrap"><Logo /><p>Entrenamiento para médicos que quieren responder mejor.</p><small>© {new Date().getFullYear()} Doc Level Academy</small></footer>
      <div className="sprint-mobile-cta"><CheckoutButton>Inscribirme ahora</CheckoutButton></div>
    </main>
  );
}
