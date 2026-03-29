import type { auth } from ".";
import type { authClient } from "./client";
import type { roles } from "./permissions";

export type AuthSessionServer = typeof auth.$Infer.Session;
export type AuthSessionClient = typeof authClient.$Infer.Session;

export type Role = keyof typeof roles;
