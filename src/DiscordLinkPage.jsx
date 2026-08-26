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
    if (loading || attempted.current) return;
    attempted.current = true;
    if (!state) { setStatus({ type: "error", message: fr ? "Ce lien Discord est incomplet." : "This Discord link is incomplete." }); return; }
    linkDiscordAccount(state).then(() => setStatus({ type: "success", message: fr ? "Ton compte Discord est maintenant lié à PulsaTeach." : "Your Discord account is now linked to PulsaTeach." })).catch((error) => setStatus(error.code === "AUTH_REQUIRED" || error.code === "DISCORD_OAUTH_REQUIRED" ? { type: "auth", message: fr ? "Continue avec Discord pour vérifier ton identité." : "Continue with Discord to verify your identity." } : { type: "error", message: error.message || "Discord linking failed." }));
  }, [fr, loading, state]);
  const Icon = status.type === "success" ? CheckCircle2 : status.type === "error" ? ShieldAlert : Link2;
  return <section className="app-page min-h-screen bg-slate-50"><div className="surface mx-auto max-w-xl text-center"><Icon className="mx-auto size-12 text-indigoPop" /><p className="eyebrow mt-6">Discord + PulsaTeach</p><h1 className="mt-3 font-display text-4xl font-bold">{status.type === "success" ? (fr ? "Comptes liés" : "Accounts linked") : fr ? "Liaison Discord" : "Discord linking"}</h1><p className="mt-4 text-slate-600" role={status.type === "error" ? "alert" : "status"}>{status.message || (fr ? "Vérification du lien sécurisé..." : "Verifying secure link...")}</p>{status.type === "auth" && <button type="button" className="primary-button mt-7" onClick={() => signInWithDiscord({ returnTo: `${window.location.pathname}${window.location.search}`, resumeDirectly: true }).catch(() => setStatus({ type: "error", message: "Discord sign-in is unavailable." }))}>{fr ? "Continuer avec Discord" : "Continue with Discord"}</button>}{(status.type === "success" || status.type === "error") && <a href={status.type === "success" ? "/dashboard" : "/"} className="primary-button mt-7">{fr ? "Continuer" : "Continue"}</a>}</div></section>;
}
