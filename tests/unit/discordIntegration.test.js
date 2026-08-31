import { createHmac } from "node:crypto";
import { describe, expect, test, vi } from "vitest";
import {
  completedDiscordTrackIds,
  createDiscordIntegration,
  discordCertificateSlug,
  verifyDiscordLinkState,
  verifyPulsaBotAuthorization
} from "../../server/discordIntegration.js";

const authUserId = "123e4567-e89b-42d3-a456-426614174000";
const otherUserId = "223e4567-e89b-42d3-a456-426614174000";
const secret = "test-discord-shared-secret";
const tracks = ["html", "css", "javascript"].map((id) => ({
  id,
  modules: [{ id: `${id}-module`, lessons: [{ id: `${id}-lesson` }] }]
}));

describe("Discord integration", () => {
  test("verifies the signed state before checking expiration", () => {
    const expired = signedState({ discordId: "123456789012345678", nonce: "expired-nonce-value", issuedAt: 1000, expiresAt: 2000 });
    expect(() => verifyDiscordLinkState(expired, secret, 2001)).toThrowError(expect.objectContaining({ code: "DISCORD_LINK_EXPIRED", status: 410 }));

    const tampered = `${expired.slice(0, -1)}x`;
    expect(() => verifyDiscordLinkState(tampered, secret, 1001)).toThrowError(expect.objectContaining({ code: "DISCORD_LINK_INVALID_SIGNATURE", status: 400 }));
  });

  test("does not resolve a Supabase session before signature and expiration checks", async () => {
    const resolveAuthUser = vi.fn(async () => ({ id: authUserId }));
    const integration = createIntegration(createDatabaseDouble());
    await expect(integration.consumeLink({ state: "invalid.token", resolveAuthUser })).rejects.toMatchObject({ code: "DISCORD_LINK_INVALID_SIGNATURE" });
    expect(resolveAuthUser).not.toHaveBeenCalled();
  });

  test("rejects future-issued, oversized-lifetime, and low-entropy link states", () => {
    const now = Date.now();
    expect(() => verifyDiscordLinkState(signedState({ discordId: "123456789012345678", nonce: "future-nonce-value", issuedAt: now + 61_000, expiresAt: now + 120_000 }), secret, now)).toThrowError(expect.objectContaining({ code: "DISCORD_LINK_INVALID_TIME" }));
    expect(() => verifyDiscordLinkState(signedState({ discordId: "123456789012345678", nonce: "long-lived-nonce", issuedAt: now, expiresAt: now + 7 * 60_000 }), secret, now)).toThrowError(expect.objectContaining({ code: "DISCORD_LINK_INVALID_TIME" }));
    expect(() => verifyDiscordLinkState(signedState({ discordId: "123456789012345678", nonce: "short", issuedAt: now, expiresAt: now + 60_000 }), secret, now)).toThrowError(expect.objectContaining({ code: "DISCORD_LINK_INVALID" }));
  });

  test("rejects an OAuth Discord identity that does not own the signed link", async () => {
    const database = createDatabaseDouble();
    const integration = createIntegration(database);
    const state = signedState({ discordId: "123456789012345678", nonce: "oauth-mismatch-value", issuedAt: Date.now() - 1000, expiresAt: Date.now() + 60_000 });
    await expect(integration.consumeLink({
      state,
      authUser: {
        id: authUserId,
        identities: [{ provider: "discord", identity_data: { provider_id: "923456789012345678" } }]
      }
    })).rejects.toMatchObject({ code: "DISCORD_IDENTITY_MISMATCH", status: 403 });
    expect(database.usedNonces.has("oauth-mismatch-value")).toBe(false);
  });

  test("rejects a non-Discord session before consuming the nonce", async () => {
    const database = createDatabaseDouble();
    const integration = createIntegration(database);
    const state = signedState({ discordId: "123456789012345678", nonce: "oauth-required-value", issuedAt: Date.now() - 1000, expiresAt: Date.now() + 60_000 });
    await expect(integration.consumeLink({ state, authUser: { id: authUserId, identities: [] } })).rejects.toMatchObject({ code: "DISCORD_OAUTH_REQUIRED", status: 403 });
    expect(database.usedNonces.has("oauth-required-value")).toBe(false);
  });

  test("uses timing-safe bot authentication and explicit certificate mapping", () => {
    expect(() => verifyPulsaBotAuthorization("Bearer wrong", "right")).toThrowError(expect.objectContaining({ code: "PULSABOT_UNAUTHORIZED" }));
    expect(() => verifyPulsaBotAuthorization("Bearer right", "right")).not.toThrow();
    expect(discordCertificateSlug("frontend-foundations")).toBe("frontend");
  });

  test("only marks a complete HTML, CSS, or JavaScript track", () => {
    expect(completedDiscordTrackIds({ completed: { "html-lesson": true, "css-lesson": true } }, tracks)).toEqual(["html", "css"]);
  });

  test("consumes a nonce before writing a link and rejects its replay", async () => {
    const database = createDatabaseDouble();
    const integration = createIntegration(database);
    const state = signedState({ discordId: "123456789012345678", nonce: "nonce-once-value", issuedAt: Date.now() - 1000, expiresAt: Date.now() + 60_000 });

    await expect(integration.consumeLink({ state, authUser: discordAuthUser() })).resolves.toMatchObject({ linked: true, discordId: "123456789012345678" });
    expect(database.operations).toEqual([
      "select:used_link_nonces",
      "insert:used_link_nonces",
      "select:discord_links",
      "upsert:discord_links"
    ]);
    await expect(integration.consumeLink({ state, authUser: discordAuthUser() })).rejects.toMatchObject({ code: "DISCORD_LINK_REPLAYED" });
  });

  test("consumes the nonce even when the Discord identity belongs to another user", async () => {
    const database = createDatabaseDouble({
      discordLinks: [{ user_id: otherUserId, discord_id: "123456789012345678", linked_at: new Date().toISOString() }]
    });
    const integration = createIntegration(database);
    const state = signedState({ discordId: "123456789012345678", nonce: "nonce-conflict-value", issuedAt: Date.now() - 1000, expiresAt: Date.now() + 60_000 });

    await expect(integration.consumeLink({ state, authUser: discordAuthUser() })).rejects.toMatchObject({ code: "DISCORD_ACCOUNT_ALREADY_LINKED" });
    expect(database.usedNonces.has("nonce-conflict-value")).toBe(true);
    expect(database.operations).not.toContain("upsert:discord_links");
  });

  test("returns mapped progress and signs the exact webhook body", async () => {
    const issuedAt = "2026-08-15T10:00:00.000Z";
    const database = createDatabaseDouble({
      discordLinks: [{ user_id: authUserId, discord_id: "123456789012345678", linked_at: "2026-08-14T10:00:00.000Z" }],
      completions: [{ user_id: `supabase-${authUserId}`, track_id: "html", completed_at: "2026-08-15T09:00:00.000Z" }],
      certificates: [{ user_id: `supabase-${authUserId}`, certificate_id: "frontend-foundations", issued_at: issuedAt, expires_at: null, revoked_at: null }]
    });
    const fetchImpl = vi.fn(async () => ({ ok: true, status: 204 }));
    const integration = createIntegration(database, { fetchImpl });

    await expect(integration.getProgression("123456789012345678")).resolves.toEqual({
      linked: true,
      completedModules: ["html"],
      certificates: ["frontend"],
      updatedAt: issuedAt
    });
    await integration.notifyCertificateEarned(`supabase-${authUserId}`, "frontend-foundations");

    const [url, options] = fetchImpl.mock.calls[0];
    expect(url.toString()).toBe("https://pulsabot.example/api/v1/webhooks/pulsateach");
    const payload = JSON.parse(options.body);
    expect(payload).toMatchObject({ discordId: "123456789012345678", eventType: "certificate_earned", certificateSlug: "frontend" });
    expect(options.headers["X-PulsaTeach-Signature"]).toBe(createHmac("sha256", secret).update(options.body).digest("hex"));
  });

  test("retries a transient PulsaBot webhook without changing its signed body", async () => {
    vi.useFakeTimers();
    try {
      const database = createDatabaseDouble({
        discordLinks: [{ user_id: authUserId, discord_id: "123456789012345678", linked_at: new Date().toISOString() }]
      });
      const fetchImpl = vi.fn()
        .mockResolvedValueOnce({ ok: false, status: 503 })
        .mockResolvedValueOnce({ ok: true, status: 204 });
      const integration = createIntegration(database, { fetchImpl });

      const delivery = integration.notifyCertificateEarned(`supabase-${authUserId}`, "frontend-foundations");
      await vi.advanceTimersByTimeAsync(250);
      await expect(delivery).resolves.toEqual({ sent: true });
      expect(fetchImpl).toHaveBeenCalledTimes(2);
      expect(fetchImpl.mock.calls[0][1].body).toBe(fetchImpl.mock.calls[1][1].body);
      expect(fetchImpl.mock.calls[0][1].headers["X-PulsaTeach-Signature"]).toBe(fetchImpl.mock.calls[1][1].headers["X-PulsaTeach-Signature"]);
    } finally {
      vi.useRealTimers();
    }
  });
});

