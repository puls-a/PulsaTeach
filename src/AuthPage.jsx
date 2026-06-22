import { useMemo, useState } from "react";
import { Check, Eye, EyeOff, LockKeyhole, LogOut, Mail, RotateCcw, ShieldCheck, UserPlus } from "lucide-react";
import { createLocalSession, signOutSupabase, syncSessionUserId, useSupabaseSession } from "./authState.js";
import { isSupabaseBrowserConfigured, supabase } from "./supabaseClient.js";
import { navigate } from "./navigation.js";

const useLocalAuth = import.meta.env.VITE_AUTH_MODE === "local";

export default function AuthPage({ locale = "fr", defaultMode = "login" }) {
  const fr = locale === "fr";
  const authAvailable = useLocalAuth || isSupabaseBrowserConfigured;
  const { session } = useSupabaseSession();
  const [mode, setMode] = useState(defaultMode);
  const [authMethod, setAuthMethod] = useState("password");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [busy, setBusy] = useState(false);

  const passwordRules = useMemo(() => [
    { label: fr ? "8 caractères minimum" : "At least 8 characters", valid: password.length >= 8 },
    { label: fr ? "Une lettre majuscule" : "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: fr ? "Un chiffre" : "One number", valid: /\d/.test(password) }
  ], [fr, password]);
  const passwordValid = passwordRules.every((rule) => rule.valid);

  const submitPasswordAuth = async (event) => {
    event.preventDefault();
    if (mode === "signup" && !displayName.trim()) {
      setStatus({ type: "error", message: fr ? "Indique le nom qui apparaîtra sur ton profil." : "Enter the name shown on your profile." });
      return;
    }
    if (!passwordValid) {
      setStatus({ type: "error", message: fr ? "Le mot de passe ne respecte pas encore les critères." : "The password does not meet all requirements." });
      return;
    }
    if (mode === "signup" && !acceptedTerms) {
      setStatus({ type: "error", message: fr ? "Accepte les conditions pour créer ton compte." : "Accept the terms to create your account." });
      return;
    }

    setStatus({ type: "idle", message: "" });
    setBusy(true);
    if (supabase && !useLocalAuth) {
      try {
        const result = mode === "signup"
          ? await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: {
                  name: displayName.trim(),
                  full_name: displayName.trim(),
                  locale,
                  onboarding_completed: false,
                  terms_accepted_at: new Date().toISOString(),
                  terms_version: "2026-06-18",
                  privacy_version: "2026-06-18"
                }
              }
            })
          : await supabase.auth.signInWithPassword({ email, password });
        if (result.error) {
          setStatus({ type: "error", message: translateAuthError(result.error.message, fr) });
          return;
        }
        syncSessionUserId(result.data.session);
        if (result.data.session) {
          window.location.assign(mode === "signup" ? "/auth/callback/onboarding" : "/dashboard");
        } else {
          setStatus({
            type: "confirmation",
            message: fr
              ? `Un email de confirmation a été envoyé à ${email}. Ouvre-le pour activer ton compte.`
              : `A confirmation email was sent to ${email}. Open it to activate your account.`
          });
        }
      } catch (error) {
        setStatus({ type: "error", message: error.message || (fr ? "Authentification indisponible." : "Authentication unavailable.") });
      } finally {
        setBusy(false);
      }
      return;
    }

    if (!useLocalAuth) {
      setBusy(false);
      setStatus({ type: "error", message: fr ? "La connexion est temporairement indisponible." : "Sign-in is temporarily unavailable." });
      return;
    }
    createLocalSession(email);
    setBusy(false);
    navigate(mode === "signup" ? "/onboarding" : "/dashboard");
  };

  const sendMagicLink = async (event) => {
    event.preventDefault();
    if (!supabase || useLocalAuth || !email) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback`, shouldCreateUser: false }
    });
    setBusy(false);
    setStatus({
      type: error ? "error" : "success",
      message: error ? translateAuthError(error.message, fr) : (fr ? `Lien de connexion envoyé à ${email}.` : `Sign-in link sent to ${email}.`)
    });
  };

  const resendConfirmation = async () => {
    if (!supabase || !email) return;
    setBusy(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });
    setBusy(false);
    setStatus({
      type: error ? "error" : "success",
      message: error ? translateAuthError(error.message, fr) : (fr ? "Nouvel email de confirmation envoyé." : "A new confirmation email was sent.")
    });
  };

  const sendPasswordReset = async () => {
    if (!supabase || !email) {
      setStatus({ type: "error", message: fr ? "Saisis d'abord ton adresse email." : "Enter your email address first." });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?recovery=1`
    });
    setBusy(false);
    setStatus({
      type: error ? "error" : "success",
      message: error ? translateAuthError(error.message, fr) : (fr ? "Email de réinitialisation envoyé." : "Password reset email sent.")
    });
  };

  if (session) {
    return (
      <section className="app-page min-h-screen bg-slate-50">
        <div className="surface mx-auto max-w-xl">
          <ShieldCheck className="size-12 text-green-600" />
          <h1 className="mt-4 font-display text-4xl font-bold">{fr ? "Ton compte est connecté" : "Your account is connected"}</h1>
          <p className="mt-3 break-all font-semibold text-slate-600">{session.user.email || session.user.id}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/dashboard" className="primary-button">{fr ? "Voir ma progression" : "View progress"}</a>
            <button type="button" onClick={signOutSupabase} className="secondary-button"><LogOut className="size-5" />{fr ? "Se déconnecter" : "Sign out"}</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="app-page min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
        <aside>
          <p className="eyebrow">{fr ? "Compte apprenant gratuit" : "Free learner account"}</p>
          <h1 className="page-heading">{mode === "signup" ? (fr ? "Commence ton parcours sans perdre ta progression." : "Start learning without losing your progress.") : (fr ? "Reprends exactement là où tu t'es arrêté." : "Continue exactly where you stopped.")}</h1>
          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            {fr ? "Un seul compte pour synchroniser tes leçons, tes projets, tes préférences et tes certificats." : "One account syncs your lessons, projects, preferences, and certificates."}
          </p>
          <ul className="mt-6 grid gap-3">
            {[
              fr ? "Progression sauvegardée automatiquement" : "Progress saved automatically",
              fr ? "Parcours personnalisé après l'inscription" : "Personalized path after signup",
              fr ? "Certificats publics et vérifiables" : "Public, verifiable certificates"
            ].map((item) => <li key={item} className="flex items-center gap-3 font-semibold text-slate-700"><span className="grid size-7 place-items-center rounded-full bg-green-100 text-green-700"><Check className="size-4" /></span>{item}</li>)}
          </ul>
          {!authAvailable && <p className="status-error mt-6 rounded-xl p-4 font-semibold">{fr ? "Le service de compte est temporairement indisponible." : "The account service is temporarily unavailable."}</p>}
        </aside>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7">
          <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label={fr ? "Type de compte" : "Account action"}>
            <button type="button" role="tab" aria-selected={mode === "login"} onClick={() => { setMode("login"); setStatus({ type: "idle", message: "" }); }} className={`min-h-11 rounded-lg px-4 text-sm font-bold ${mode === "login" ? "bg-white text-ink shadow-sm" : "text-slate-600"}`}>{fr ? "Connexion" : "Sign in"}</button>
            <button type="button" role="tab" aria-selected={mode === "signup"} onClick={() => { setMode("signup"); setAuthMethod("password"); setStatus({ type: "idle", message: "" }); }} className={`min-h-11 rounded-lg px-4 text-sm font-bold ${mode === "signup" ? "bg-white text-ink shadow-sm" : "text-slate-600"}`}>{fr ? "Créer un compte" : "Create account"}</button>
          </div>

          {mode === "login" && (
            <div className="mt-5 flex gap-2 border-b border-slate-200 pb-4">
              <button type="button" onClick={() => setAuthMethod("password")} className={`rounded-lg px-3 py-2 text-sm font-bold ${authMethod === "password" ? "bg-indigo-50 text-indigoPop" : "text-slate-500"}`}>{fr ? "Mot de passe" : "Password"}</button>
              <button type="button" onClick={() => setAuthMethod("magic")} className={`rounded-lg px-3 py-2 text-sm font-bold ${authMethod === "magic" ? "bg-indigo-50 text-indigoPop" : "text-slate-500"}`}>{fr ? "Lien magique" : "Magic link"}</button>
            </div>
          )}

          {authMethod === "password" || mode === "signup" ? (
            <form onSubmit={submitPasswordAuth} className="mt-5">
              <h2 className="font-display text-3xl font-bold">{mode === "signup" ? (fr ? "Crée ton compte" : "Create your account") : (fr ? "Bon retour" : "Welcome back")}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{mode === "signup" ? (fr ? "L'inscription prend moins d'une minute." : "Signup takes less than a minute.") : (fr ? "Connecte-toi avec l'adresse utilisée lors de l'inscription." : "Use the email address from your signup.")}</p>
              <div className="mt-5 grid gap-4">
                {mode === "signup" && <AuthField label={fr ? "Nom affiché" : "Display name"} type="text" value={displayName} onChange={setDisplayName} autoComplete="name" placeholder={fr ? "Ex. Camille Martin" : "e.g. Camille Martin"} />}
                <AuthField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="toi@exemple.com" />
                <label className="block">
                  <span className="block text-sm font-semibold text-slate-700">{fr ? "Mot de passe" : "Password"}</span>
                  <span className="relative mt-2 block">
                    <input type={showPassword ? "text" : "password"} required autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-12 font-bold outline-none focus:border-indigoPop focus:ring-2 focus:ring-indigo-100" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500" aria-label={showPassword ? (fr ? "Masquer le mot de passe" : "Hide password") : (fr ? "Afficher le mot de passe" : "Show password")}>{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button>
                  </span>
                </label>
                {mode === "signup" && <PasswordChecklist rules={passwordRules} />}
                {mode === "signup" && (
                  <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                    <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1 size-4" />
                    <span>
                      {fr ? "J’accepte les " : "I accept the "}
                      <a href="/terms" className="font-bold text-indigoPop underline">{fr ? "conditions d’utilisation" : "terms of use"}</a>
                      {fr ? " et la " : " and "}
                      <a href="/privacy" className="font-bold text-indigoPop underline">{fr ? "politique de confidentialité" : "privacy policy"}</a>.
                    </span>
                  </label>
                )}
                <button type="submit" disabled={busy || !authAvailable} className="primary-button min-h-12 disabled:cursor-wait disabled:opacity-60">
                  {mode === "signup" ? <UserPlus className="size-5" /> : <LockKeyhole className="size-5" />}
                  {busy ? (fr ? "Traitement..." : "Working...") : mode === "signup" ? (fr ? "Créer mon compte gratuit" : "Create my free account") : (fr ? "Se connecter" : "Sign in")}
                </button>
                {mode === "login" && <button type="button" onClick={sendPasswordReset} disabled={busy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold text-indigoPop hover:bg-indigo-50"><RotateCcw className="size-4" />{fr ? "Mot de passe oublié" : "Forgot password"}</button>}
              </div>
            </form>
          ) : (
            <form onSubmit={sendMagicLink} className="mt-5">
              <Mail className="size-10 text-indigoPop" />
              <h2 className="mt-4 font-display text-3xl font-bold">{fr ? "Connexion par lien magique" : "Sign in with a magic link"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{fr ? "Nous t'envoyons un lien à usage unique. Aucun mot de passe nécessaire." : "We send a one-time link. No password required."}</p>
              <div className="mt-5 grid gap-4">
                <AuthField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="toi@exemple.com" />
                <button type="submit" disabled={busy || !email || !isSupabaseBrowserConfigured} className="primary-button min-h-12 disabled:opacity-50"><Mail className="size-5" />{fr ? "Recevoir mon lien" : "Send my link"}</button>
              </div>
            </form>
          )}

          {status.message && (
            <div className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${status.type === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-800"}`} role={status.type === "error" ? "alert" : "status"}>
              <p>{status.message}</p>
              {status.type === "confirmation" && <button type="button" onClick={resendConfirmation} disabled={busy} className="mt-3 rounded-lg border border-green-300 bg-white px-3 py-2 font-bold text-green-800">{fr ? "Renvoyer l'email" : "Resend email"}</button>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AuthField({ label, type, value, onChange, autoComplete, placeholder }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700">{label}</span>
      <input type={type} required autoComplete={autoComplete} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-bold outline-none placeholder:font-normal placeholder:text-slate-400 focus:border-indigoPop focus:ring-2 focus:ring-indigo-100" />
    </label>
  );
}

function PasswordChecklist({ rules }) {
  return (
    <ul className="grid gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-3">
      {rules.map((rule) => <li key={rule.label} className={`flex items-center gap-2 text-xs font-semibold ${rule.valid ? "text-green-700" : "text-slate-500"}`}><Check className="size-4" />{rule.label}</li>)}
    </ul>
  );
}

function translateAuthError(message, fr) {
  if (!fr) return message;
  const normalized = String(message).toLowerCase();
  if (normalized.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (normalized.includes("email not confirmed")) return "Confirme d'abord ton adresse depuis l'email reçu.";
  if (normalized.includes("user already registered")) return "Un compte existe déjà avec cette adresse.";
  if (normalized.includes("rate limit")) return "Trop de tentatives. Attends quelques minutes avant de réessayer.";
  return message;
}
