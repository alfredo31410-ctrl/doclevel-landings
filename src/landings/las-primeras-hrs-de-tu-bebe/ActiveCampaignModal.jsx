import { useEffect } from "react";
import { X } from "lucide-react";

import {
  activeCampaignEmbedUrl,
  activeCampaignFormClass,
  activeCampaignFormId,
  activeCampaignFormSelector,
  canonicalThanksUrl,
} from "./config";
import { trackBabyCompleteRegistration } from "./tracking";

export function ActiveCampaignModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    let hasAttemptedActiveCampaignSubmit = false;
    let hasRedirected = false;

    const existingScript = document.querySelector(
      `script[data-active-campaign-form="${activeCampaignFormId}"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.src = activeCampaignEmbedUrl;
      script.charset = "utf-8";
      script.async = true;
      script.dataset.activeCampaignForm = activeCampaignFormId;

      document.body.appendChild(script);
    }

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

      if (submitControl) {
        hasAttemptedActiveCampaignSubmit = true;
      }
    };

    const observer = new MutationObserver(() => {
      const formWrapper = document.querySelector(activeCampaignFormSelector);

      if (!hasAttemptedActiveCampaignSubmit || !formWrapper) return;

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

      trackBabyCompleteRegistration();

      goToThanks();
    });

    document.addEventListener("click", handleClick, true);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("click", handleClick, true);
      observer.disconnect();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal"
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

        <p className="eyebrow">Reserva tu lugar gratis</p>
        <h2>Recibe el acceso a Las primeras horas de tu bebé</h2>

        <div className="active-campaign-embed">
          <div className={activeCampaignFormClass} />
        </div>
      </section>
    </div>
  );
}
