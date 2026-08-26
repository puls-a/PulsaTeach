import { timingSafeEqual } from "node:crypto";

export function registerDiscordRoutes(app, context) {
  const { discordIntegration, getUserFromAccessToken, pulsaBotRateLimit, sendApiError, supabaseAdmin } = context;
  app.post("/api/discord/link", async (request, response) => {
    const result = await discordIntegration.consumeLink({ state: request.body?.state, resolveAuthUser: () => getUserFromAccessToken(readBearerToken(request.headers.authorization)) });
    response.json(result);
  });
  app.get("/api/discord/progression/:discordId", pulsaBotRateLimit(), async (request, response) => {
    try { discordIntegration.verifyBotAuthorization(request.headers.authorization); } catch (error) { sendApiError(response, request, error.status, error.code, error.message); return; }
    if (!/^[0-9]{17,20}$/.test(request.params.discordId)) { sendApiError(response, request, 400, "DISCORD_ID_INVALID", "Discord ID is invalid."); return; }
    response.set("Cache-Control", "no-store");
    response.json(await discordIntegration.getProgression(request.params.discordId));
  });
  app.get("/api/internal/maintenance", async (request, response) => {
    const token = readBearerToken(request.headers.authorization);
    if (!process.env.CRON_SECRET || !safeEqual(token, process.env.CRON_SECRET)) { sendApiError(response, request, 401, "MAINTENANCE_UNAUTHORIZED", "Maintenance authentication failed."); return; }
    const [discord, purge] = await Promise.all([discordIntegration.processOutbox(10), supabaseAdmin.rpc("purge_expired_operational_data")]);
    if (purge.error) throw purge.error;
    response.json({ ok: true, discord, purged: purge.data });
  });
}

function readBearerToken(authorization) { return String(authorization || "").match(/^Bearer\s+(.+)$/i)?.[1]?.trim() || ""; }
function safeEqual(left, right) { const a = Buffer.from(String(left || "")); const b = Buffer.from(String(right || "")); return a.length === b.length && timingSafeEqual(a, b); }
