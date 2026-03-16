import type { FastifyInstance } from "fastify";
import healthRoutes from "./v1/health.route";

export default function registerRoutes(app: FastifyInstance) {
  app.register(healthRoutes, { prefix: "/api/v1" });
}
