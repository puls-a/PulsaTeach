import { useEffect, useState } from "react";
import { Download, Send, Settings, Trash2, Upload, UserRound } from "lucide-react";
import { deleteAccount, exportAccountData, getUserSettings, saveUserSettings, uploadAvatar } from "./apiClient.js";
import { signOutSupabase } from "./authState.js";
import { navigate } from "./navigation.js";

export default function AccountSettings({ locale = "fr" }) {
  const fr = locale === "fr";
  const [form, setForm] = useState({ displayName: "", goal: "frontend-foundations", weeklyMinutes: 120, locale, bio: "", avatarUrl: "", onboardingCompleted: false });
  const [status, setStatus] = useState("loading");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    getUserSettings().then((user) => {
      setForm({
        displayName: user.displayName || "",
        goal: user.goal || "frontend-foundations",
        weeklyMinutes: user.weeklyMinutes || 120,
        locale: user.locale || locale,
        bio: user.bio || "",
        avatarUrl: user.avatarUrl || "",
        onboardingCompleted: Boolean(user.onboardingCompleted)
      });
      setStatus("idle");
    }).catch(() => setStatus("error"));
  }, [locale]);

  const submit = async (event) => {
    event.preventDefault();
    setStatus("saving");
    try {
      setForm(await saveUserSettings(form));
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  const selectAvatar = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setStatus("avatar-too-large");
      return;
    }
    setStatus("uploading-avatar");
    try {
      const uploaded = await uploadAvatar(await readFileAsDataUrl(file));
      setForm((current) => ({ ...current, avatarUrl: uploaded.avatarUrl }));
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  const exportData = async () => {
    setStatus("exporting");
    try {
      downloadJson(await exportAccountData(), `pulsateach-account-${Date.now()}.json`);
      setStatus("exported");
    } catch {
      setStatus("error");
    }
  };

  const removeAccount = async () => {
    setStatus("deleting");
    try {
      await deleteAccount(deleteConfirmation);
      await signOutSupabase();
      localStorage.removeItem("pulsateach-learning-progress");
      localStorage.removeItem("pulsateach-user-id");
      navigate("/catalog");
    } catch {
      setStatus("delete-error");
    }
  };

  return (
    <section className="app-page">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">{fr ? "Compte et préférences" : "Account and preferences"}</p>
        <h1 className="page-heading">{fr ? "Contrôle ton profil et tes données." : "Control your profile and data."}</h1>

        <form onSubmit={submit} className="surface mt-8">
          <div className="mb-5 flex items-center gap-3"><Settings className="size-8 text-indigoPop" /><h2 className="font-display text-3xl font-bold">{fr ? "Profil d'apprentissage" : "Learning profile"}</h2></div>
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
            {form.avatarUrl
              ? <img src={form.avatarUrl} alt="" className="size-20 rounded-2xl border border-slate-200 object-cover" />
              : <span className="grid size-20 place-items-center rounded-2xl bg-indigo-100 text-indigoPop"><UserRound className="size-10" /></span>}
            <div>
              <p className="font-bold">{fr ? "Photo de profil" : "Profile picture"}</p>
              <p className="mt-1 text-sm text-slate-500">JPEG, PNG ou WebP · 1 Mo maximum</p>
              <label className="secondary-button mt-3 cursor-pointer"><Upload className="size-4" />{fr ? "Choisir une image" : "Choose image"}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectAvatar} className="sr-only" /></label>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label={fr ? "Nom affiché" : "Display name"} value={form.displayName} onChange={(displayName) => setForm({ ...form, displayName })} />
            <SelectField label={fr ? "Objectif" : "Goal"} value={form.goal} onChange={(goal) => setForm({ ...form, goal })} options={["frontend-foundations", "portfolio-ready", "job-ready"]} />
            <Field type="number" label={fr ? "Minutes par semaine" : "Weekly minutes"} value={form.weeklyMinutes} onChange={(weeklyMinutes) => setForm({ ...form, weeklyMinutes: Number(weeklyMinutes) })} />
            <SelectField label="Langue" value={form.locale} onChange={(nextLocale) => setForm({ ...form, locale: nextLocale })} options={["fr", "en"]} />
            <label className="grid gap-2 text-sm font-bold md:col-span-2">{fr ? "Présentation" : "Bio"}<textarea value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} className="form-control min-h-28" /></label>
          </div>
          <button type="submit" className="primary-button mt-5"><Send className="size-5" />{status === "saving" ? (fr ? "Sauvegarde..." : "Saving...") : (fr ? "Sauvegarder" : "Save")}</button>
          <StatusMessage status={status} fr={fr} />
        </form>

        <section className="surface mt-6">
          <h2 className="font-display text-3xl font-bold">{fr ? "Tes données" : "Your data"}</h2>
          <p className="mt-2 text-slate-600">{fr ? "Télécharge ton profil, ta progression, tes projets, tes essais et tes certificats." : "Download your profile, progress, projects, attempts, and certificates."}</p>
          <button type="button" onClick={exportData} disabled={status === "exporting"} className="secondary-button mt-5"><Download className="size-5" />{fr ? "Exporter mes données" : "Export my data"}</button>
        </section>

        <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-display text-2xl font-bold text-red-900">{fr ? "Supprimer le compte" : "Delete account"}</h2>
          <p className="mt-2 text-sm leading-6 text-red-800">{fr ? "Cette action est définitive. Écris DELETE pour confirmer." : "This action is permanent. Type DELETE to confirm."}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} className="form-control flex-1 border-red-300" aria-label={fr ? "Confirmation de suppression" : "Deletion confirmation"} />
            <button type="button" onClick={removeAccount} disabled={deleteConfirmation !== "DELETE" || status === "deleting"} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-700 px-4 font-bold text-white disabled:opacity-40"><Trash2 className="size-5" />{fr ? "Supprimer définitivement" : "Delete permanently"}</button>
          </div>
          {status === "delete-error" && <p className="mt-3 font-bold text-red-800" role="alert">{fr ? "La suppression a échoué." : "Deletion failed."}</p>}
        </section>
      </div>
    </section>
  );
}

function StatusMessage({ status, fr }) {
  if (status === "saved") return <p className="mt-4 font-bold text-green-700" role="status">{fr ? "Profil enregistré." : "Profile saved."}</p>;
  if (status === "exported") return <p className="mt-4 font-bold text-green-700" role="status">{fr ? "Export téléchargé." : "Export downloaded."}</p>;
  if (status === "avatar-too-large") return <p className="mt-4 font-bold text-red-700" role="alert">{fr ? "L'image dépasse 1 Mo." : "Image exceeds 1 MB."}</p>;
  if (status === "error") return <p className="mt-4 font-bold text-red-700" role="alert">{fr ? "Une erreur est survenue." : "An error occurred."}</p>;
  return null;
}

function Field({ label, value, onChange, type = "text" }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="form-control" /></label>;
}

function SelectField({ label, value, onChange, options }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="form-control">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function downloadJson(data, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
