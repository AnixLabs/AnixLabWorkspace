import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { config } from "@/config";
import { auth } from "@shared/auth";
import { fromNodeHeaders } from "better-auth/node";

export default fp((app: FastifyInstance) => {
  // Decorate with null
  app.decorateRequest("session", null);
  app.decorateRequest("user", null);

  // Mount all better-auth routes
  app.all("/api/auth/*", async (request, reply) => {
    const response = await auth.handler(
      new Request(`${config.BETTER_AUTH_URL}${request.url}`, {
        method: request.method,
        headers: new Headers(request.headers as Record<string, string>),
        body:
          request.method !== "GET" && request.method !== "HEAD"
            ? JSON.stringify(request.body)
            : undefined,
      }),
    );

    // Forward status, headers, body back to Fastify
    reply.status(response.status);
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });
    const body = await response.text();
    return reply.send(body);
  });

  // Populate session on every request
  app.addHook("onRequest", async (request) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
      });
      request.session = session?.session ?? null;
      request.user = session?.user ?? null;
    } catch {
      request.session = null;
      request.user = null;
    }
  });
});
