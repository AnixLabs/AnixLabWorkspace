import { z } from "zod";
import type { Role } from "./types";

const roleWeights: Record<Role, number> = {
  superadmin: 100,
  admin: 50,
  moderator: 20,
  user: 0,
};

const roleList = Object.keys(roleWeights) as [Role, ...Role[]];

const roleSchema = z.enum(roleList);

/** Parses a comma-separated role string into an array of Role. Invalid roles are ignored. */
export function parseRoles(role?: string | null): Role[] {
  if (!role) return [];

  return role
    .split(",")
    .map((s) => s.trim())
    .filter((r): r is Role => roleSchema.safeParse(r).success);
}

/** Returns the weight of the highest role in the given role string. */
export function getRoleWeight(role?: string | null): number {
  const roles = parseRoles(role);

  if (roles.length === 0) return roleWeights.user;

  return Math.max(...roles.map((r) => roleWeights[r]));
}

/** Returns true if viewerRole has a higher role than targetRole. */
export function hasHigherRole(viewerRole?: string | null, targetRole?: Role | null): boolean {
  return getRoleWeight(viewerRole) > getRoleWeight(targetRole);
}