function signedState(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function discordAuthUser() {
  return {
    id: authUserId,
    identities: [{ provider: "discord", identity_data: { provider_id: "123456789012345678" } }]
  };
}

function createIntegration(database, overrides = {}) {
  return createDiscordIntegration({
    supabaseAdmin: database.client,
    learningTracks: tracks,
    linkSecret: secret,
    apiKey: "test-pulsabot-key",
    apiUrl: "https://pulsabot.example",
    webhookSecret: secret,
    ...overrides
  });
}

function createDatabaseDouble({ discordLinks = [], progress = [], completions = [], certificates = [] } = {}) {
  const state = {
    operations: [],
    usedNonces: new Set(),
    discordLinks: [...discordLinks],
    progress: [...progress],
    completions: [...completions],
    certificates: [...certificates]
  };

  state.client = {
    from(table) {
      return new QueryDouble(state, table);
    },
    async rpc(name, payload) {
      if (name !== "consume_discord_link") return { data: null, error: new Error("Unknown RPC") };
      state.operations.push("select:used_link_nonces");
      if (state.usedNonces.has(payload.p_nonce)) return { data: { status: "replayed" }, error: null };
      state.operations.push("insert:used_link_nonces");
      state.usedNonces.add(payload.p_nonce);
      state.operations.push("select:discord_links");
      const conflict = state.discordLinks.find((link) => link.discord_id === payload.p_discord_id && link.user_id !== payload.p_user_id);
      if (conflict) return { data: { status: "conflict" }, error: null };
      state.operations.push("upsert:discord_links");
      const index = state.discordLinks.findIndex((link) => link.user_id === payload.p_user_id);
      const link = { user_id: payload.p_user_id, discord_id: payload.p_discord_id, linked_at: payload.p_linked_at };
      if (index === -1) state.discordLinks.push(link);
      else state.discordLinks[index] = { ...state.discordLinks[index], ...link };
      return { data: { status: "linked", discordId: payload.p_discord_id, linkedAt: payload.p_linked_at }, error: null };
    }
  };
  return state;
}

class QueryDouble {
  constructor(state, table) {
    this.state = state;
    this.table = table;
    this.filters = [];
  }

  select() {
    this.state.operations.push(`select:${this.table}`);
    return this;
  }

  eq(column, value) {
    this.filters.push((row) => row[column] === value);
    return this;
  }

  is(column, value) {
    this.filters.push((row) => row[column] === value);
    return this;
  }

  async maybeSingle() {
    return { data: this.rows()[0] || null, error: null };
  }

  async insert(row) {
    this.state.operations.push(`insert:${this.table}`);
    if (this.table === "used_link_nonces") {
      if (this.state.usedNonces.has(row.nonce)) return { error: { code: "23505" } };
      this.state.usedNonces.add(row.nonce);
    }
    return { error: null };
  }

  async upsert(row) {
    this.state.operations.push(`upsert:${this.table}`);
    const conflict = this.state.discordLinks.find((link) => link.discord_id === row.discord_id && link.user_id !== row.user_id);
    if (conflict) return { error: { code: "23505" } };
    const index = this.state.discordLinks.findIndex((link) => link.user_id === row.user_id);
    if (index === -1) this.state.discordLinks.push(row);
    else this.state.discordLinks[index] = { ...this.state.discordLinks[index], ...row };
    return { error: null };
  }

  then(resolve) {
    return Promise.resolve({ data: this.rows(), error: null }).then(resolve);
  }

  rows() {
    let rows;
    if (this.table === "used_link_nonces") rows = [...this.state.usedNonces].map((nonce) => ({ nonce }));
    else if (this.table === "discord_links") rows = this.state.discordLinks;
    else if (this.table === "progress") rows = this.state.progress;
    else if (this.table === "verified_track_completions") rows = this.state.completions;
    else if (this.table === "issued_certificates") rows = this.state.certificates;
    else rows = [];
    return rows.filter((row) => this.filters.every((filter) => filter(row)));
  }
}
