import { describe, expect, test, vi } from "vitest";
import { checkSupabaseReadiness } from "../../server/supabaseStatus.js";

describe("Supabase readiness", () => {
  test("uses read-only table probes and never calls an RPC", async () => {
    const probes = [];
    const supabase = {
      from: vi.fn((table) => ({
        select: vi.fn((columns, options) => ({
          limit: vi.fn(async (limit) => {
            probes.push({ table, columns, options, limit });
            return { error: null };
          })
        }))
      })),
      rpc: vi.fn()
    };

    const result = await checkSupabaseReadiness(supabase);

    expect(result.ok).toBe(true);
    expect(probes).toHaveLength(1);
    expect(probes.every((probe) => probe.columns === "id" && probe.options.head === true && probe.limit === 1)).toBe(true);
    expect(supabase.rpc).not.toHaveBeenCalled();
  });
});
