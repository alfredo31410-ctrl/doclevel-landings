import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Baby,
  BookOpen,
  Bot,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import doclevelLogo from "../../assets/papa-primerizo/doclevel-logo.png";
import doctorPapaPrimerizo from "../../assets/papa-primerizo/doctor-papa-primerizo.png";

const icons = {
  baby: Baby,
  ebook: BookOpen,
  ai: Bot,
};

function trackMetaEvent(eventName, parameters = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, parameters);
  }
}

function getCurrencyFromPrice(price = "") {
  if (price.includes("USD")) return "USD";
  if (price.includes("COP")) return "COP";
  return "MXN";
}

function goToCheckout(landing) {
  trackMetaEvent("InitiateCheckout", {
    content_name: landing.title,
    content_category: landing.productType,
    currency: getCurrencyFromPrice(landing.price),
    value: landing.numericPrice,
    market: landing.market,
  });

  window.setTimeout(() => {
    window.location.href = landing.checkoutUrl;
  }, 450);
}

function CheckoutButton({ landing, className = "" }) {
  const handleClick = (event) => {
    event.preventDefault();
    goToCheckout(landing);
  };

  return (
    <a
      className={`checkout-button ${className}`}
      href={landing.checkoutUrl}
      onClick={handleClick}
      aria-label={`Inscribirme a ${landing.title}`}
    >
      <CreditCard aria-hidden="true" />
      Inscribirme YA
    </a>
  );
}

function FloatingCheckout({ landing }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <CheckoutButton landing={landing} className="floating-checkout" />,
    document.body
  );
}

export function DirectSaleLanding({ landing }) {
  const Icon = icons[landing.icon] || Baby;
  const heroImage = landing.image || doctorPapaPrimerizo;

  useEffect(() => {
    document.title = `${landing.title} | DocLevel`;

    trackMetaEvent("ViewContent", {
      content_name: landing.title,
      content_category: landing.productType,
      currency: getCurrencyFromPrice(landing.price),
      value: landing.numericPrice,
      market: landing.market,
    });
  }, [landing]);

  return (
    <>
      <main className={`sale-page ${landing.variant || ""}`}>
        <header className="landing-header" aria-label="DocLevel">
          <img src={doclevelLogo} alt="DocLevel" />
        </header>

        <section className="sale-hero">
          <div className="sale-copy">
            <p className="sale-eyebrow">
              <Sparkles aria-hidden="true" />
              {landing.eyebrow}
            </p>

            <h1>{landing.headline}</h1>

            <p className="sale-description">{landing.description}</p>

            <div className="trust-row">
              <span>
                <CheckCircle2 aria-hidden="true" />
                Acceso directo
              </span>

              <span>
                <ShieldCheck aria-hidden="true" />
                Pago seguro
              </span>
            </div>

            <div className="mobile-price-card">
              <span>Inversión</span>
              <strong>{landing.price}</strong>
            </div>

            <CheckoutButton landing={landing} className="desktop-checkout" />

            <p className="checkout-note">
              Al tocar el botón, irás directamente a la página de pago.
            </p>
          </div>

          <div className="sale-person">
            <span className="sale-person-glow" aria-hidden="true" />
            <img src={heroImage} alt={landing.title} />
          </div>

          <aside className="sale-card">
            <div className="sale-card-icon">
              <Icon aria-hidden="true" />
            </div>

            <p className="card-kicker">{landing.productType}</p>

            <h2>{landing.title}</h2>

            <div className="price-card">
              <span>Inversión</span>
              <strong>{landing.price}</strong>
              <small>{landing.market}</small>
            </div>

            <ul>
              {landing.bullets.map((bullet) => (
                <li key={bullet}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <p className="guarantee-text">{landing.note}</p>
          </aside>
        </section>
      </main>

      <FloatingCheckout landing={landing} />
    </>
  );
}