import type { AuthSessionServer } from "@shared/auth/types";

declare module "fastify" {
  interface FastifyRequest {
    session: AuthSessionServer["session"] | null;
    user: AuthSessionServer["user"] | null;
  }
}
