import { useEffect, useState } from "react";
import { Award, CheckCircle2, KeyRound, Target, UserRound } from "lucide-react";
import { getPublicCertificate, getUserSettings, saveUserSettings } from "./apiClient.js";
import { useSupabaseSession } from "./authState.js";
import { getSupabaseClient } from "./supabaseClient.js";
import { navigate } from "./navigation.js";

export function OnboardingPage({ locale = "fr" }) {
  const fr = locale === "fr";
  const { user, loading } = useSupabaseSession();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    displayName: "",
    goal: "frontend-foundations",
    weeklyMinutes: 120,
    locale,
    bio: ""
  });

  useEffect(() => {
    if (!user) return;
    getUserSettings().then((profile) => setForm((current) => ({
      ...current,
      displayName: current.displayName || (profile.displayName === "PulsaTeach Learner" ? "" : profile.displayName || user.user_metadata?.full_name || user.user_metadata?.name || ""),
      goal: profile.goal || current.goal,
      weeklyMinutes: profile.weeklyMinutes || current.weeklyMinutes,
      locale: profile.locale || locale,
      bio: current.bio || profile.bio || ""
    }))).catch(() => {});
  }, [locale, user]);

  const finish = async () => {
    setStatus("saving");
    try {
      await saveUserSettings({ ...form, onboardingCompleted: true });
      setStatus("saved");
      navigate("/dashboard");
    } catch (error) {
      setStatus(error.message || "error");
    }
  };

  if (loading) return <AccountState text={fr ? "Chargement du compte..." : "Loading account..."} />;
  if (!user) {
    return (
      <AccountState
        text={fr ? "Connecte-toi pour personnaliser ton parcours." : "Sign in to personalize your path."}
        action={{ href: "/signup", label: fr ? "Créer un compte" : "Create account" }}
      />
    );
  }

  return (
    <section className="app-page">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">{fr ? `Étape ${step} sur 3` : `Step ${step} of 3`}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-indigoPop transition-all" style={{ width: `${step * 33.34}%` }} />
        </div>
        <div className="surface mt-6">
          {step === 1 && (
            <OnboardingStep icon={UserRound} title={fr ? "Comment doit-on t'appeler ?" : "What should we call you?"} text={fr ? "Ce nom apparaîtra sur ton profil et tes futurs certificats." : "This name appears on your profile and future certificates."}>
              <Field label={fr ? "Nom affiché" : "Display name"} value={form.displayName} onChange={(displayName) => setForm({ ...form, displayName })} />
              <Field label={fr ? "Courte présentation, facultative" : "Short bio, optional"} value={form.bio} onChange={(bio) => setForm({ ...form, bio })} multiline />
            </OnboardingStep>
          )}
          {step === 2 && (
            <OnboardingStep icon={Target} title={fr ? "Quel est ton objectif ?" : "What is your goal?"} text={fr ? "Le parcours conseillé utilisera ce choix pour prioriser les prochaines leçons." : "Your recommended path uses this choice to prioritize lessons."}>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["frontend-foundations", fr ? "Comprendre les bases" : "Learn foundations"],
                  ["portfolio-ready", fr ? "Créer un portfolio" : "Build a portfolio"],
                  ["job-ready", fr ? "Préparer un emploi" : "Prepare for a job"]
                ].map(([value, label]) => (
                  <button key={value} type="button" onClick={() => setForm({ ...form, goal: value })} className={`min-h-24 rounded-xl border p-4 text-left font-bold transition-colors ${form.goal === value ? "border-indigoPop bg-indigo-50 text-indigoPop" : "border-slate-200 bg-white hover:border-indigo-200"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </OnboardingStep>
          )}
          {step === 3 && (
            <OnboardingStep icon={CheckCircle2} title={fr ? "Choisis un rythme réaliste" : "Choose a realistic pace"} text={fr ? "Une petite régularité vaut mieux qu'un objectif impossible à tenir." : "A small consistent habit beats an unrealistic target."}>
              <div className="grid gap-3 sm:grid-cols-3">
                {[60, 120, 240].map((minutes) => (
                  <button key={minutes} type="button" onClick={() => setForm({ ...form, weeklyMinutes: minutes })} className={`rounded-xl border p-4 font-bold transition-colors ${form.weeklyMinutes === minutes ? "border-indigoPop bg-indigo-50 text-indigoPop" : "border-slate-200 bg-white hover:border-indigo-200"}`}>
                    {minutes} min / {fr ? "semaine" : "week"}
                  </button>
                ))}
              </div>
            </OnboardingStep>
          )}

          <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5">
            <button type="button" disabled={step === 1} onClick={() => setStep((current) => current - 1)} className="secondary-button disabled:opacity-40">{fr ? "Précédent" : "Back"}</button>
            {step < 3
              ? <button type="button" disabled={step === 1 && !form.displayName.trim()} onClick={() => setStep((current) => current + 1)} className="primary-button disabled:opacity-50">{fr ? "Continuer" : "Continue"}</button>
              : <button type="button" disabled={status === "saving"} onClick={finish} className="primary-button disabled:opacity-60">{fr ? "Commencer mon parcours" : "Start my path"}</button>}
          </div>
          {status !== "idle" && status !== "saving" && status !== "saved" && <p className="status-error mt-4 rounded-xl p-3" role="alert">{status}</p>}
        </div>
      </div>
    </section>
  );
}

export function PasswordRecoveryPage({ locale = "fr" }) {
  const fr = locale === "fr";
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const supabase = await getSupabaseClient();
    if (!supabase) return;
    const { error } = await supabase.auth.updateUser({ password });
    setStatus(error ? error.message : (fr ? "Mot de passe modifié. Tu peux reprendre ton parcours." : "Password updated. You can resume learning."));
  };

  return (
    <section className="app-page">
      <form onSubmit={submit} className="surface mx-auto max-w-xl">
        <KeyRound className="size-10 text-indigoPop" />
        <h1 className="mt-4 font-display text-4xl font-bold">{fr ? "Choisis un nouveau mot de passe" : "Choose a new password"}</h1>
        <label className="mt-6 block text-sm font-bold">
          {fr ? "Nouveau mot de passe" : "New password"}
          <input type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="form-control mt-2 w-full" autoComplete="new-password" />
        </label>
        <button type="submit" className="primary-button mt-5">{fr ? "Mettre à jour" : "Update password"}</button>
        {status && <p className="mt-4 rounded-xl bg-slate-100 p-3 font-semibold" role="status">{status}</p>}
      </form>
    </section>
  );
}

export function PublicCertificatePage({ locale = "fr", verificationCode }) {
  const fr = locale === "fr";
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPublicCertificate(verificationCode).then(setData).catch(() => setError(true));
  }, [verificationCode]);

  if (error) return <AccountState text={fr ? "Certificat introuvable ou code invalide." : "Certificate not found or invalid code."} />;
  if (!data) return <AccountState text={fr ? "Vérification du certificat..." : "Verifying certificate..."} />;
  const certificate = data.certificate;
  const statusLabel = data.status === "expired"
    ? (fr ? "Certificat expiré" : "Expired certificate")
    : data.status === "revoked"
      ? (fr ? "Certificat révoqué" : "Revoked certificate")
      : (fr ? "Certificat vérifié" : "Verified certificate");

  return (
    <section className="app-page">
      <article className="mx-auto max-w-4xl rounded-3xl border-2 border-indigo-200 bg-white p-8 text-center shadow-xl shadow-indigo-950/10 sm:p-12">
        <Award className="mx-auto size-16 text-indigoPop" />
        <p className={`mt-5 font-bold ${data.valid ? "text-green-700" : "text-red-700"}`}>{statusLabel}</p>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{certificate.title?.[locale] || certificate.title?.en}</h1>
        <p className="mt-8 text-lg text-slate-600">{fr ? "Délivré à" : "Issued to"}</p>
        <p className="mt-2 font-display text-3xl font-bold">{certificate.learnerName}</p>
        <p className="mt-8 text-sm font-semibold text-slate-500">{new Date(certificate.issuedAt).toLocaleDateString(locale)}</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">{fr ? "Version du certificat" : "Certificate version"} {certificate.certificateVersion || 1}</p>
        {certificate.evidence?.skills?.length > 0 && (
          <div className="mt-8 text-left">
            <h2 className="font-display text-xl font-bold">{fr ? "Compétences vérifiées" : "Verified skills"}</h2>
            <div className="mt-3 flex flex-wrap gap-2">{certificate.evidence.skills.map((skill) => <span key={skill} className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-800">{skill}</span>)}</div>
          </div>
        )}
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">{fr ? "Examens réussis" : "Exams passed"}</p><p className="mt-2 text-xl font-black">{certificate.evidence?.exams?.completed ?? "—"}/{certificate.evidence?.exams?.required ?? "—"}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">{fr ? "Projets approuvés" : "Approved projects"}</p><p className="mt-2 text-xl font-black">{certificate.evidence?.projects?.approved ?? "—"}/{certificate.evidence?.projects?.required ?? "—"}</p></div>
        </div>
        <p className="mt-2 break-all font-mono text-xs text-slate-400">{certificate.verificationCode}</p>
        <button type="button" onClick={() => window.print()} className="secondary-button mt-6 print:hidden">{fr ? "Imprimer le certificat" : "Print certificate"}</button>
      </article>
    </section>
  );
}

function OnboardingStep({ icon: Icon, title, text, children }) {
  return (
    <div>
      <Icon className="size-10 text-indigoPop" />
      <h1 className="mt-4 font-display text-4xl font-bold">{title}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">{text}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false }) {
  const Component = multiline ? "textarea" : "input";
  return (
    <label className="mt-4 block text-sm font-bold">
      {label}
      <Component value={value} onChange={(event) => onChange(event.target.value)} className={`form-control mt-2 w-full ${multiline ? "min-h-28" : ""}`} />
    </label>
  );
}

function AccountState({ text, action }) {
  return (
    <section className="app-page">
      <div className="surface mx-auto max-w-xl text-center">
        <p className="font-display text-2xl font-bold">{text}</p>
        {action && <a href={action.href} className="primary-button mt-5">{action.label}</a>}
      </div>
    </section>
  );
}
