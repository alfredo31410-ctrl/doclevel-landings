import { useEffect } from "react";

import doclevelLogo from "../../../assets/papa-primerizo/doclevel-logo.png";
import doctorRaulImage from "../../../assets/papa-primerizo/doctor-papa-primerizo.png";
import {
  consumePendingEnarmLead,
  getEnarmAttributionQuery,
} from "../tracking";

export function EnarmGracias() {
  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get("source");

    if (source === "activecampaign") {
      consumePendingEnarmLead();
    }
  }, []);

  const whatsappPath =
    `${import.meta.env.BASE_URL}ENARM/unirse-whatsapp${getEnarmAttributionQuery()}`;

  return (
    <main className="enarm-thanks-page">
      <header className="enarm-thanks-header">
        <a href="https://www.doclevelacademy.com/" aria-label="DocLevel">
          <img src={doclevelLogo} alt="DocLevel" />
        </a>
        <span>ENARM 2026</span>
      </header>

      <section className="enarm-thanks-layout">
        <div className="enarm-thanks-copy">
          <p className="enarm-thanks-eyebrow">PASO 2 DE 2 · NO CIERRES ESTA PÁGINA</p>

          <h1>
            SOLO FALTA ENTRAR AL GRUPO DE WHATSAPP
          </h1>

          <p className="enarm-thanks-lead">
            Tus datos ya fueron guardados correctamente. Entra ahora al grupo
            oficial para recibir el enlace de acceso, los recordatorios, los
            avisos y los materiales.
          </p>

          <a className="enarm-whatsapp-button" href={whatsappPath}>
            ENTRAR AL GRUPO OFICIAL
          </a>
        </div>

        <div className="enarm-thanks-visual">
          <div className="enarm-thanks-glow" aria-hidden="true" />
          <img src={doctorRaulImage} alt="Dr. Raúl de Lira" />
        </div>
      </section>
    </main>
  );
}
