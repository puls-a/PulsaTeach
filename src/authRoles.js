export function canManageContent(user) {
  if (import.meta.env.DEV && import.meta.env.VITE_ADMIN_ACCESS_KEY) return true;
  const metadata = { ...(user?.app_metadata || {}), ...(user?.user_metadata || {}) };
  const roles = Array.isArray(metadata.roles) ? metadata.roles : [metadata.role].filter(Boolean);
  return roles.some((role) => ["admin", "author", "reviewer"].includes(String(role)));
}
