import fp from "fastify-plugin";
import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import { config } from "../config";

export default fp((app: FastifyInstance) => {
  app.register(cors, {
    origin: (origin, callback) => {
      if (origin && config.CLIENT_URLS.includes(origin)) {
        return callback(null, true);
      }

      app.log.warn(`❌ Blocked by CORS: ${origin}`);
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });
});
