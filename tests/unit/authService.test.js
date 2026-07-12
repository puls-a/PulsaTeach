import { describe, expect, test, vi } from "vitest";
import { createAuthService } from "../../server/authService.js";

function responseDouble() {
  return {
    statusCode: null,
    payload: null,
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    }
  };
}

function runMiddleware(middleware, request) {
  return new Promise((resolve, reject) => {
    middleware(request, responseDouble(), (error) => error ? reject(error) : resolve(request));
  });
}

describe("createAuthService", () => {
  test("combines trusted metadata and profile roles while ignoring user metadata", async () => {
    const supabaseAdmin = {
      from: vi.fn(() => ({
        select() { return this; },
        eq() { return this; },
        async maybeSingle() {
          return { data: { roles: ["reviewer", " reviewer ", null] }, error: null };
        }
      }))
    };
    const service = createAuthService({
      getUserFromAccessToken: vi.fn(async () => ({
        id: "auth-1",
        app_metadata: { role: "learner" },
        user_metadata: { roles: ["admin", "author"] }
      })),
      shouldTrySupabase: () => true,
      supabaseAdmin
    });
    const request = {
      headers: { authorization: "Bearer valid-token" }
    };

    await runMiddleware(service.attachAuthUser, request);

    expect(request.authUserId).toBe("supabase-auth-1");
    expect(request.authRoles).toEqual(["learner", "reviewer"]);
  });

  test("keeps local identities and development admin access explicit", async () => {
    const service = createAuthService({
      adminAccessKey: "dev-secret",
      getUserFromAccessToken: vi.fn(),
      localIdentityEnabled: true,
      shouldTrySupabase: () => false
    });
    const request = {
      headers: {
        "x-pulsateach-user-id": "local-learner-example",
        "x-pulsateach-admin-key": "dev-secret"
      }
    };

    await runMiddleware(service.attachAuthUser, request);

    expect(request.authUserId).toBe("local-learner-example");
    expect(request.authUser.provider).toBe("local-development");
    expect(request.authRoles).toEqual(["admin", "author", "reviewer"]);
  });

  test("does not trust malformed local identity headers", async () => {
    const service = createAuthService({
      getUserFromAccessToken: vi.fn(),
      localIdentityEnabled: true,
      shouldTrySupabase: () => false
    });
    const request = { headers: { "x-pulsateach-user-id": "../admin" } };

    await runMiddleware(service.attachAuthUser, request);

    expect(request.authUserId).toBeUndefined();
    expect(request.authRoles).toEqual([]);
  });

  test("returns 401 for anonymous role checks and 403 for insufficient roles", () => {
    const service = createAuthService({
      getUserFromAccessToken: vi.fn(),
      shouldTrySupabase: () => false
    });
    const anonymousResponse = responseDouble();
    const authenticatedResponse = responseDouble();
    const next = vi.fn();

    service.requireRole("admin")({ requestId: "req-anon", authRoles: [] }, anonymousResponse, next);
    service.requireRole("admin")({ requestId: "req-user", authUser: { id: "user" }, authRoles: ["learner"] }, authenticatedResponse, next);

    expect(anonymousResponse.statusCode).toBe(401);
    expect(anonymousResponse.payload.error.code).toBe("AUTH_REQUIRED");
    expect(authenticatedResponse.statusCode).toBe(403);
    expect(authenticatedResponse.payload.error.code).toBe("ROLE_REQUIRED");
    expect(next).not.toHaveBeenCalled();
  });

  test("propagates profile lookup failures to Express error handling", async () => {
    const failure = new Error("profile unavailable");
    const service = createAuthService({
      getUserFromAccessToken: vi.fn(async () => ({ id: "auth-2", app_metadata: {} })),
      shouldTrySupabase: () => true,
      supabaseAdmin: {
        from: () => ({
          select() { return this; },
          eq() { return this; },
          async maybeSingle() { return { data: null, error: failure }; }
        })
      }
    });

    await expect(runMiddleware(service.attachAuthUser, {
      headers: { authorization: "Bearer valid-token" }
    })).rejects.toThrow("profile unavailable");
  });
});
