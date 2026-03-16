import { z } from "zod";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

const schema = {
  response: {
    200: z.object({
      status: z.literal("ok"),
      uptime: z.number(),
      timestamp: z.iso.datetime(),
    }),
  },
};

const healthRoutes: FastifyPluginCallbackZod = (app) => {
  app.get("/health", { schema }, async (_request, reply) => {
    return reply.send({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
};

export default healthRoutes;
