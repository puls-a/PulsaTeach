const productionRuntime = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

export function validateRuntimeConfig(env = process.env) {
  if (!productionRuntime) return;

  const missing = [];
  if (env.PULSATEACH_STORAGE !== "supabase-strict") missing.push("PULSATEACH_STORAGE=supabase-strict");
  for (const name of ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "PULSATEACH_ALLOWED_ORIGINS", "PULSATEACH_EXAM_SECRET", "CRON_SECRET"]) {
    if (!String(env[name] || "").trim()) missing.push(name);
  }
  if (missing.length) throw new Error(`Production configuration is incomplete: ${missing.join(", ")}.`);

  const origins = String(env.PULSATEACH_ALLOWED_ORIGINS).split(",").map((value) => value.trim()).filter(Boolean);
  if (!origins.length || origins.some((origin) => !isHttpsOrigin(origin))) {
    throw new Error("Production PULSATEACH_ALLOWED_ORIGINS must contain only HTTPS origins.");
  }
  if (env.PULSATEACH_ALLOW_LOCAL_IDENTITY === "true" || env.PULSATEACH_ADMIN_KEY || env.VITE_ADMIN_ACCESS_KEY) {
    throw new Error("Production must not configure local identity or browser admin access.");
  }

  const discordVariables = ["PULSABOT_API_URL", "PULSABOT_API_KEY", "PULSABOT_LINK_SIGNING_SECRET", "PULSATEACH_WEBHOOK_SECRET"];
  const configuredDiscordVariables = discordVariables.filter((name) => String(env[name] || "").trim());
  if (configuredDiscordVariables.length && configuredDiscordVariables.length !== discordVariables.length) {
    throw new Error(`Discord integration is incomplete: ${discordVariables.join(", ")}.`);
  }

  const signingSecrets = [env.PULSATEACH_EXAM_SECRET, env.PULSABOT_LINK_SIGNING_SECRET, env.PULSATEACH_WEBHOOK_SECRET]
    .filter((value) => String(value || "").trim());
  if (new Set(signingSecrets).size !== signingSecrets.length) {
    throw new Error("Exam, Discord link, and webhook secrets must be distinct.");
  }
}

function isHttpsOrigin(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.origin === value;
  } catch {
    return false;
  }
}
