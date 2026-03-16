import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { auth } from "@shared/auth";
import { fromNodeHeaders } from "better-auth/node";

export default fp((app: FastifyInstance) => {
  // Decorate with null
  app.decorateRequest("session", null);
  app.decorateRequest("user", null);

  // Mount all better-auth routes
  app.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
    async handler(request, reply) {
      try {
        // Construct request URL
        const url = new URL(request.url, `${request.protocol}://${request.headers.host}`);

        // Convert Fastify headers to standard Headers object
        const headers = new Headers();
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString());
        });

        // Create Fetch API-compatible request
        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          ...(request.body ? { body: JSON.stringify(request.body) } : {}),
        });

        // Process authentication request
        const response = await auth.handler(req);

        // Forward response to client
        reply.status(response.status);
        response.headers.forEach((value, key) => void reply.header(key, value));
        return reply.send(response.body ? await response.text() : null);
      } catch (error) {
        app.log.error({ err: error }, "Authentication error");
        return reply.status(500).send({
          success: false,
          code: "AUTH_FAILURE",
          message: "Internal authentication error",
        });
      }
    },
  });

  app.addHook("onRequest", async (request) => {
    try {
      const result = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
      });
      request.session = result?.session ?? null;
      request.user = result?.user ?? null;
    } catch {
      request.session = null;
      request.user = null;
    }
  });
});
