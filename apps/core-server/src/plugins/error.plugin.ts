import fp from "fastify-plugin";
import type { FastifyError, FastifyInstance } from "fastify";
import { AppError } from "../lib/errors";
import { ZodError } from "zod";

export default fp((app: FastifyInstance) => {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error({ err: error }, error.message);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        code: error.code,
        message: error.message,
      });
    }

    // Zod validation errors
    if (error instanceof ZodError) {
      return reply.status(400).send({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Invalid request data",
        errors: error.flatten().fieldErrors,
      });
    }

    // Fastify's own schema validation errors
    if (error.validation) {
      return reply.status(400).send({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Invalid request data",
        errors: error.validation,
      });
    }

    // Mongoose duplicate key
    if (error.code === "11000") {
      return reply.status(409).send({
        success: false,
        code: "DUPLICATE",
        message: "Resource already exists",
      });
    }

    // Fallback
    return reply.status(500).send({
      success: false,
      code: "INTERNAL_ERROR",
      message: process.env.NODE_ENV === "production" ? "Something went wrong" : error.message,
    });
  });

  // 404 handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      code: "NOT_FOUND",
      message: `Route ${request.method} ${request.url} not found`,
    });
  });
});
