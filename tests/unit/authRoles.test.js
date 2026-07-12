import { describe, expect, test } from "vitest";
import { rolesFromUser } from "../../server/authRoles.js";

describe("rolesFromUser", () => {
  test("accepts roles from server-controlled app metadata", () => {
    expect(rolesFromUser({
      app_metadata: { roles: ["author", "reviewer"] }
    })).toEqual(["author", "reviewer"]);
  });

  test("ignores roles injected through user metadata", () => {
    expect(rolesFromUser({
      app_metadata: { role: "learner" },
      user_metadata: { roles: ["admin", "author", "reviewer"] }
    })).toEqual(["learner"]);
  });

  test("returns no role when only user metadata contains authorization data", () => {
    expect(rolesFromUser({
      user_metadata: { role: "admin" }
    })).toEqual([]);
  });

  test("normalizes and deduplicates trusted roles", () => {
    expect(rolesFromUser({
      app_metadata: { roles: [" admin ", "admin", "", null] }
    })).toEqual(["admin"]);
  });
});
