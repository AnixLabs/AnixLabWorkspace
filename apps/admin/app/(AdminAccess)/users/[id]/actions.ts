"use server";

import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type Role = "user" | "admin" | "superadmin";

const h = async () => await headers();

function getRoleWeight(role?: string | null): number {
  if (role === "superadmin") return 2;
  if (role === "admin") return 1;
  return 0;
}

/** Assert the caller is logged in and has at least admin role. Returns the viewer. */
async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await h() });
  if (!session?.user) throw new Error("Unauthorized: not logged in.");
  if (getRoleWeight(session.user.role) < 1) throw new Error("Forbidden: admin role required.");
  return session.user;
}

/** Fetch target user, throwing 404 if missing. */
async function requireTargetUser(userId: string) {
  const target = await auth.api.getUser({ query: { id: userId }, headers: await h() });
  if (!target) throw new Error("Not found: user does not exist.");
  return target;
}

/**
 * Assert the viewer can act on the target.
 * Rules:
 *  - Cannot act on self (for sensitive ops).
 *  - Superadmin can act on everyone.
 *  - Admin can only act on users with lower role weight (i.e. plain "user").
 */
function assertCanAct(
  viewerRole: string | null | undefined,
  targetRole: string | null | undefined,
  viewerId: string,
  targetId: string,
  action: string,
) {
  if (viewerId === targetId) throw new Error(`Forbidden: cannot ${action} your own account.`);

  const vw = getRoleWeight(viewerRole);
  const tw = getRoleWeight(targetRole);
  const isSuperadmin = viewerRole === "superadmin";

  if (!isSuperadmin && vw <= tw)
    throw new Error(`Forbidden: cannot ${action} a ${targetRole ?? "user"} — insufficient role.`);
}

// ─── Ban / Unban ──────────────────────────────────────────────────────────────

export async function banUser(userId: string, reason?: string, expiresIn?: number) {
  const viewer = await requireAdmin();
  const target = await requireTargetUser(userId);
  assertCanAct(viewer.role, target.role, viewer.id, userId, "ban");

  await auth.api.banUser({
    body: { userId, banReason: reason, banExpiresIn: expiresIn },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}

export async function unbanUser(userId: string) {
  const viewer = await requireAdmin();
  const target = await requireTargetUser(userId);
  assertCanAct(viewer.role, target.role, viewer.id, userId, "unban");

  await auth.api.unbanUser({ body: { userId }, headers: await h() });
  revalidatePath(`/users/${userId}`);
}

// ─── Role ─────────────────────────────────────────────────────────────────────

export async function setRole(userId: string, role: Role) {
  const viewer = await requireAdmin();
  const target = await requireTargetUser(userId);
  assertCanAct(viewer.role, target.role, viewer.id, userId, "change the role of");

  // Only superadmins can grant the superadmin role
  if (role === "superadmin" && viewer.role !== "superadmin")
    throw new Error("Forbidden: only a superadmin can grant the superadmin role.");

  await auth.api.setRole({ body: { userId, role }, headers: await h() });
  revalidatePath(`/users/${userId}`);
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function revokeAllSessions(userId: string) {
  const viewer = await requireAdmin();
  if (viewer.id === userId)
    throw new Error("Forbidden: cannot revoke all sessions on your own account.");

  // Any admin/superadmin can revoke sessions of any other user (including peers)
  await auth.api.revokeUserSessions({ body: { userId }, headers: await h() });
  revalidatePath(`/users/${userId}`);
}

export async function revokeSession(sessionToken: string, userId: string) {
  await requireAdmin();

  const currentSession = await auth.api.getSession({ headers: await h() });
  if (sessionToken === currentSession?.session?.token)
    throw new Error("Forbidden: cannot revoke your own current session.");

  await auth.api.revokeUserSession({ body: { sessionToken }, headers: await h() });
  revalidatePath(`/users/${userId}`);
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function removeUser(userId: string) {
  const viewer = await requireAdmin();
  const target = await requireTargetUser(userId);
  assertCanAct(viewer.role, target.role, viewer.id, userId, "delete");

  await auth.api.removeUser({ body: { userId }, headers: await h() });
  revalidatePath("/users");
}

// ─── Password ─────────────────────────────────────────────────────────────────

export async function setPassword(userId: string, password: string) {
  await requireAdmin();
  await requireTargetUser(userId);
  // Password reset is intentionally unrestricted — any admin can reset any user's
  // password (including their own or another admin's). It's non-destructive and
  // needed for account recovery flows.

  await auth.api.setUserPassword({
    body: { userId, newPassword: password },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}
