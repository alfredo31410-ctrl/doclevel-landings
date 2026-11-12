import { useEffect } from "react";
import { X } from "lucide-react";

import { infeccionesRespiratoriasConfig } from "./config";
import { trackRespiratoryLead } from "./tracking";

const { activeCampaign, thankYou } = infeccionesRespiratoriasConfig;
const formClass = `_form_${activeCampaign.formId}`;
const formSelector = `.${formClass}`;

export function ActiveCampaignModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    let submitAttempted = false;
    let redirected = false;

    document.querySelectorAll(`script[data-active-campaign-form="${activeCampaign.formId}"]`).forEach((script) => script.remove());

    const script = document.createElement("script");
    script.src = activeCampaign.embedUrl;
    script.charset = "utf-8";
    script.async = true;
    script.dataset.activeCampaignForm = activeCampaign.formId;
    document.body.appendChild(script);

    const goToThanks = () => {
      if (redirected) return;
      redirected = true;
      window.setTimeout(() => window.location.assign(thankYou.url), 850);
    };

    const handleClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.closest(formSelector)) return;
      if (target.closest('button, input[type="submit"], ._submit')) submitAttempted = true;
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const observer = new MutationObserver(() => {
      const wrapper = document.querySelector(formSelector);
      if (!submitAttempted || !wrapper) return;
      const success = [...wrapper.querySelectorAll("._form-thank-you, ._form-thank-you-message, ._form_success")]
        .some((node) => node instanceof HTMLElement && node.textContent?.trim() && window.getComputedStyle(node).display !== "none");
      if (success) {
        trackRespiratoryLead();
        goToThanks();
      }
    });

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="resp-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="resp-modal" role="dialog" aria-modal="true" aria-labelledby="resp-modal-title">
        <button type="button" className="resp-modal-close" onClick={onClose} aria-label="Cerrar formulario"><X aria-hidden="true" /></button>
        <h2 id="resp-modal-title" className="resp-sr-only">Formulario de registro</h2>
        <div className="resp-active-campaign"><div className={formClass} /></div>
      </section>
    </div>
  );
}
