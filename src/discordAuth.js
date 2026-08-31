import { pathWithAuthReturn } from "./authReturn.js";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "./supabaseClient.js";

export async function signInWithDiscord({ returnTo = "", resumeDirectly = false } = {}) {
  if (!isSupabaseBrowserConfigured) throw new Error("Discord authentication is unavailable.");
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error("Discord authentication is unavailable.");
  const callback = resumeDirectly ? "/auth/callback?resume=1" : "/auth/callback?oauth=discord";
  const options = {
    redirectTo: `${window.location.origin}${pathWithAuthReturn(callback, returnTo)}`,
    scopes: "identify email"
  };
  const { data: sessionData } = await supabase.auth.getSession();
  const { error } = sessionData.session
    ? await supabase.auth.linkIdentity({ provider: "discord", options })
    : await supabase.auth.signInWithOAuth({
    provider: "discord",
    options
  });
  if (error) throw error;
}
