import { useEffect, useState } from "react";
import { Cookie, Settings2, X } from "lucide-react";
import { consentEventName, readPrivacyConsent, savePrivacyConsent } from "../privacyConsent.js";

export default function CookieConsent({ locale = "fr" }) {
  const fr = locale === "fr";
  const [open, setOpen] = useState(() => !readPrivacyConsent());
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(() => Boolean(readPrivacyConsent()?.optionalAnalytics));

  useEffect(() => {
    const reopen = () => {
      setAnalytics(Boolean(readPrivacyConsent()?.optionalAnalytics));
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(consentEventName, reopen);
    return () => window.removeEventListener(consentEventName, reopen);
  }, []);

  if (!open) return null;

  const choose = (optionalAnalytics) => {
    savePrivacyConsent(optionalAnalytics);
    setOpen(false);
    setDetails(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-5" role="region" aria-label={fr ? "Préférences de confidentialité" : "Privacy preferences"}>
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/20 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigoPop" aria-hidden="true"><Cookie className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-ink">{fr ? "Ta vie privée, simplement" : "Your privacy, simply"}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {fr
                ? "PulsaTeach utilise des stockages nécessaires pour la connexion, la langue et la progression. Les mesures d’audience optionnelles restent désactivées sans ton accord."
                : "PulsaTeach uses necessary storage for sign-in, language, and progress. Optional audience measurement stays off without your consent."}
            </p>
          </div>
          {readPrivacyConsent() && <button type="button" onClick={() => setOpen(false)} className="nav-icon-button shrink-0 px-2" aria-label={fr ? "Fermer" : "Close"}><X className="size-4" /></button>}
        </div>

        {details && (
          <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4">
            <ConsentRow
              title={fr ? "Fonctionnement nécessaire" : "Necessary operation"}
              description={fr ? "Authentification Supabase, sécurité, langue et sauvegarde de progression. Toujours actif." : "Supabase authentication, security, language, and progress saving. Always active."}
              checked
              disabled
            />
            <ConsentRow
              title={fr ? "Mesure d’audience optionnelle" : "Optional audience measurement"}
              description={fr ? "Aucun outil de mesure tiers n’est actuellement chargé. Ce choix prépare son éventuelle activation future." : "No third-party measurement tool is currently loaded. This choice controls any future activation."}
              checked={analytics}
              onChange={setAnalytics}
            />
          </div>
        )}

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <a href="#/cookies" className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-bold text-indigoPop hover:underline">
            {fr ? "Politique cookies" : "Cookie policy"}
          </a>
          <button type="button" onClick={() => setDetails((value) => !value)} className="secondary-button min-h-11 py-2 text-sm">
            <Settings2 className="size-4" />{details ? (fr ? "Masquer les détails" : "Hide details") : (fr ? "Personnaliser" : "Customize")}
          </button>
          <button type="button" onClick={() => choose(details ? analytics : false)} className="secondary-button min-h-11 py-2 text-sm">
            {fr ? "Nécessaires uniquement" : "Necessary only"}
          </button>
          <button type="button" onClick={() => choose(true)} className="primary-button min-h-11 py-2 text-sm">
            {fr ? "Tout accepter" : "Accept all"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({ title, description, checked, disabled = false, onChange }) {
  return (
    <label className={`flex items-start gap-3 rounded-xl border border-slate-200 p-3 ${disabled ? "bg-slate-50" : "cursor-pointer bg-white"}`}>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-ink">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span>
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} className="mt-1 size-5 accent-indigo-600" />
    </label>
  );
}
