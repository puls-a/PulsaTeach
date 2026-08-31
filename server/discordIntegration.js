import { createHmac, timingSafeEqual } from "node:crypto";

export const discordTrackIds = ["html", "css", "javascript"];
const linkLifetimeMs = 5 * 60 * 1000;
const linkClockSkewMs = 60 * 1000;

const certificateSlugMap = new Map([
  ["frontend-foundations", "frontend"]
]);

export function verifyDiscordLinkState(state, secret, now = Date.now()) {
  if (!secret) throw integrationError(503, "DISCORD_LINK_NOT_CONFIGURED", "Discord account linking is not configured.");
  if (!state || String(state).length > 4096) throw integrationError(400, "DISCORD_LINK_INVALID", "Discord link is invalid.");
  const [payloadPart, signaturePart, extraPart] = String(state).split(".");
  if (!payloadPart || !signaturePart || extraPart !== undefined) throw integrationError(400, "DISCORD_LINK_INVALID", "Discord link is invalid.");

  const expected = createHmac("sha256", secret).update(payloadPart).digest();
  const received = decodeBase64Url(signaturePart);
  if (!received || received.length !== expected.length || !timingSafeEqual(received, expected)) {
    throw integrationError(400, "DISCORD_LINK_INVALID_SIGNATURE", "Discord link signature is invalid.");
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8"));
  } catch {
    throw integrationError(400, "DISCORD_LINK_INVALID", "Discord link payload is invalid.");
  }
  const discordId = typeof payload?.discordId === "string" ? payload.discordId.trim() : "";
  const nonce = typeof payload?.nonce === "string" ? payload.nonce.trim() : "";
  const issuedAt = Number(payload?.issuedAt);
  const expiresAt = Number(payload?.expiresAt);
  if (!/^[0-9]{17,20}$/.test(discordId) || !/^[A-Za-z0-9_-]{16,128}$/.test(nonce) || !Number.isFinite(issuedAt) || !Number.isFinite(expiresAt) || expiresAt <= issuedAt) {
    throw integrationError(400, "DISCORD_LINK_INVALID", "Discord link payload is invalid.");
  }
  if (issuedAt > now + linkClockSkewMs || expiresAt - issuedAt > linkLifetimeMs + linkClockSkewMs) throw integrationError(400, "DISCORD_LINK_INVALID_TIME", "Discord link timing is invalid.");
  if (expiresAt <= now) throw integrationError(410, "DISCORD_LINK_EXPIRED", "Discord link has expired.");
  return { discordId, nonce, issuedAt, expiresAt };
}

export function verifyPulsaBotAuthorization(authorization, apiKey) {
  if (!apiKey) throw integrationError(503, "PULSABOT_API_NOT_CONFIGURED", "PulsaBot API access is not configured.");
  const match = String(authorization || "").match(/^Bearer\s+(.+)$/i);
  if (!match || !safeEqual(match[1].trim(), apiKey)) throw integrationError(401, "PULSABOT_UNAUTHORIZED", "PulsaBot authentication failed.");
}

export function completedDiscordTrackIds(progress, learningTracks) {
  const completed = progress?.completed && typeof progress.completed === "object" ? progress.completed : {};
  return discordTrackIds.filter((trackId) => {
    const lessons = learningTracks.find((track) => track.id === trackId)?.modules?.flatMap((module) => module.lessons || []) || [];
    return lessons.length > 0 && lessons.every((lesson) => Boolean(completed[lesson.id]));
  });
}

export function discordCertificateSlug(certificateId) {
  return certificateSlugMap.get(certificateId) || certificateId;
}

