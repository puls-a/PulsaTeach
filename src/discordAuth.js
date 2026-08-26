import { pathWithAuthReturn } from "./authReturn.js";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "./supabaseClient.js";

export async function signInWithDiscord({ returnTo = "", resumeDirectly = false } = {}) {
  if (!isSupabaseBrowserConfigured) throw new Error("Discord authentication is unavailable.");
  const supabase = await getSupabaseClient();
  if (!supabase) throw new Error("Discord authentication is unavailable.");
  const redirectTo = `${window.location.origin}${pathWithAuthReturn(resumeDirectly ? "/auth/callback?resume=1" : "/auth/callback?oauth=discord", returnTo)}`;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  const result = data.session ? await supabase.auth.linkIdentity({ provider: "discord", options: { redirectTo, scopes: "identify email" } }) : await supabase.auth.signInWithOAuth({ provider: "discord", options: { redirectTo, scopes: "identify email" } });
  if (result.error) throw result.error;
}
