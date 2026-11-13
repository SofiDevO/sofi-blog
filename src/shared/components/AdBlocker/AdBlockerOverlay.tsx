import { useEffect, useState } from "react";
import "./_ad-blocker-overlay.scss";

const isAdBlockerActive = (): boolean => {
  // Seignal 1: Google AdSense (window.adsbygoogle) no disponible
  // => el script adsbygoogle.js fue bloqueado por un bloqueador.
  const { adsbygoogle } = window as unknown as { adsbygoogle?: unknown };
  if (typeof adsbygoogle === "undefined") {
    return true;
  }

  // Seignal 2: Brave Shields (API nativa de Brave + brands + user agent)
  const nav = navigator as Navigator & {
    brave?: { enabled?: boolean };
    userAgentData?: { brands?: Array<{ brand?: string; version?: string }> };
  };
  const brands = (nav.userAgentData?.brands ?? []).map((b) =>
    (b.brand ?? "").toLowerCase(),
  );
  const isBrave =
    brands.some((b) => b.includes("brave") || b === "bra") ||
    nav.brave?.enabled === true;

  return isBrave;
};

const AdBlockerOverlay = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkAdBlocker = () => setIsBlocked(isAdBlockerActive());

    const handleLoad = () => checkAdBlocker();

    let cleanup: (() => void) | undefined;
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      cleanup = () => window.removeEventListener("load", handleLoad);
    }

    return () => cleanup?.();
  }, []);

  useEffect(() => {
    if (!isBlocked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isBlocked]);

  if (!isBlocked) return null;

  return (
    <div
      className="ad-blocker-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ad-blocker-overlay-title"
    >
      <div className="ad-blocker-card">
        <h2 id="ad-blocker-overlay-title" className="ad-blocker-title">
          Bloqueo de anuncios detectado
        </h2>
        <p className="ad-blocker-text">
          Detectamos que tu navegador está bloqueando anuncios. Esto sucede, por
          ejemplo, cuando el bloqueador{" "}
          <strong>Brave</strong> está activo y omitía la mayoría de los anuncios.
        </p>
        <p className="ad-blocker-text">
          Si quieres continuar navegando por el sitio, debes desactivar tu
          bloqueador de anuncios.
        </p>
      </div>
    </div>
  );
};

export default AdBlockerOverlay;
