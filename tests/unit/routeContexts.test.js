import { describe, expect, test } from "vitest";
import { createRouteContexts, routeDependencyKeys } from "../../server/routeContexts.js";

describe("createRouteContexts", () => {
  test("provides each route only its declared dependencies", () => {
    const allKeys = new Set(Object.values(routeDependencyKeys).flat());
    const source = Object.fromEntries([...allKeys].map((key) => [key, Symbol(key)]));
    source.unrelatedDependency = Symbol("unrelated");

    const contexts = createRouteContexts(source);

    for (const [routeName, expectedKeys] of Object.entries(routeDependencyKeys)) {
      expect(Object.keys(contexts[routeName])).toEqual(expectedKeys);
      expect(contexts[routeName]).not.toHaveProperty("unrelatedDependency");
      expect(Object.isFrozen(contexts[routeName])).toBe(true);
    }
    expect(Object.isFrozen(contexts)).toBe(true);
  });

  test("fails fast when a route dependency is missing", () => {
    expect(() => createRouteContexts({})).toThrow(/Missing system route dependencies/);
  });

  test("keeps authorization dependencies limited to routes that use them", () => {
    const allKeys = new Set(Object.values(routeDependencyKeys).flat());
    const source = Object.fromEntries([...allKeys].map((key) => [key, key]));
    const contexts = createRouteContexts(source);

    expect(contexts.system).not.toHaveProperty("requireRole");
    expect(contexts.courses).toHaveProperty("requireRole");
    expect(contexts.accounts).toHaveProperty("requireAuthenticatedRequest");
    expect(contexts.authoring).toHaveProperty("requireRole");
    expect(contexts.learning).toHaveProperty("authorizePayloadUser");
  });
});
