import { useEffect, useRef, useState } from "react";
import { Database, X } from "lucide-react";
import { consentEventName } from "../privacyConsent.js";

export default function CookieConsent({ locale = "fr" }) {
  const fr = locale === "fr";
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    const reopen = () => {
      previousFocus.current = document.activeElement;
      setOpen(true);
    };
    window.addEventListener(consentEventName, reopen);
    return () => window.removeEventListener(consentEventName, reopen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusable = dialogRef.current?.querySelectorAll("a[href], button:not([disabled])") || [];
    focusable[0]?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    previousFocus.current?.focus?.();
  };

  const trapFocus = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...(dialogRef.current?.querySelectorAll("a[href], button:not([disabled])") || [])];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;
  return (
    <div ref={dialogRef} onKeyDown={trapFocus} className="fixed inset-0 z-[90] grid place-items-end bg-slate-950/30 p-2 sm:place-items-center sm:p-5" role="dialog" aria-modal="true" aria-label={fr ? "Stockages locaux utilisés" : "Local storage in use"}>
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigoPop"><Database className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-ink">{fr ? "Pas de cookies publicitaires" : "No advertising cookies"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{fr ? "PulsaTeach utilise seulement les stockages nécessaires à la connexion, à la langue, aux brouillons et à la progression. Aucun outil tiers de publicité, profilage ou mesure d’audience n’est chargé." : "PulsaTeach only uses storage required for sign-in, language, drafts, and progress. No third-party advertising, profiling, or audience-measurement tool is loaded."}</p>
          </div>
          <button type="button" onClick={close} className="nav-icon-button shrink-0" aria-label={fr ? "Fermer" : "Close"}><X className="size-4" /></button>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <a href="/cookies" className="secondary-button min-h-11 text-center">{fr ? "Voir le détail" : "View details"}</a>
          <button type="button" onClick={close} className="primary-button min-h-11">{fr ? "Compris" : "Got it"}</button>
        </div>
      </div>
    </div>
  );
}
