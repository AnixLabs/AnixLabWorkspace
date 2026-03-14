import fp from "fastify-plugin";
import rateLimit from "@fastify/rate-limit";
import type { FastifyInstance } from "fastify";
import { config } from "../config";

export default fp((app: FastifyInstance) => {
  app.register(rateLimit, {
    max: config.NODE_ENV === "production" ? 100 : 1000,
    timeWindow: "1 minute",
    errorResponseBuilder: () => ({
      success: false,
      code: "RATE_LIMITED",
      message: "Too many requests, slow down",
    }),
  });
});
