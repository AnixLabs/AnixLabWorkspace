import type { FastifyInstance, FastifySchema } from "fastify";

const schema: FastifySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string" },
        uptime: { type: "number" },
        timestamp: { type: "string" },
      },
    },
  },
};

export default function healthRoutes(app: FastifyInstance) {
  app.get("/health", { schema }, async (_request, reply) => {
    return reply.send({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
}
