import { useEffect } from "react";
import {
  BellRing,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

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
    document.title = `Registro confirmado | ${landingConfig.title}`;
    captureRegistrationAttribution(window.location.search);
    trackBabyCompleteRegistration();
  }, []);

  return (
    <main className="landing-page baby-course-page baby-thanks-page">
      <header className="baby-header baby-thanks-header">
        <LogoExit />

        <div className="baby-header-badge baby-thanks-status">
          <CheckCircle2 aria-hidden="true" />
          Registro confirmado
        </div>
      </header>

      <section
        className="baby-thanks-hero"
        aria-labelledby="baby-thanks-title"
      >
        <div className="baby-thanks-copy">
          <p className="baby-kicker">
            <ShieldCheck aria-hidden="true" />
            Tu lugar está reservado
          </p>

          <h1 id="baby-thanks-title">
            ¡Registro <span>completado!</span>
          </h1>

          <p className="baby-thanks-lead">
            Ahora entra al grupo oficial de WhatsApp. Ahí recibirás la liga de
            acceso, recordatorios y las indicaciones de la clase.
          </p>

          <div className="baby-thanks-progress" aria-label="Registro completado">
            <div className="baby-thanks-progress-label">
              <span>Proceso de registro</span>
              <strong>100%</strong>
            </div>
            <div className="baby-thanks-progress-track">
              <span />
            </div>
          </div>

          <a
            className="baby-whatsapp-cta"
            href={whatsappGroupUrl}
            target="_blank"
            rel="noreferrer"
            onClick={trackBabyWhatsAppContact}
          >
            <MessageCircle aria-hidden="true" />
            <span>Entrar al grupo de WhatsApp</span>
          </a>

          <p className="baby-thanks-note">
            <BellRing aria-hidden="true" />
            Guarda el grupo para no perderte ningún aviso importante.
          </p>

          <div className="baby-thanks-steps" aria-label="Siguientes pasos">
            <div className="is-complete">
              <span><Check aria-hidden="true" /></span>
              <p><strong>Registro</strong>Confirmado</p>
            </div>
            <div>
              <span>2</span>
              <p><strong>WhatsApp</strong>Únete al grupo</p>
            </div>
          </div>
        </div>

        <div className="baby-thanks-visual" aria-label={landingConfig.instructor}>
          <span className="baby-visual-glow" aria-hidden="true" />
          <span
            className="baby-visual-ring baby-visual-ring-one"
            aria-hidden="true"
          />
          <span
            className="baby-visual-ring baby-visual-ring-two"
            aria-hidden="true"
          />
          <span className="baby-thanks-watermark" aria-hidden="true">24:00</span>

          <span className="baby-signal-chip baby-thanks-chip-one">
            Acceso a la clase
          </span>
          <span className="baby-signal-chip baby-thanks-chip-two">
            Recordatorios
          </span>

          <PersonSlot alt={landingConfig.instructor} />

          <aside className="baby-thanks-event" aria-label="Datos de la clase">
            <div className="baby-thanks-event-title">
              <span>Clase gratuita</span>
              <h2>{landingConfig.title}</h2>
            </div>

            <div>
              <CalendarDays aria-hidden="true" />
              <p>
                <strong>{landingConfig.date}</strong>
                <span>{landingConfig.time} · {landingConfig.timezone}</span>
              </p>
            </div>

            <div>
              <Stethoscope aria-hidden="true" />
              <p>
                <span>Impartido por</span>
                <strong>{landingConfig.instructor}</strong>
              </p>
            </div>

            <div>
              <Clock3 aria-hidden="true" />
              <p><strong>100% en línea</strong></p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
