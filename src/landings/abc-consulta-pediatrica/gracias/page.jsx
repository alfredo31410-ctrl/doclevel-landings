import { useEffect } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Monitor,
  ShieldCheck,
} from "lucide-react";

import doctorImage from "../../../assets/papa-primerizo/doctor-papa-primerizo.png";
import { LogoExit } from "../../../components/landing/LogoExit";
import { abcConsultaConfig, whatsappGroupUrl } from "../config";
import {
  captureAbcAttribution,
  trackAbcCompleteRegistration,
  trackAbcWhatsAppContact,
} from "../tracking";

export default function AbcConsultaPediatricaGraciasPage() {
  useEffect(() => {
    document.title = `Último paso | ${abcConsultaConfig.title}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Tu formulario fue enviado. Entra al grupo oficial de WhatsApp para completar tu registro y recibir el acceso a la clase."
      );
    captureAbcAttribution(window.location.search);
    trackAbcCompleteRegistration();
  }, []);

  return (
    <main className="abc-page abc-thanks-page">
      <header className="abc-header">
        <LogoExit />
        <div className="abc-confirmed-badge">
          <CheckCircle2 aria-hidden="true" />
          Último paso
        </div>
      </header>

      <section className="abc-thanks-hero" aria-labelledby="abc-thanks-title">
        <div className="abc-thanks-copy">
          <p className="abc-kicker">
            <ShieldCheck aria-hidden="true" />
            Finaliza tu registro
          </p>

          <h1 id="abc-thanks-title">
            ¡Tu registro está <span>CASI completo!</span>
          </h1>

          <p className="abc-lead">
            Ahora entra al grupo oficial de WhatsApp. Ahí recibirás la liga de
            acceso, los recordatorios y las indicaciones de la clase. Al
            unirte, tu registro quedará completo.
          </p>

          <a
            className="abc-whatsapp-cta"
            href={whatsappGroupUrl}
            target="_blank"
            rel="noreferrer"
            onClick={trackAbcWhatsAppContact}
          >
            <MessageCircle aria-hidden="true" />
            Entrar al grupo de WhatsApp
          </a>

          <div className="abc-thanks-steps" aria-label="Siguientes pasos">
            <div>
              <span><Check aria-hidden="true" /></span>
              <p><strong>Formulario</strong>Datos enviados</p>
            </div>
            <div>
              <span>2</span>
              <p><strong>WhatsApp</strong>Únete para finalizar</p>
            </div>
          </div>
        </div>

        <div className="abc-thanks-visual" aria-label={abcConsultaConfig.instructor}>
          <div className="abc-visual-orbit" aria-hidden="true" />
          <div className="abc-visual-word" aria-hidden="true">ABC</div>
          <span className="abc-floating-note abc-note-one">
            Acceso a la clase
          </span>
          <span className="abc-floating-note abc-note-two">
            Avisos y recordatorios
          </span>
          <img src={doctorImage} alt={abcConsultaConfig.instructor} />

          <aside className="abc-thanks-event-card" aria-label="Datos de la clase">
            <p>Clase gratuita</p>
            <h2>{abcConsultaConfig.title}</h2>
            <span><CalendarDays aria-hidden="true" /> {abcConsultaConfig.date}</span>
            <span><Clock3 aria-hidden="true" /> {abcConsultaConfig.time} · {abcConsultaConfig.timezone}</span>
            <span><Monitor aria-hidden="true" /> {abcConsultaConfig.modality}</span>
          </aside>
        </div>
      </section>
    </main>
  );
}
