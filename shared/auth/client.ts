import { createAuthClient } from "better-auth/react";
import {
  twoFactorClient,
  usernameClient,
  emailOTPClient,
  adminClient,
  organizationClient,
} from "better-auth/client/plugins";
import { ac, admin, moderator, owner, superadmin, user } from "./permissions";

const AUTH_BASE_URL = process.env.AUTH_BASE_URL ?? process.env.NEXT_PUBLIC_AUTH_BASE_URL;

if (!AUTH_BASE_URL) {
  throw new Error("Missing AUTH_BASE_URL or NEXT_PUBLIC_AUTH_BASE_URL env");
}

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  plugins: [
    twoFactorClient(),
    usernameClient(),
    emailOTPClient(),
    adminClient({ ac, roles: { user, owner, admin, moderator, superadmin } }),
    organizationClient(),
  ],
});

export const { useSession, signIn, signOut, signUp } = authClient;

export type AuthClientSession = typeof authClient.$Infer.Session;
