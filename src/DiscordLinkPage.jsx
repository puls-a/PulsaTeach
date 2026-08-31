import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Link2, ShieldAlert } from "lucide-react";
import { linkDiscordAccount } from "./apiClient.js";
import { useSupabaseSession } from "./authState.js";
import { signInWithDiscord } from "./discordAuth.js";

export default function DiscordLinkPage({ locale = "fr" }) {
  const fr = locale === "fr";
  const { loading } = useSupabaseSession();
  const attempted = useRef(false);
  const [status, setStatus] = useState({ type: "loading", message: "" });
  const state = new URLSearchParams(window.location.search).get("state") || "";

  useEffect(() => {
    if (loading) return;
    if (attempted.current) return;
    attempted.current = true;
    let active = true;
    if (!state) {
      setStatus({ type: "error", message: fr ? "Ce lien Discord est incomplet." : "This Discord link is incomplete." });
      return;
    }

    linkDiscordAccount(state).then(() => {
      if (active) setStatus({ type: "success", message: fr ? "Ton compte Discord est maintenant lié à PulsaTeach." : "Your Discord account is now linked to PulsaTeach." });
    }).catch((error) => {
      if (!active) return;
      if (error.code === "AUTH_REQUIRED" || error.code === "DISCORD_OAUTH_REQUIRED") {
        setStatus({ type: "auth", message: fr ? "Continue avec Discord pour créer ou connecter ton compte PulsaTeach." : "Continue with Discord to create or connect your PulsaTeach account." });
        return;
      }
      setStatus({ type: "error", message: discordLinkError(error.code, fr) });
    });

    return () => { active = false; };
  }, [fr, loading, state]);

  const handleDiscordAuth = async () => {
    setStatus({ type: "loading", message: fr ? "Redirection sécurisée vers Discord..." : "Redirecting securely to Discord..." });
    try {
      await signInWithDiscord({
        returnTo: `${window.location.pathname}${window.location.search}`,
        resumeDirectly: true
      });
    } catch {
      setStatus({ type: "error", message: fr ? "La connexion Discord est indisponible. Tu peux utiliser une autre méthode de connexion." : "Discord sign-in is unavailable. You can use another sign-in method." });
    }
  };

  const success = status.type === "success";
  const error = status.type === "error";
  const needsAuth = status.type === "auth";
  const Icon = success ? CheckCircle2 : error ? ShieldAlert : Link2;

  return (
    <section className="app-page min-h-screen bg-slate-50">
      <div className="surface mx-auto max-w-xl text-center">
        <span className={`mx-auto grid size-16 place-items-center rounded-2xl ${success ? "bg-green-100 text-green-700" : error ? "bg-red-100 text-red-700" : "bg-indigo-100 text-indigoPop"}`}>
          <Icon className="size-8" />
        </span>
        <p className="eyebrow mt-6">Discord + PulsaTeach</p>
        <h1 className="mt-3 font-display text-4xl font-bold">
          {success ? (fr ? "Comptes liés" : "Accounts linked") : error ? (fr ? "Liaison impossible" : "Unable to link") : needsAuth ? (fr ? "Crée ton compte avec Discord" : "Create your account with Discord") : (fr ? "Liaison sécurisée en cours" : "Secure linking in progress")}
        </h1>
        <p className="mt-4 leading-7 text-slate-600" role={error ? "alert" : "status"}>
          {status.message || (fr ? "Nous vérifions le lien à usage unique envoyé par PulsaBot." : "We are verifying the one-time link sent by PulsaBot.")}
        </p>
        {needsAuth && (
          <div className="mt-7 grid gap-3">
            <button type="button" onClick={handleDiscordAuth} className="primary-button mx-auto">
              <DiscordMark />{fr ? "Continuer avec Discord" : "Continue with Discord"}
            </button>
            <p className="text-xs leading-5 text-slate-500">
              {fr ? "En continuant, tu acceptes les " : "By continuing, you accept the "}<a href="/terms" className="font-bold text-indigoPop underline">{fr ? "conditions" : "terms"}</a>{fr ? " et la " : " and "}<a href="/privacy" className="font-bold text-indigoPop underline">{fr ? "politique de confidentialité" : "privacy policy"}</a>.
            </p>
            <p className="text-xs text-slate-500">{fr ? "Si tu as déjà un compte PulsaTeach, connecte-toi d’abord puis relance ce lien pour y ajouter Discord." : "If you already have a PulsaTeach account, sign in first, then reopen this link to add Discord."}</p>
          </div>
        )}
        {(success || error) && <a href={success ? "/dashboard" : "/"} className="primary-button mt-7">{success ? (fr ? "Voir ma progression" : "View my progress") : (fr ? "Retour à l’accueil" : "Back to home")}</a>}
      </div>
    </section>
  );
}

function DiscordMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="currentColor"><path d="M19.54 5.34a16.7 16.7 0 0 0-4.13-1.28.08.08 0 0 0-.09.04c-.18.32-.39.73-.53 1.06a15.6 15.6 0 0 0-4.68 0 10.6 10.6 0 0 0-.54-1.06.08.08 0 0 0-.09-.04 16.5 16.5 0 0 0-4.13 1.28.08.08 0 0 0-.04.03C2.69 9.28 1.98 13.1 2.34 16.86c0 .02.02.05.04.06a16.8 16.8 0 0 0 5.07 2.56.09.09 0 0 0 .1-.03c.39-.53.73-1.09 1.03-1.68a.08.08 0 0 0-.05-.12 11 11 0 0 1-1.58-.75.08.08 0 0 1 0-.14l.31-.24a.08.08 0 0 1 .08 0c3.03 1.38 6.31 1.38 9.3 0a.08.08 0 0 1 .09 0l.31.24a.08.08 0 0 1 0 .14c-.5.3-1.03.55-1.58.75a.08.08 0 0 0-.04.12c.3.59.64 1.15 1.02 1.68.03.03.07.04.1.03a16.7 16.7 0 0 0 5.08-2.56.08.08 0 0 0 .03-.06c.43-4.35-.72-8.14-3.08-11.49a.07.07 0 0 0-.04-.03ZM8.68 14.57c-.91 0-1.66-.84-1.66-1.87 0-1.04.73-1.88 1.66-1.88.93 0 1.67.85 1.66 1.88 0 1.03-.73 1.87-1.66 1.87Zm6.65 0c-.92 0-1.66-.84-1.66-1.87 0-1.04.73-1.88 1.66-1.88.93 0 1.67.85 1.66 1.88 0 1.03-.73 1.87-1.66 1.87Z" /></svg>;
}

function discordLinkError(code, fr) {
  const messages = {
    DISCORD_LINK_EXPIRED: fr ? "Ce lien a expiré. Demande un nouveau lien à PulsaBot." : "This link expired. Request a new one from PulsaBot.",
    DISCORD_LINK_REPLAYED: fr ? "Ce lien à usage unique a déjà été utilisé." : "This one-time link has already been used.",
    DISCORD_ACCOUNT_ALREADY_LINKED: fr ? "Ce compte Discord est déjà lié à un autre compte PulsaTeach." : "This Discord account is already linked to another PulsaTeach account.",
    DISCORD_OAUTH_REQUIRED: fr ? "Connecte et vérifie ton identité Discord pour utiliser ce lien." : "Sign in with Discord to verify and use this link.",
    DISCORD_IDENTITY_MISMATCH: fr ? "Le compte Discord connecté ne correspond pas au lien demandé." : "The signed-in Discord account does not match this link.",
    DISCORD_LINK_INVALID_SIGNATURE: fr ? "La signature de ce lien Discord est invalide." : "This Discord link has an invalid signature.",
    DISCORD_LINK_INVALID_TIME: fr ? "La durée de validité de ce lien Discord est invalide." : "This Discord link has invalid timing.",
    DISCORD_LINK_INVALID: fr ? "Ce lien Discord est invalide." : "This Discord link is invalid."
  };
  return messages[code] || (fr ? "La liaison a échoué. Réessaie depuis PulsaBot." : "Linking failed. Try again from PulsaBot.");
}
