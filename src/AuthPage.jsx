import { useState } from "react";
import { Github, KeyRound, LockKeyhole, LogOut, Mail, RotateCcw, ShieldCheck, UserPlus } from "lucide-react";
import { createLocalSession, signOutSupabase, syncSessionUserId, useSupabaseSession } from "./authState.js";
import { isSupabaseBrowserConfigured, supabase } from "./supabaseClient.js";

const providers = [
  { id: "github", label: "GitHub", icon: Github },
  { id: "google", label: "Google", icon: KeyRound },
  { id: "discord", label: "Discord", icon: ShieldCheck }
];
const useLocalAuth = import.meta.env.VITE_AUTH_MODE === "local";

export default function AuthPage({ locale = "fr", defaultMode = "login" }) {
  const fr = locale === "fr";
  const { session } = useSupabaseSession();
  const [mode, setMode] = useState(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const signInWithProvider = async (provider) => {
    if (!supabase || useLocalAuth) return;
    setStatus("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) setStatus(error.message);
  };

  const sendMagicLink = async (event) => {
    event.preventDefault();
    if (!supabase || useLocalAuth) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });
    setBusy(false);
    setStatus(error ? error.message : (fr ? "Lien de connexion envoyé." : "Magic link sent."));
  };

  const submitPasswordAuth = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setStatus(fr ? "Le mot de passe doit contenir au moins 8 caractères." : "Password must be at least 8 characters.");
      return;
    }

    setStatus("");
    setBusy(true);
    if (supabase && !useLocalAuth) {
      try {
        const result = mode === "signup"
          ? await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: { locale, onboarding_completed: false }
              }
            })
          : await supabase.auth.signInWithPassword({ email, password });
        if (result.error) {
          setStatus(result.error.message);
          return;
        }
        syncSessionUserId(result.data.session);
        if (result.data.session) {
          window.location.hash = mode === "signup" ? "#/onboarding" : "#/dashboard";
        } else {
          setStatus(fr
            ? "Compte créé. Confirme ton adresse depuis l'email reçu avant de te connecter."
            : "Account created. Confirm your address from the email before signing in.");
        }
      } catch (error) {
        setStatus(error.message || (fr ? "Authentification indisponible." : "Authentication unavailable."));
      } finally {
        setBusy(false);
      }
      return;
    }

    if (!useLocalAuth) {
      setBusy(false);
      setStatus(fr
        ? "Supabase n'est pas configuré. Le mode local doit être activé explicitement en développement."
        : "Supabase is not configured. Local mode must be explicitly enabled in development.");
      return;
    }
    createLocalSession(email);
    setBusy(false);
    window.location.hash = mode === "signup" ? "#/onboarding" : "#/dashboard";
  };

  const sendPasswordReset = async () => {
    if (!supabase || !email) {
      setStatus(fr ? "Saisis d'abord ton adresse email." : "Enter your email address first.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?recovery=1`
    });
    setBusy(false);
    setStatus(error ? error.message : (fr ? "Email de réinitialisation envoyé." : "Password reset email sent."));
  };

  return (
    <section className="app-page min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">{fr ? "Compte PulsaTeach" : "PulsaTeach account"}</p>
          <h1 className="page-heading">{fr ? "Retrouve ton parcours sur tous tes appareils." : "Keep your learning path on every device."}</h1>
          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            {fr ? "Ton compte synchronise progression, projets, préférences et certificats. Tu peux commencer localement puis tout importer à la première connexion." : "Your account syncs progress, projects, preferences, and certificates. Local work is imported on first sign-in."}
          </p>
          <div className={`mt-6 rounded-xl border p-4 font-bold ${isSupabaseBrowserConfigured ? "border-green-200 bg-green-50 text-green-700" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
            {isSupabaseBrowserConfigured ? (fr ? "Synchronisation Supabase disponible" : "Supabase sync available") : (fr ? "Configuration Supabase manquante" : "Supabase configuration missing")}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
          {session ? (
            <div>
              <div className="muted-surface">
                <p className="font-display text-2xl font-bold">{fr ? "Compte connecté" : "Signed in"}</p>
                <p className="mt-2 break-all font-semibold text-slate-600">{session.user.email || session.user.id}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#/dashboard" className="primary-button">{fr ? "Voir ma progression" : "View progress"}</a>
                <button type="button" onClick={signOutSupabase} className="secondary-button"><LogOut className="size-5" />{fr ? "Se déconnecter" : "Sign out"}</button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                {providers.map(({ id, label, icon: Icon }) => (
                  <button key={id} type="button" disabled={!supabase || useLocalAuth || busy} onClick={() => signInWithProvider(id)} className="secondary-button disabled:cursor-not-allowed disabled:opacity-50">
                    <Icon className="size-5" />{label}
                  </button>
                ))}
              </div>

              <form onSubmit={submitPasswordAuth} className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold">{mode === "signup" ? (fr ? "Créer un compte" : "Create account") : (fr ? "Se connecter" : "Sign in")}</h2>
                  <button type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setStatus(""); }} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold">
                    {mode === "signup" ? (fr ? "J'ai déjà un compte" : "I have an account") : (fr ? "Créer un compte" : "Create account")}
                  </button>
                </div>
                <div className="grid gap-3">
                  <AuthField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
                  <AuthField label={fr ? "Mot de passe" : "Password"} type="password" value={password} onChange={setPassword} autoComplete={mode === "signup" ? "new-password" : "current-password"} />
                  <button type="submit" disabled={busy} className="primary-button disabled:cursor-wait disabled:opacity-60">
                    {mode === "signup" ? <UserPlus className="size-5" /> : <LockKeyhole className="size-5" />}
                    {mode === "signup" ? (fr ? "Créer mon compte" : "Create my account") : (fr ? "Se connecter" : "Sign in")}
                  </button>
                  {mode === "login" && (
                    <button type="button" onClick={sendPasswordReset} disabled={busy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold text-indigoPop hover:bg-indigo-50">
                      <RotateCcw className="size-4" />{fr ? "Mot de passe oublié" : "Forgot password"}
                    </button>
                  )}
                </div>
              </form>

              <form onSubmit={sendMagicLink} className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-700">{fr ? "Connexion sans mot de passe" : "Passwordless sign-in"}</p>
                <button type="submit" disabled={!supabase || useLocalAuth || busy || !email} className="secondary-button mt-3 disabled:opacity-50">
                  <Mail className="size-5" />{fr ? "Envoyer un lien magique" : "Send magic link"}
                </button>
              </form>
              {status && <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700" role="status">{status}</p>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function AuthField({ label, type, value, onChange, autoComplete }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700">{label}</span>
      <input type={type} required minLength={type === "password" ? 8 : undefined} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-bold outline-none focus:border-indigoPop focus:ring-2 focus:ring-indigo-100" />
    </label>
  );
}
