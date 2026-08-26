import { rolesFromUser } from "./authRoles.js";

const LOCAL_USER_ID_PATTERN = /^[a-z0-9][a-z0-9._:@-]{2,159}$/i;
const ADMIN_ROLES = ["admin", "author", "reviewer"];

export function createAuthService({
  adminAccessKey = "",
  getUserFromAccessToken,
  localIdentityEnabled = false,
  shouldTrySupabase
}) {
  if (typeof getUserFromAccessToken !== "function") {
    throw new TypeError("getUserFromAccessToken must be a function.");
  }
  if (typeof shouldTrySupabase !== "function") {
    throw new TypeError("shouldTrySupabase must be a function.");
  }

  async function attachAuthUser(request, _response, next) {
    try {
      const authorization = request.headers.authorization || "";
      const token = authorization.startsWith("Bearer ") ? authorization.slice("Bearer ".length).trim() : "";
      request.authRoles = [];

      if (token && shouldTrySupabase()) {
        const user = await getUserFromAccessToken(token);
        if (user?.id) {
          request.authUser = user;
          request.authUserId = `supabase-${user.id}`;
          request.authRoles = uniqueRoles(rolesFromUser(user));
        }
      }

      attachLocalIdentity(request);
      attachDevelopmentAdmin(request);
      next();
    } catch (error) {
      next(error);
    }
  }

  function attachLocalIdentity(request) {
    const localUserId = request.headers["x-pulsateach-user-id"];
    if (request.authUserId || !localIdentityEnabled || typeof localUserId !== "string" || !LOCAL_USER_ID_PATTERN.test(localUserId)) return;

    request.authUserId = localUserId;
    request.authUser = {
      id: localUserId,
      email: localUserId.startsWith("local-") ? localUserId.slice(6).replaceAll("-", ".") : null,
      app_metadata: {},
      user_metadata: {},
      provider: "local-development"
    };
  }

  function attachDevelopmentAdmin(request) {
    const providedAdminKey = request.headers["x-pulsateach-admin-key"];
    if (!adminAccessKey || typeof providedAdminKey !== "string" || providedAdminKey !== adminAccessKey) return;
    request.authRoles = uniqueRoles([...(request.authRoles || []), ...ADMIN_ROLES]);
  }

  function authorizeUserParam(request, response) {
    if (!request.authUserId) {
      sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
      return false;
    }
    if (request.params.userId !== request.authUserId) {
      sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot access another learner.");
      return false;
    }
    return true;
  }

  function authorizePayloadUser(request, response, payloadUserId) {
    if (request.authUserId && payloadUserId && payloadUserId !== request.authUserId) {
      sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot write another learner.");
      return false;
    }
    return true;
  }

  function requireAuthenticatedWrite(request, response) {
    if (request.authUserId || request.authRoles?.includes("admin")) return true;
    sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
    return false;
  }

  function requireAuthenticatedRequest(request, response, next) {
    if (request.authUserId) {
      next();
      return;
    }
    sendApiError(response, request, 401, "AUTH_REQUIRED", "A learner identity is required.");
  }

  function requireRole(...roles) {
    return (request, response, next) => {
      if (hasRole(request, ...roles)) {
        next();
        return;
      }
      const authenticated = Boolean(request.authUser || request.authRoles?.length);
      sendApiError(
        response,
        request,
        authenticated ? 403 : 401,
        authenticated ? "ROLE_REQUIRED" : "AUTH_REQUIRED",
        `Required role: ${roles.join(" or ")}.`
      );
    };
  }

  function hasRole(request, ...roles) {
    const granted = new Set(request.authRoles || []);
    return roles.some((role) => granted.has(role));
  }

  return {
    attachAuthUser,
    authorizePayloadUser,
    authorizeUserParam,
    hasRole,
    requireAuthenticatedRequest,
    requireAuthenticatedWrite,
    requireRole,
    sendApiError
  };
}

export function sendApiError(response, request, status, code, message, details) {
  response.status(status).json({
    error: {
      code,
      message,
      ...(details === undefined ? {} : { details })
    },
    requestId: request.requestId
  });
}

function uniqueRoles(value) {
  const roles = Array.isArray(value) ? value : [value];
  return Array.from(new Set(
    roles
      .filter((role) => typeof role === "string")
      .map((role) => role.trim())
      .filter(Boolean)
  ));
}
