import { useEffect, useState } from "react";
import { migrateLocalProgress, recordLearningEvent, saveUserSettings } from "./apiClient.js";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "./supabaseClient.js";
import { getLearnerItem, resetLearnerStorageOwner, setLearnerItem, setLearnerStorageOwner } from "./learnerStorage.js";

const localSessionKey = "pulsateach-local-session";
const localAuthEvent = "pulsateach-local-auth";
const learningProgressKey = "pulsateach-learning-progress";
const migrationKeyPrefix = "pulsateach-progress-migrated:";
const useLocalAuth = import.meta.env.VITE_AUTH_MODE === "local";

export function getSessionUserId(session) {
  if (!session?.user?.id) return null;
  return session.provider === "local" ? session.user.id : `supabase-${session.user.id}`;
}

export function syncSessionUserId(session) {
  const userId = getSessionUserId(session);
  if (userId) setLearnerStorageOwner(userId);
  return userId;
}

export function useSupabaseSession() {
  const [session, setSession] = useState(readLocalSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseBrowserConfigured || useLocalAuth) {
      const localSession = readLocalSession();
      if (localSession) syncSessionUserId(localSession);
      else resetLearnerStorageOwner();
      setSession(localSession);
      setLoading(false);
      const handleLocalAuth = () => {
        const nextSession = readLocalSession();
        if (nextSession) syncSessionUserId(nextSession);
        else resetLearnerStorageOwner();
        setSession(nextSession);
      };
      window.addEventListener(localAuthEvent, handleLocalAuth);
      return () => window.removeEventListener(localAuthEvent, handleLocalAuth);
    }

    let mounted = true;
    let unsubscribe = () => {};
    const failClosed = () => {
      if (!mounted) return;
      localStorage.removeItem(localSessionKey);
      resetLearnerStorageOwner();
      setSession(null);
      setLoading(false);
    };

    getSupabaseClient().then((supabase) => {
      if (!mounted || !supabase) {
        if (mounted) failClosed();
        return;
      }

      supabase.auth.getSession().then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          failClosed();
          return;
        }
        if (data.session) localStorage.removeItem(localSessionKey);
        if (!data.session) resetLearnerStorageOwner();
        setSession(data.session || null);
        setLoading(false);
        syncProfile(data.session);
        migrateProgressForSession(data.session);
      }).catch(failClosed);

      const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        if (nextSession) localStorage.removeItem(localSessionKey);
        if (!nextSession) resetLearnerStorageOwner();
        setSession(nextSession || null);
        syncProfile(nextSession);
        migrateProgressForSession(nextSession);
      });
      unsubscribe = () => data.subscription.unsubscribe();
    });

    const handleLocalAuth = () => {
      const localSession = readLocalSession();
      setSession(localSession);
      syncProfile(localSession);
    };
    window.addEventListener(localAuthEvent, handleLocalAuth);

    return () => {
      mounted = false;
      unsubscribe();
      window.removeEventListener(localAuthEvent, handleLocalAuth);
    };
  }, []);

  return { session, loading, user: session?.user || null };
}

export async function signOutSupabase() {
  if (!isSupabaseBrowserConfigured || useLocalAuth) {
    localStorage.removeItem(localSessionKey);
    resetLearnerStorageOwner(true);
    window.dispatchEvent(new Event(localAuthEvent));
    return;
  }
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error("Authentication is unavailable.");
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  localStorage.removeItem(localSessionKey);
  resetLearnerStorageOwner();
  window.dispatchEvent(new Event(localAuthEvent));
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

  if (session.provider !== "local") return;
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

async function migrateProgressForSession(session) {
  if (!session?.user?.id || session.provider === "local") return;
  const migrationKey = `${migrationKeyPrefix}${session.user.id}`;
  if (localStorage.getItem(migrationKey)) return;
  let localProgress;
  try {
    localProgress = JSON.parse(getLearnerItem(learningProgressKey));
  } catch {
    localProgress = null;
  }
  if (!localProgress || !Object.keys(localProgress.completed || {}).length) {
    localStorage.setItem(migrationKey, new Date().toISOString());
    return;
  }
  try {
    const result = await migrateLocalProgress(localProgress);
    setLearnerItem(learningProgressKey, JSON.stringify(result.progress));
    localStorage.setItem(migrationKey, new Date().toISOString());
    window.dispatchEvent(new CustomEvent("pulsateach-progress-synced", { detail: result.progress }));
    recordLearningEvent({
      eventType: "progress_migrated",
      payload: { completedLessons: Object.keys(result.progress.completed || {}).length }
    }).catch(() => {});
  } catch {
    // Preserve the local copy and retry during the next authenticated session.
  }
}

function readLocalSession() {
  try {
    return JSON.parse(localStorage.getItem(localSessionKey)) || null;
  } catch {
    return null;
  }
}
