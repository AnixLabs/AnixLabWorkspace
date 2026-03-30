"use server";

import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Role } from "@shared/auth/types";
import { getRoleWeight } from "@shared/auth/utils";

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized: not logged in.");
  return session;
}

async function requireTargetUser(userId: string) {
  const target = await auth.api.getUser({ query: { id: userId }, headers: await headers() });
  if (!target) throw new Error("Not found: user does not exist.");
  return target;
}

/** Superadmin can act on anyone. Everyone else can only act on strictly lower roles. */
function assertOutranks(viewerRole: string | null | undefined, targetRole?: string | null) {
  if (viewerRole === "superadmin") return; // superadmin bypasses all
  if (getRoleWeight(viewerRole) <= getRoleWeight(targetRole))
    throw new Error(`Forbidden: cannot act on a ${targetRole ?? "user"} of equal or higher role.`);
}

// Ban / Unban
export async function banUser(userId: string, reason?: string, expiresIn?: number) {
  const { user: viewer } = await requireSession();
  if (viewer.id === userId) throw new Error("Forbidden: cannot ban your own account.");

  const target = await requireTargetUser(userId);
  assertOutranks(viewer.role, target.role);

  const { success } = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { user: ["ban"] } },
  });
  if (!success) throw new Error("Forbidden: you lack permission to ban users.");

  await auth.api.banUser({
    body: { userId, banReason: reason, banExpiresIn: expiresIn },
    headers: await headers(),
  });
  revalidatePath(`/users/${userId}`);
}

export async function unbanUser(userId: string) {
  const { user: viewer } = await requireSession();
  if (viewer.id === userId) throw new Error("Forbidden: cannot unban your own account.");

  const target = await requireTargetUser(userId);
  assertOutranks(viewer.role, target.role);

  const { success } = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { user: ["ban"] } },
  });
  if (!success) throw new Error("Forbidden: you lack permission to unban users.");

  await auth.api.unbanUser({ body: { userId }, headers: await headers() });
  revalidatePath(`/users/${userId}`);
}

// Role
export async function setRole(userId: string, role: Role) {
  const { user: viewer } = await requireSession();
  if (viewer.id === userId) throw new Error("Forbidden: cannot change your own role.");

  const target = await requireTargetUser(userId);
  assertOutranks(viewer.role, target.role);

  // Also cannot assign a role equal to or above their own (except superadmin)
  if (viewer.role !== "superadmin" && getRoleWeight(role) >= getRoleWeight(viewer.role))
    throw new Error(`Forbidden: cannot assign the ${role} role — it meets or exceeds your own.`);

  const { success } = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { user: ["set-role"] } },
  });
  if (!success) throw new Error("Forbidden: you lack permission to change roles.");

  await auth.api.setRole({ body: { userId, role }, headers: await headers() });
  revalidatePath(`/users/${userId}`);
}

// Sessions
export async function revokeAllSessions(userId: string) {
  const { user: viewer } = await requireSession();
  if (viewer.id === userId)
    throw new Error("Forbidden: cannot revoke all sessions on your own account.");

  const target = await requireTargetUser(userId);
  assertOutranks(viewer.role, target.role);

  const { success } = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { session: ["revoke"] } },
  });
  if (!success) throw new Error("Forbidden: you lack permission to revoke sessions.");

  await auth.api.revokeUserSessions({ body: { userId }, headers: await headers() });
  revalidatePath(`/users/${userId}`);
}

export async function revokeSession(sessionToken: string, userId: string) {
  const { session: currentSession, user: viewer } = await requireSession();

  const target = await requireTargetUser(userId);
  assertOutranks(viewer.role, target.role);

  const { success } = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { session: ["revoke"] } },
  });
  if (!success) throw new Error("Forbidden: you lack permission to revoke sessions.");

  if (sessionToken === currentSession.token)
    throw new Error("Forbidden: cannot revoke your own current session.");

  await auth.api.revokeUserSession({ body: { sessionToken }, headers: await headers() });
  revalidatePath(`/users/${userId}`);
}

// Delete User
export async function removeUser(userId: string) {
  const { user: viewer } = await requireSession();
  if (viewer.id === userId) throw new Error("Forbidden: cannot delete your own account.");

  const target = await requireTargetUser(userId);
  assertOutranks(viewer.role, target.role);

  const { success } = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { user: ["delete"] } },
  });
  if (!success) throw new Error("Forbidden: you lack permission to delete users.");

  await auth.api.removeUser({ body: { userId }, headers: await headers() });
  revalidatePath("/users");
}

// Password
export async function setPassword(userId: string, password: string) {
  const { user: viewer } = await requireSession();

  const target = await requireTargetUser(userId);
  // Allow setting your own password, otherwise must outrank
  if (viewer.id !== userId) assertOutranks(viewer.role, target.role);

  const { success } = await auth.api.userHasPermission({
    body: { userId: viewer.id, permissions: { user: ["set-password"] } },
  });
  if (!success) throw new Error("Forbidden: you lack permission to set passwords.");

  await auth.api.setUserPassword({
    body: { userId, newPassword: password },
    headers: await headers(),
  });
  revalidatePath(`/users/${userId}`);
}
