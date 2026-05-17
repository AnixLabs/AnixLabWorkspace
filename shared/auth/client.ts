import { createAuthClient } from "better-auth/react";
import type { BetterAuthClientPlugin } from "better-auth/client";
import {
  twoFactorClient,
  usernameClient,
  emailOTPClient,
  adminClient,
  organizationClient,
} from "better-auth/client/plugins";
import { ac, roles } from "./permissions";

const AUTH_BASE_URL = process.env.AUTH_BASE_URL ?? process.env.NEXT_PUBLIC_AUTH_BASE_URL;

if (!AUTH_BASE_URL) {
  throw new Error("Missing AUTH_BASE_URL or NEXT_PUBLIC_AUTH_BASE_URL env");
}

const plugins = [
  twoFactorClient(),
  usernameClient(),
  emailOTPClient(),
  adminClient({ ac, roles }),
  organizationClient(),
] satisfies BetterAuthClientPlugin[];

type AuthClient = ReturnType<typeof createAuthClient<{ plugins: typeof plugins }>>;

export const authClient: AuthClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  plugins,
});

export const { useSession, signIn, signOut, signUp } = authClient;
