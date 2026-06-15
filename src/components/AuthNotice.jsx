import { LockKeyhole } from "lucide-react";
import { useSupabaseSession } from "../authState.js";

export default function AuthNotice({ locale = "en" }) {
  const { user, loading } = useSupabaseSession();
  if (loading || user) return null;

  return (
    <div className="mb-5 flex flex-col justify-between gap-3 rounded-[24px] bg-lemonPop p-4 font-extrabold clay-soft sm:flex-row sm:items-center">
      <span className="inline-flex items-center gap-2">
        <LockKeyhole className="size-5" />
        {locale === "fr"
          ? "Connecte-toi pour sauvegarder ta progression dans Supabase."
          : "Sign in to save your progress in Supabase."}
      </span>
      <a href="#/auth" className="inline-flex w-fit rounded-2xl bg-ink px-4 py-2 text-white shadow-clayPressed">
        {locale === "fr" ? "Connexion" : "Sign in"}
      </a>
    </div>
  );
}
