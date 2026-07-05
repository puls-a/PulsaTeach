const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseBrowserConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseClientPromise;

export function getSupabaseClient() {
  if (!isSupabaseBrowserConfigured) return Promise.resolve(null);
  if (!supabaseClientPromise) {
    supabaseClientPromise = import("@supabase/supabase-js")
      .then(({ createClient }) => createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      }))
      .catch(() => null);
  }
  return supabaseClientPromise;
}

export async function getSupabaseAccessToken() {
  const supabase = await getSupabaseClient();
  if (!supabase) return "";
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || "";
}

export async function getCurrentSupabaseUser() {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}
