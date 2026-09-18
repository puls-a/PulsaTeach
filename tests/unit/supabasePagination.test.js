import { describe, expect, test, vi } from "vitest";
import { readSupabasePages } from "../../server/supabaseStoreHelpers.js";

describe("Supabase pagination", () => {
  test("reads past the PostgREST row limit without dropping records", async () => {
    const records = Array.from({ length: 2005 }, (_, id) => ({ id }));
    const readPage = vi.fn(async (from, to) => ({ data: records.slice(from, to + 1), error: null }));

    await expect(readSupabasePages(readPage)).resolves.toEqual(records);
    expect(readPage.mock.calls).toEqual([[0, 999], [1000, 1999], [2000, 2999]]);
  });

  test("stops immediately on a database error", async () => {
    const error = new Error("database unavailable");
    await expect(readSupabasePages(async () => ({ data: null, error }))).rejects.toBe(error);
  });
});
