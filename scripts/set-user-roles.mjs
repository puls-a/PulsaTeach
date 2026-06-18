import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const [emailArg, rolesArg = "admin,author,reviewer"] = process.argv.slice(2);
if (!emailArg) {
  throw new Error("Usage: npm run roles:set -- user@example.com admin,author,reviewer");
}

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const allowed = new Set(["admin", "author", "reviewer"]);
const roles = Array.from(new Set(rolesArg.split(",").map((role) => role.trim()).filter((role) => allowed.has(role))));
const client = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
const { data, error } = await client.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (error) throw error;
const user = data.users.find((candidate) => candidate.email?.toLowerCase() === emailArg.toLowerCase());
if (!user) throw new Error(`No Supabase user found for ${emailArg}.`);

const { error: updateError } = await client.auth.admin.updateUserById(user.id, { app_metadata: { roles } });
if (updateError) throw updateError;
const { error: profileError } = await client.from("profiles").update({ roles, updated_at: new Date().toISOString() }).eq("auth_user_id", user.id);
if (profileError) throw profileError;

console.log(JSON.stringify({ email: user.email, roles }));