export function createDiscordIntegration({
  supabaseAdmin,
  learningTracks,
  fetchImpl = globalThis.fetch,
  linkSecret = process.env.PULSABOT_LINK_SIGNING_SECRET || process.env.PULSABOT_API_KEY,
  apiKey = process.env.PULSABOT_API_KEY,
  apiUrl = process.env.PULSABOT_API_URL,
  webhookSecret = process.env.PULSATEACH_WEBHOOK_SECRET
}) {
  return {
    completedTrackIds: (progress) => completedDiscordTrackIds(progress, learningTracks),
    verifyBotAuthorization: (authorization) => verifyPulsaBotAuthorization(authorization, apiKey),
    async notifyCertificateEarned(userId, certificateId) {
      const request = await createWebhookRequest(userId, { eventType: "certificate_earned", certificateSlug: discordCertificateSlug(certificateId) });
      if (!request) return { sent: false };
      let response = await fetchImpl(request.endpoint, request.options);
      if (!response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        response = await fetchImpl(request.endpoint, request.options);
      }
      if (!response.ok) throw new Error(`PulsaBot webhook failed with status ${response.status}.`);
      return { sent: true };
    },
    async consumeLink({ state, authUser, resolveAuthUser }) {
      const link = verifyDiscordLinkState(state, linkSecret);
      const resolvedAuthUser = authUser || await resolveAuthUser?.();
      if (!resolvedAuthUser?.id) throw integrationError(401, "AUTH_REQUIRED", "Authentication required.");
      const oauthDiscordId = discordIdentityId(resolvedAuthUser);
      if (!oauthDiscordId) throw integrationError(403, "DISCORD_OAUTH_REQUIRED", "Discord authentication is required to use this link.");
      if (oauthDiscordId !== link.discordId) throw integrationError(403, "DISCORD_IDENTITY_MISMATCH", "The authenticated Discord identity does not match this link.");
      requireDatabase(supabaseAdmin);
      const linkedAt = new Date().toISOString();
      const result = await supabaseAdmin.rpc("consume_discord_link", {
        p_user_id: resolvedAuthUser.id,
        p_discord_id: link.discordId,
        p_nonce: link.nonce,
        p_linked_at: linkedAt
      });
      throwDatabaseError(result.error);
      if (result.data?.status === "replayed") throw integrationError(409, "DISCORD_LINK_REPLAYED", "Discord link has already been used.");
      if (result.data?.status === "conflict") throw integrationError(409, "DISCORD_ACCOUNT_ALREADY_LINKED", "This Discord account is already linked to another PulsaTeach account.");
      if (result.data?.status !== "linked") throw new Error("Discord link RPC returned an invalid result.");
      return { linked: true, discordId: link.discordId, linkedAt };
    },
    async getProgression(discordId) {
      requireDatabase(supabaseAdmin);
      const linkResult = await supabaseAdmin.from("discord_links").select("user_id,linked_at").eq("discord_id", discordId).maybeSingle();
      throwDatabaseError(linkResult.error);
      if (!linkResult.data) return { linked: false };
      const localUserId = `supabase-${linkResult.data.user_id}`;
      const [completionResult, certificatesResult] = await Promise.all([
        supabaseAdmin.from("verified_track_completions").select("track_id,completed_at").eq("user_id", localUserId),
        supabaseAdmin.from("issued_certificates").select("certificate_id,issued_at,expires_at,revoked_at").eq("user_id", localUserId).is("revoked_at", null)
      ]);
      throwDatabaseError(completionResult.error);
      throwDatabaseError(certificatesResult.error);
      const validCertificates = (certificatesResult.data || []).filter((certificate) => !certificate.expires_at || new Date(certificate.expires_at).getTime() > Date.now());
      return {
        linked: true,
        completedModules: discordTrackIds.filter((trackId) => (completionResult.data || []).some((completion) => completion.track_id === trackId)),
        certificates: [...new Set(validCertificates.map((certificate) => discordCertificateSlug(certificate.certificate_id)))],
        updatedAt: latestTimestamp([linkResult.data.linked_at, ...(completionResult.data || []).map((item) => item.completed_at), ...validCertificates.map((item) => item.issued_at)])
      };
    },
    async recordProgress(userId, progress) {
      requireDatabase(supabaseAdmin);
      const trackIds = completedDiscordTrackIds(progress, learningTracks);
      if (!trackIds.length) return [];
      const completedAt = new Date().toISOString();
      const { error } = await supabaseAdmin.from("verified_track_completions").upsert(trackIds.map((trackId) => ({ user_id: userId, track_id: trackId, completed_at: completedAt })), { onConflict: "user_id,track_id", ignoreDuplicates: true });
      throwDatabaseError(error);
      return trackIds;
    },
    async processOutbox(limit = 10) {
      requireDatabase(supabaseAdmin);
      const { data: events, error } = await supabaseAdmin.rpc("claim_discord_outbox", { p_limit: limit });
      throwDatabaseError(error);
      const results = await Promise.all((events || []).map((event) => deliverOutboxEvent(event)));
      return { claimed: (events || []).length, delivered: results.filter((status) => status === "delivered").length, pending: results.filter((status) => status === "pending").length, failed: results.filter((status) => status === "failed").length };
    }
  };

  async function deliverOutboxEvent(event) {
    const payload = event.event_type === "module_completed" ? { eventType: event.event_type, moduleId: event.entity_id } : { eventType: event.event_type, certificateSlug: discordCertificateSlug(event.entity_id) };
    try {
      const sent = await sendWebhookForUser(event.user_id, payload);
      const pending = !sent;
      const { error } = await supabaseAdmin.from("discord_outbox").update({ status: pending ? "pending" : "delivered", next_attempt_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), delivered_at: pending ? null : new Date().toISOString(), locked_at: null, updated_at: new Date().toISOString() }).eq("id", event.id);
      throwDatabaseError(error);
      return pending ? "pending" : "delivered";
    } catch (error) {
      const failed = Number(event.attempts || 0) >= 10;
      const { error: updateError } = await supabaseAdmin.from("discord_outbox").update({ status: failed ? "failed" : "pending", next_attempt_at: new Date(Date.now() + Math.min(86_400_000, 2 ** Math.min(event.attempts || 1, 10) * 60_000)).toISOString(), locked_at: null, last_error: String(error.message).slice(0, 500), updated_at: new Date().toISOString() }).eq("id", event.id);
      throwDatabaseError(updateError);
      return failed ? "failed" : "pending";
    }
  }

  async function sendWebhookForUser(userId, event) {
    const request = await createWebhookRequest(userId, event);
    if (!request) return false;
    const response = await fetchImpl(request.endpoint, request.options);
    if (!response.ok) throw new Error(`PulsaBot webhook failed with status ${response.status}.`);
    return true;
  }

  async function createWebhookRequest(userId, event) {
    if (!webhookSecret || !apiUrl) return null;
    const authUserId = authUuidFromLocalUserId(userId);
    if (!authUserId) return null;
    const linkResult = await supabaseAdmin.from("discord_links").select("discord_id").eq("user_id", authUserId).maybeSingle();
    throwDatabaseError(linkResult.error);
    if (!linkResult.data) return null;
    const body = JSON.stringify({ discordId: linkResult.data.discord_id, ...event, timestamp: new Date().toISOString() });
    const endpoint = new URL("/api/v1/webhooks/pulsateach", normalizedApiUrl(apiUrl));
    return { endpoint, options: { method: "POST", headers: { "Content-Type": "application/json", "X-PulsaTeach-Signature": createHmac("sha256", webhookSecret).update(body).digest("hex") }, body, signal: AbortSignal.timeout(5000) } };
  }
}

