import { describe, expect, test, vi } from "vitest";
import { removeStorageFolderFiles } from "../../server/storageHelpers.js";

describe("storage helpers", () => {
  test("removes every page while preserving requested files", async () => {
    const files = ["avatar", ...Array.from({ length: 205 }, (_, index) => `legacy-${index}.png`)];
    const bucket = {
      list: vi.fn(async () => ({ data: files.slice(0, 100).map((name) => ({ name })), error: null })),
      remove: vi.fn(async (paths) => {
        for (const path of paths) files.splice(files.indexOf(path.split("/").at(-1)), 1);
        return { error: null };
      })
    };

    await expect(removeStorageFolderFiles(bucket, "user-1", ["avatar"])).resolves.toBe(205);
    expect(files).toEqual(["avatar"]);
    expect(bucket.list).toHaveBeenCalledTimes(4);
    expect(bucket.remove).toHaveBeenCalledTimes(3);
  });

  test("stops and surfaces storage deletion failures", async () => {
    const failure = new Error("storage unavailable");
    const bucket = {
      list: vi.fn(async () => ({ data: [{ name: "avatar.png" }], error: null })),
      remove: vi.fn(async () => ({ error: failure }))
    };
    await expect(removeStorageFolderFiles(bucket, "user-1")).rejects.toBe(failure);
  });
});
