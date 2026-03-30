"use server";

import { auth } from "@shared/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createUserSchema, type CreateUserErrors, type CreateUserInput } from "./_schema";
import { getRoleWeight } from "@shared/auth/utils";

export async function createUser(userData: CreateUserInput): Promise<CreateUserErrors> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/");

  const { success: hasPermission } = await auth.api.userHasPermission({
    body: { userId: session.user.id, permissions: { user: ["create"] } },
  });
  if (!hasPermission) return { _root: "You don't have permission to create users." };

  const parsed = createUserSchema.safeParse(userData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.issues;
    return fieldErrors.reduce((acc, issue) => {
      const key = issue.path[0] as keyof CreateUserErrors;
      acc[key] = issue.message;
      return acc;
    }, {} as CreateUserErrors);
  }

  const { name, email, password, role } = parsed.data;
  const isSuperadmin = session.user.role === "superadmin";
  const viewerWeight = getRoleWeight(session.user.role);
  const targetWeight = getRoleWeight(role);

  if (role === "superadmin" && !isSuperadmin)
    return { role: "Only a superadmin can assign the superadmin role." };

  if (!isSuperadmin && targetWeight >= viewerWeight)
    return { role: "You can only assign roles below your own." };

  try {
    const result = await auth.api.createUser({
      body: { name, email, password, role },
      headers: await headers(),
    });
    redirect(`/users/${result.user.id}`);
  } catch (error) {
    return { _root: error instanceof Error ? error.message : "An unknown error occurred." };
  }
}
