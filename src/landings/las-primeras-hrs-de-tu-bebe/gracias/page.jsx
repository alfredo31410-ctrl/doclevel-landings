import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

import { LogoExit } from "../../../components/landing/LogoExit";
import { landingConfig, whatsappGroupUrl } from "../config";
import { PersonSlot } from "../components/PersonSlot";
import {
  captureRegistrationAttribution,
  trackBabyCompleteRegistration,
  trackBabyWhatsAppContact,
} from "../tracking";

export default function LasPrimerasHorasGraciasPage() {
  useEffect(() => {
    document.title = `Registro completado | ${landingConfig.title}`;
    captureRegistrationAttribution(window.location.search);
    trackBabyCompleteRegistration();
  }, []);

  return (
    <main className="landing-page thanks-page baby-thanks-page">
      <LogoExit />

      <div className="landing-layout">
        <section
          className="headline-block thanks-headline"
          aria-label="Registro completado"
        >
          <h1>
            Tu registro
            <span> está casi</span>
            <em>completo</em>
          </h1>

          <p className="headline-subtitle">Último paso obligatorio</p>

          <strong>Únete al grupo para recibir el acceso</strong>

          <small>
            {landingConfig.date} · {landingConfig.time} · {landingConfig.timezone}
          </small>
        </section>

        <PersonSlot />

        <section className="cta-panel thanks-panel" aria-label="Gracias">
          <p className="eyebrow">Falta poco</p>

          <div className="progress-card" aria-label="Progreso del registro">
            <div className="progress-label">
              <span>Proceso de registro</span>
              <strong>80%</strong>
            </div>

            <div className="progress-track">
              <span className="progress-fill" />
            </div>
          </div>

          <h1>Ya casi terminas el proceso.</h1>

          <p>
            El último paso obligatorio es unirte al grupo de WhatsApp. Ahí
            recibirás avisos, instrucciones y acceso al material cuando esté
            disponible.
          </p>

          <a
            className="cta-button whatsapp-button"
            href={whatsappGroupUrl}
            target="_blank"
            rel="noreferrer"
            onClick={trackBabyWhatsAppContact}
          >
            <MessageCircle aria-hidden="true" />
            Unirme al grupo
          </a>
        </section>
      </div>
    </main>
  );
}
