import { useState } from "react";
import { Github, KeyRound, LockKeyhole, LogOut, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { createLocalSession, signOutSupabase, syncSessionUserId, useSupabaseSession } from "./authState.js";
import { isSupabaseBrowserConfigured, supabase } from "./supabaseClient.js";

const providers = [
  { id: "github", label: "GitHub", icon: Github },
  { id: "google", label: "Google", icon: KeyRound },
  { id: "discord", label: "Discord", icon: ShieldCheck }
];
const useLocalAuth = import.meta.env.VITE_AUTH_MODE === "local";

const copyMap = {
  en: {
    kicker: "Supabase Auth",
    title: "Sign in to PulsaTeach",
    text: "Use GitHub, Google, Discord, or a secure email/password account powered by Supabase Auth.",
    configured: "Supabase client configured",
    missing: "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.",
    email: "Email",
    password: "Password",
    login: "Sign in",
    signup: "Create account",
    hasAccount: "I already have an account",
    needsAccount: "Create a new account",
    magic: "Send magic link",
    signedIn: "Signed in",
    signOut: "Sign out",
    providerNote: "Enable each provider in Supabase Dashboard > Authentication > Providers."
  },
  fr: {
    kicker: "Compte PulsaTeach",
    title: "Crée ton compte et sauvegarde ta progression",
    text: "Retrouve tes formations, tes leçons terminées, tes projets et tes certifications sur tous tes appareils.",
    configured: "Création de compte disponible",
    missing: "Il manque VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY dans .env.",
    email: "Email",
    password: "Mot de passe",
    login: "Se connecter",
    signup: "Créer un compte",
    hasAccount: "J'ai déjà un compte",
    needsAccount: "Créer un nouveau compte",
    magic: "Envoyer un magic link",
    signedIn: "Connecté",
    signOut: "Se déconnecter",
    providerNote: "Les connexions OAuth doivent être activées dans Supabase avant d'utiliser ces boutons. L'email et le mot de passe fonctionnent déjà."
  }
};

export default function AuthPage({ locale = "en", defaultMode = "login" }) {
  const copy = copyMap[locale] || copyMap.en;
  const { session } = useSupabaseSession();
  const [mode, setMode] = useState(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const signInWithProvider = async (provider) => {
    if (!supabase || useLocalAuth) return;
    setStatus("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) setStatus(error.message);
  };

  const sendMagicLink = async (event) => {
    event.preventDefault();
    if (!supabase || useLocalAuth) return;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    setStatus(error ? error.message : "Magic link sent.");
  };

  const submitPasswordAuth = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setStatus(locale === "fr" ? "Le mot de passe doit contenir au moins 8 caractères." : "Password must be at least 8 characters.");
      return;
    }

    setStatus("");
    if (supabase && !useLocalAuth) {
      try {
        const result = mode === "signup"
          ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
          : await supabase.auth.signInWithPassword({ email, password });
        if (!result.error) {
          syncSessionUserId(result.data.session);
          setStatus(mode === "signup" ? (locale === "fr" ? "Compte créé." : "Account created.") : (locale === "fr" ? "Connexion réussie." : "Signed in successfully."));
          return;
        }
        setStatus(result.error.message);
        return;
      } catch (error) {
        setStatus(error.message || (locale === "fr" ? "Connexion Supabase indisponible." : "Supabase authentication unavailable."));
        return;
      }
    }

    if (!useLocalAuth) {
      setStatus(locale === "fr" ? "Supabase n'est pas configuré. Active VITE_AUTH_MODE=local pour utiliser un compte local en développement." : "Supabase is not configured. Set VITE_AUTH_MODE=local to use local development accounts.");
      return;
    }

    createLocalSession(email);
    setStatus(locale === "fr" ? "Compte local actif. Ta progression est sauvegardée sur cet appareil." : "Local account active. Progress is saved on this device.");
  };

  const signOut = async () => {
    await signOutSupabase();
    setStatus("");
  };

  return (
    <section className="app-page min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
        <div>
          <p className="eyebrow">{copy.kicker}</p>
          <h1 className="page-heading">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{copy.text}</p>
          <div className={`mt-6 rounded-xl border p-4 font-bold ${isSupabaseBrowserConfigured ? "border-green-200 bg-green-50 text-green-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>
            {isSupabaseBrowserConfigured ? copy.configured : copy.missing}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
          {session ? (
            <div>
              <div className="muted-surface">
                <p className="font-display text-2xl font-bold">{copy.signedIn}</p>
                <p className="mt-2 break-all font-semibold text-slate-600">{session.user.email || session.user.id}</p>
              </div>
              <button type="button" onClick={signOut} className="secondary-button mt-5">
                <LogOut className="size-5" />
                {copy.signOut}
              </button>
            </div>
          ) : (
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {providers.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    disabled={!supabase || useLocalAuth}
                    onClick={() => signInWithProvider(id)}
                    className="secondary-button disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Icon className="size-5" />
                    {label}
                  </button>
                ))}
              </div>

              <form onSubmit={submitPasswordAuth} className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold">{mode === "signup" ? copy.signup : copy.login}</h2>
                  <button
                    type="button"
                    onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setStatus(""); }}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold"
                  >
                    {mode === "signup" ? copy.hasAccount : copy.needsAccount}
                  </button>
                </div>
                <div className="grid gap-3">
                  <label className="block">
                    <span className="block text-sm font-semibold text-slate-700">{copy.email}</span>
                    <input
                      id="auth-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-bold outline-none focus:border-indigoPop"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-slate-700">{copy.password}</span>
                    <input
                      type="password"
                      required
                      minLength={8}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-bold outline-none focus:border-indigoPop"
                    />
                  </label>
                  <button type="submit" className="primary-button">
                    {mode === "signup" ? <UserPlus className="size-5" /> : <LockKeyhole className="size-5" />}
                    {mode === "signup" ? copy.signup : copy.login}
                  </button>
                </div>
              </form>

              <form onSubmit={sendMagicLink} className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <label className="block text-sm font-semibold text-slate-700" htmlFor="auth-magic-email">{copy.email}</label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="auth-magic-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="form-control flex-1"
                  />
                  <button type="submit" disabled={!supabase || useLocalAuth} className="primary-button disabled:opacity-50">
                    <Mail className="size-5" />
                    {copy.magic}
                  </button>
                </div>
              </form>

              <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">{copy.providerNote}</p>
              {status && <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700" role="status">{status}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
