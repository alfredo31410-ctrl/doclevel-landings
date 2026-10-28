import { useEffect } from "react";
import { X } from "lucide-react";

import {
  activeCampaignEmbedUrl,
  activeCampaignFormClass,
  activeCampaignFormId,
  activeCampaignFormSelector,
  canonicalThanksUrl,
} from "./config";
import { trackAbcCompleteRegistration } from "./tracking";

export function ActiveCampaignModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    let hasAttemptedSubmit = false;
    let hasRedirected = false;

    document
      .querySelectorAll(`script[data-active-campaign-form="${activeCampaignFormId}"]`)
      .forEach((script) => script.remove());

    const script = document.createElement("script");
    script.src = activeCampaignEmbedUrl;
    script.charset = "utf-8";
    script.async = true;
    script.dataset.activeCampaignForm = activeCampaignFormId;
    document.body.appendChild(script);

    const goToThanks = () => {
      if (hasRedirected) return;
      hasRedirected = true;

      window.setTimeout(() => {
        window.location.assign(canonicalThanksUrl);
      }, 900);
    };

    const handleClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const wrapper = target.closest(activeCampaignFormSelector);
      if (!wrapper) return;

      const submitControl = target.closest(
        'button, input[type="submit"], ._submit'
      );

      if (submitControl) hasAttemptedSubmit = true;
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const observer = new MutationObserver(() => {
      const formWrapper = document.querySelector(activeCampaignFormSelector);
      if (!hasAttemptedSubmit || !formWrapper) return;

      const successMessage = [
        ...formWrapper.querySelectorAll(
          "._form-thank-you, ._form-thank-you-message, ._form_success"
        ),
      ].find((node) => {
        if (!(node instanceof HTMLElement)) return false;
        const text = node.textContent?.trim();
        return Boolean(text) && window.getComputedStyle(node).display !== "none";
      });

      if (!successMessage) return;

      trackAbcCompleteRegistration();
      goToThanks();
    });

    document.body.style.overflow = "hidden";
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop abc-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="modal abc-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Formulario de registro"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          <X aria-hidden="true" />
        </button>

        <p className="abc-modal-kicker">Reserva tu lugar gratis</p>
        <h2>Regístrate a El ABC de la consulta pediátrica</h2>
        <p className="abc-modal-copy">
          Completa tus datos para recibir el acceso y los recordatorios de la
          clase.
        </p>

        <div className="active-campaign-embed abc-active-campaign">
          <div className={activeCampaignFormClass} />
        </div>
      </section>
    </div>
  );
}