function decodeBase64Url(value) { try { return Buffer.from(value, "base64url"); } catch { return null; } }
function safeEqual(left, right) { const a = Buffer.from(String(left)); const b = Buffer.from(String(right)); return a.length === b.length && timingSafeEqual(a, b); }
function authUuidFromLocalUserId(userId) { return String(userId || "").match(/^supabase-([0-9a-f-]{36})$/i)?.[1] || null; }
function discordIdentityId(user) { const identity = user?.identities?.find((item) => item?.provider === "discord"); const value = identity?.identity_data?.provider_id || identity?.identity_data?.sub; return /^[0-9]{17,20}$/.test(String(value || "")) ? String(value) : null; }
function normalizedApiUrl(value) { let url; try { url = new URL(value); } catch { throw integrationError(503, "PULSABOT_WEBHOOK_NOT_CONFIGURED", "PulsaBot webhook URL is invalid."); } if (url.protocol !== "https:") throw integrationError(503, "PULSABOT_WEBHOOK_NOT_CONFIGURED", "PulsaBot webhook URL must use HTTPS."); return url; }
function latestTimestamp(values) { const dates = values.filter(Boolean).map((value) => new Date(value)).filter((value) => Number.isFinite(value.getTime())); return dates.length ? new Date(Math.max(...dates.map((value) => value.getTime()))).toISOString() : new Date(0).toISOString(); }
function requireDatabase(client) { if (!client) throw integrationError(503, "DISCORD_STORAGE_UNAVAILABLE", "Discord integration storage is unavailable."); }
function throwDatabaseError(error) { if (error) throw error; }
function integrationError(status, code, message) { return Object.assign(new Error(message), { status, code }); }
