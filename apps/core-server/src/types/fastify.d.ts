import type { AuthServerSession } from "@shared/auth";

declare module "fastify" {
  interface FastifyRequest {
    session: AuthServerSession["session"] | null;
    user: AuthServerSession["user"] | null;
  }
}
