import { useEffect, useState } from "react";
import { saveUserSettings } from "./apiClient.js";
import { supabase } from "./supabaseClient.js";

const authUserIdKey = "pulsateach-user-id";
const localSessionKey = "pulsateach-local-session";
const localAuthEvent = "pulsateach-local-auth";

export function getSessionUserId(session) {
  if (!session?.user?.id) return null;
  return session.provider === "local" ? session.user.id : `supabase-${session.user.id}`;
}

export function syncSessionUserId(session) {
  const userId = getSessionUserId(session);
  if (userId) localStorage.setItem(authUserIdKey, userId);
  return userId;
}

export function useSupabaseSession() {
  const [session, setSession] = useState(readLocalSession);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      const handleLocalAuth = () => setSession(readLocalSession());
      window.addEventListener(localAuthEvent, handleLocalAuth);
      return () => window.removeEventListener(localAuthEvent, handleLocalAuth);
    }

    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session || readLocalSession());
      setLoading(false);
      syncProfile(data.session || readLocalSession());
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || readLocalSession());
      syncProfile(nextSession || readLocalSession());
    });

    const handleLocalAuth = () => {
      const localSession = readLocalSession();
      setSession(localSession);
      syncProfile(localSession);
    };
    window.addEventListener(localAuthEvent, handleLocalAuth);

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
      window.removeEventListener(localAuthEvent, handleLocalAuth);
    };
  }, []);

  return { session, loading, user: session?.user || null };
}

export async function signOutSupabase() {
  localStorage.removeItem(localSessionKey);
  window.dispatchEvent(new Event(localAuthEvent));
  if (supabase) await supabase.auth.signOut();
}

export function createLocalSession(email) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const id = `local-${normalizedEmail.replace(/[^a-z0-9]+/g, "-")}`;
  const session = {
    provider: "local",
    user: {
      id,
      email: normalizedEmail,
      user_metadata: { name: normalizedEmail.split("@")[0] }
    }
  };
  localStorage.setItem(localSessionKey, JSON.stringify(session));
  syncSessionUserId(session);
  window.dispatchEvent(new Event(localAuthEvent));
  syncProfile(session);
  return session;
}

async function syncProfile(session) {
  const userId = syncSessionUserId(session);
  if (!userId || !session?.user) return;

  const metadata = session.user.user_metadata || {};
  const displayName = metadata.full_name || metadata.name || session.user.email || "PulsaTeach Learner";

  try {
    await saveUserSettings({
      displayName,
      goal: "frontend-foundations",
      weeklyMinutes: 120,
      locale: document.documentElement.lang || "en"
    }, userId);
  } catch {
    // The UI can still work if profile sync fails; API status surfaces backend issues.
  }
}

function readLocalSession() {
  try {
    return JSON.parse(localStorage.getItem(localSessionKey)) || null;
  } catch {
    return null;
  }
}
