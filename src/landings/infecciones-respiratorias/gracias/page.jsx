import { useEffect } from "react";
import { CalendarDays, CheckCircle2, Check, Clock3, MessageCircle, Monitor } from "lucide-react";

import { infeccionesRespiratoriasConfig } from "../config";
import doclevelLogo from "../../../../public/imgs-logos/doclevel-logo-blue-cropped.png";
import { captureRespiratoryAttribution, trackRespiratoryWhatsAppJoin } from "../tracking";
import "../styles.css";

function RespLogo() {
  return (
    <a className="resp-logo" href="https://www.doclevelacademy.com/" aria-label="Volver al sitio principal de DocLevel">
      <img src={doclevelLogo} alt="DocLevel" />
    </a>
  );
}

export default function InfeccionesRespiratoriasGraciasPage() {
  useEffect(() => {
    document.title = `Último paso | ${infeccionesRespiratoriasConfig.title}`;
    captureRespiratoryAttribution(window.location.search);
  }, []);

  return (
    <main className="resp-page resp-thanks-page">
      <header className="resp-header"><RespLogo /><span className="resp-header-badge">Último paso</span></header>
      <section className="resp-thanks">
        <div className="resp-thanks-card">
          <div className="resp-thanks-confirmation"><CheckCircle2 aria-hidden="true" /><span>Registro confirmado</span></div>
          <p className="resp-section-label">Un paso más para recibir tu acceso</p>
          <h1>Entra al grupo oficial de <span>WhatsApp.</span></h1>
          <p>Ahí compartiremos la liga, recordatorios e indicaciones de la clase.</p>
          <a className="resp-cta" href={infeccionesRespiratoriasConfig.thankYou.whatsappUrl} target="_blank" rel="noreferrer" onClick={trackRespiratoryWhatsAppJoin}><MessageCircle aria-hidden="true" /> Unirme al grupo ahora</a>
          <small><Check aria-hidden="true" /> Es el último paso para recibir los avisos de la clase.</small>
          <div className="resp-thanks-data">
            <span><CalendarDays aria-hidden="true" /> {infeccionesRespiratoriasConfig.date}</span>
            <span><Clock3 aria-hidden="true" /> {infeccionesRespiratoriasConfig.time} · {infeccionesRespiratoriasConfig.timezone}</span>
            <span><Monitor aria-hidden="true" /> {infeccionesRespiratoriasConfig.modality}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
