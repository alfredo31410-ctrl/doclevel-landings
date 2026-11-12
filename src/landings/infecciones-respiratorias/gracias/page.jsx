import { useEffect } from "react";
import { CalendarDays, CheckCircle2, Clock3, MessageCircle, Monitor } from "lucide-react";

import { infeccionesRespiratoriasConfig } from "../config";
import doclevelLogo from "../../../../public/imgs-logos/doclevel-logo-blue-cropped.png";
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
  }, []);

  return (
    <main className="resp-page resp-thanks-page">
      <header className="resp-header"><RespLogo /><span className="resp-header-badge">Último paso</span></header>
      <section className="resp-thanks">
        <CheckCircle2 aria-hidden="true" />
        <p className="resp-section-label">Tu registro está casi completo</p>
        <h1>Entra al grupo oficial de <span>WhatsApp.</span></h1>
        <p>Ahí recibirás el acceso, recordatorios e indicaciones para la clase.</p>
        <a className="resp-cta" href={infeccionesRespiratoriasConfig.thankYou.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Entrar al grupo de WhatsApp</a>
        <div className="resp-thanks-data">
          <span><CalendarDays aria-hidden="true" /> {infeccionesRespiratoriasConfig.date}</span>
          <span><Clock3 aria-hidden="true" /> {infeccionesRespiratoriasConfig.time} · {infeccionesRespiratoriasConfig.timezone}</span>
          <span><Monitor aria-hidden="true" /> {infeccionesRespiratoriasConfig.modality}</span>
        </div>
      </section>
    </main>
  );
}
