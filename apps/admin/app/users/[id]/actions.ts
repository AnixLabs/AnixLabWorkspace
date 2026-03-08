"use server";

import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const h = async () => await headers();

export async function banUser(userId: string, reason?: string, expiresIn?: number) {
  await auth.api.banUser({
    body: { userId, banReason: reason, banExpiresIn: expiresIn },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}

export async function unbanUser(userId: string) {
  await auth.api.unbanUser({
    body: { userId },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}

export async function setRole(userId: string, role: "user" | "admin") {
  await auth.api.setRole({
    body: { userId, role },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}

export async function revokeAllSessions(userId: string) {
  await auth.api.revokeUserSessions({
    body: { userId },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}

export async function revokeSession(sessionToken: string, userId: string) {
  await auth.api.revokeUserSession({
    body: { sessionToken },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}

export async function removeUser(userId: string) {
  await auth.api.removeUser({
    body: { userId },
    headers: await h(),
  });
  revalidatePath("/users");
}

export async function setPassword(userId: string, password: string) {
  await auth.api.setUserPassword({
    body: { userId, newPassword: password },
    headers: await h(),
  });
  revalidatePath(`/users/${userId}`);
}
