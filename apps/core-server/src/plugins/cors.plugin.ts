import fp from "fastify-plugin";
import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import { config } from "../config";

export default fp((app: FastifyInstance) => {
  app.register(cors, {
    origin: (origin, callback) => {
      // Allow non-browser / server requests
      if (!origin) {
        return callback(null, true);
      }

      // Check if the origin is in the allowed list
      if (config.CLIENT_URLS.includes(origin)) {
        return callback(null, true);
      }

      // Log the blocked origin for debugging purposes
      app.log.warn(`❌ Blocked by CORS: ${origin}`);
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });
});
