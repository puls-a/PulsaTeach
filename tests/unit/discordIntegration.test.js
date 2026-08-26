import { createHmac } from "node:crypto";
import { describe, expect, test } from "vitest";
import { completedDiscordTrackIds, verifyDiscordLinkState, verifyPulsaBotAuthorization } from "../../server/discordIntegration.js";

describe("Discord integration", () => {
  test("verifies a short-lived signed link before parsing identity", () => {
    const payload = Buffer.from(JSON.stringify({ discordId: "123456789012345678", nonce: "secure-link-nonce", issuedAt: 1000, expiresAt: 2000 })).toString("base64url");
    const state = `${payload}.${createHmac("sha256", "secret").update(payload).digest("base64url")}`;
    expect(verifyDiscordLinkState(state, "secret", 1500)).toMatchObject({ discordId: "123456789012345678" });
    expect(() => verifyDiscordLinkState(`${payload}.invalid`, "secret", 1500)).toThrowError(expect.objectContaining({ code: "DISCORD_LINK_INVALID_SIGNATURE" }));
  });

  test("uses timing-safe bot credentials and only maps complete tracks", () => {
    expect(() => verifyPulsaBotAuthorization("Bearer wrong", "secret")).toThrowError(expect.objectContaining({ code: "PULSABOT_UNAUTHORIZED" }));
    expect(completedDiscordTrackIds({ completed: { lesson: true } }, [{ id: "html", modules: [{ lessons: [{ id: "lesson" }] }] }])).toEqual(["html"]);
  });
});
