import { useState, useEffect } from "react";
import "./_cookies-banner.scss";

const CookiesBanner = () => {
  const [visible, setVisible] = useState(false);

  // Funciones de utilidad
  const setCookie = (name, value, days = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax;Secure`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
  };

  const disableTracking = () => {
    // Eliminar scripts de tracking
    document
      .querySelectorAll('script[data-track-type="analytics"]')
      .forEach((script) => script.remove());

    // Deshabilitar Google Analytics
    deleteCookie("_ga");
    deleteCookie("_gat");
    deleteCookie("_gid");
    window["ga-disable-UA-XXXXX_X"] = true;

    // Deshabilitar Facebook Pixel
    deleteCookie("_fbp");
    deleteCookie("_fbc");
    if (window.fbq) {
      window.fbq = null;
    }

    // Eliminar otras cookies de tracking
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (name.startsWith("_g") || name.startsWith("_fb")) {
        deleteCookie(name);
      }
    });
  };

  const setConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    setCookie("cookie_consent", value);
    setVisible(false);

    if (value === "rejected") {
      disableTracking();
    }
  };

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    setVisible(!hasConsent);
  }, []);

  if (!visible) return null;

  return (
    <div className={`cookie-banner ${visible ? "visible" : ""}`}>
      <div className="cookie-content">
        Usamos cookies para mejorar tu experiencia. Puedes leer nuestra
        <span>
          <a
            data-astro-prefetch="hover"
            aria-label="Ir a la página de privacidad"
            href="/privacy-policy"
            className="privacy-link"
          >
            política de privacidad
          </a>
        </span>
        para más información.
      </div>
      <div className="cookie-buttons">
        <button
          aria-label="Aceptar cookies"
          className="cookie-button accept"
          onClick={() => setConsent("accepted")}
        >
          Aceptar
        </button>
        <button
          aria-label="Rechazar cookies"
          className="cookie-button reject"
          onClick={() => setConsent("rejected")}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default CookiesBanner;
