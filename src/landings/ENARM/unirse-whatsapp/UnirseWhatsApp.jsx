import { useEffect } from "react";

import doclevelLogo from "../../../assets/papa-primerizo/doclevel-logo.png";
import {
  trackMetaCustomEventOnce,
} from "../tracking";

const whatsappGroupUrl =
  "https://chat.whatsapp.com/IrCs1y7VIgJ0ZM0xUf7e7x";

export function UnirseWhatsApp() {
  useEffect(() => {
    trackMetaCustomEventOnce("JoinGroup", "enarm-whatsapp");

    const redirectTimer = window.setTimeout(() => {
      window.location.replace(whatsappGroupUrl);
    }, 1500);

    return () => window.clearTimeout(redirectTimer);
  }, []);

  return (
    <main className="enarm-whatsapp-page">
      <header className="enarm-whatsapp-header">
        <a href="https://www.doclevelacademy.com/" aria-label="DocLevel">
          <img src={doclevelLogo} alt="DocLevel" />
        </a>
      </header>

      <section className="enarm-whatsapp-card">
        <div className="enarm-whatsapp-spinner" aria-hidden="true" />
        <p className="enarm-whatsapp-eyebrow">Grupo oficial ENARM 2026</p>
        <h1>Estamos abriendo el grupo oficial de WhatsApp…</h1>
        <p>
          Cuando se abra WhatsApp, presiona “Unirme al grupo” para terminar.
        </p>
        <a
          className="enarm-whatsapp-manual-button"
          href={whatsappGroupUrl}
          target="_blank"
          rel="noreferrer"
        >
          ABRIR EL GRUPO MANUALMENTE
        </a>
      </section>
    </main>
  );
}
