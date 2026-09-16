import { LockKeyhole } from "lucide-react";
import { useSupabaseSession } from "../authState.js";

export default function AuthNotice({ locale = "en", scope = "learning" }) {
  const { user, loading } = useSupabaseSession();
  if (scope === "game") {
    return (
      <div className={`mb-5 flex items-center gap-2 rounded-xl border p-4 text-sm font-semibold ${user ? "border-green-200 bg-green-50 text-green-950" : "border-amber-200 bg-amber-50 text-amber-950"}`} role="note">
        <LockKeyhole className="size-5 shrink-0" />
        {user
          ? (locale === "fr" ? "Tes XP et badges de défis sont synchronisés avec ton compte." : "Your challenge XP and badges are synced with your account.")
          : (locale === "fr" ? "Connecte-toi pour synchroniser tes XP et badges de défis entre tes appareils." : "Sign in to sync challenge XP and badges across devices.")}
      </div>
    );
  }
  if (loading || user) return null;

  return (
    <div className="mb-5 flex flex-col justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm font-semibold text-slate-700 sm:flex-row sm:items-center">
      <span className="inline-flex items-center gap-2">
        <LockKeyhole className="size-5" />
        {locale === "fr"
          ? "Connecte-toi pour sauvegarder ta progression dans Supabase."
          : "Sign in to save your progress in Supabase."}
      </span>
      <a href="/auth" className="inline-flex w-fit rounded-xl bg-ink px-4 py-2 text-white hover:bg-indigoPop">
        {locale === "fr" ? "Connexion" : "Sign in"}
      </a>
    </div>
  );
}
