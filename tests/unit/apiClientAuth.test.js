// @vitest-environment jsdom
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getCatalog, loadRemoteProgress } from "../../src/apiClient.js";

describe("API client authentication gate", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test("does not send a private production request without a session", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    await expect(loadRemoteProgress()).rejects.toMatchObject({
      code: "AUTH_REQUIRED",
      status: 401
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("keeps public catalog requests available", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ tracks: [] }), {
      status: 200,
      headers: { "content-type": "application/json" }
    }));

    await expect(getCatalog()).resolves.toEqual({ tracks: [] });
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
