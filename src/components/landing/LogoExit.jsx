import doclevelLogo from "../../assets/papa-primerizo/doclevel-logo.png";

export function LogoExit({
  logoSrc = doclevelLogo,
  ariaLabel = "Volver al sitio principal de DocLevel",
}) {
  return (
    <a
      className="logo-exit"
      href="https://www.doclevelacademy.com/"
      aria-label={ariaLabel}
    >
      <img src={logoSrc} alt="DocLevel" />
    </a>
  );
}
