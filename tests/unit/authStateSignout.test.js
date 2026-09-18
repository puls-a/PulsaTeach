// @vitest-environment jsdom
import { beforeEach, describe, expect, test, vi } from "vitest";

const signOut = vi.fn();

vi.mock("../../src/supabaseClient.js", () => ({
  isSupabaseBrowserConfigured: true,
  getSupabaseClient: async () => ({ auth: { signOut } })
}));

const { signOutSupabase } = await import("../../src/authState.js");

describe("Supabase sign-out cleanup", () => {
  beforeEach(() => {
    localStorage.clear();
    signOut.mockReset();
  });

  test("clears local ownership even when remote sign-out fails", async () => {
    localStorage.setItem("pulsateach-local-session", "stale-session");
    localStorage.setItem("pulsateach-user-id", "supabase-user-1");
    signOut.mockResolvedValue({ error: new Error("session already deleted") });

    await expect(signOutSupabase()).rejects.toThrow("session already deleted");
    expect(localStorage.getItem("pulsateach-local-session")).toBeNull();
    expect(localStorage.getItem("pulsateach-user-id")).toMatch(/^guest-/);
  });
});
