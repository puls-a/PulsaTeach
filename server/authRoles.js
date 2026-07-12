/**
 * Extract authorization roles from metadata controlled by the authentication
 * server. Supabase users can edit user_metadata, so it must never participate
 * in an authorization decision.
 */
export function rolesFromUser(user = {}) {
  const appMetadata = user.app_metadata || {};
  const rawRoles = appMetadata.roles || appMetadata.role || [];
  const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];

  return Array.from(new Set(
    roles
      .filter((role) => typeof role === "string")
      .map((role) => role.trim())
      .filter(Boolean)
  ));
}
