import Fastify from "fastify";
import { Server as SocketServer } from "socket.io";
import { config } from "./config";
import { loggerConfig } from "./lib/logger";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

// Plugins
import errorPlugin from "./plugins/error.plugin";
import corsPlugin from "./plugins/cors.plugin";
import rateLimitPlugin from "./plugins/rateLimit.plugin";
import authPlugin from "./plugins/auth.plugin";

// Routes & sockets
import registerRoutes from "./routes/index";
import { registerSockets } from "./sockets/index";

async function bootstrap() {
  const app = Fastify({
    logger: loggerConfig,
    disableRequestLogging: config.NODE_ENV === "production",
  });

  // Zod schema validation and serialization
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Plugins - order matters
  await app.register(errorPlugin);
  await app.register(corsPlugin);
  await app.register(rateLimitPlugin);
  await app.register(authPlugin);

  // Routes
  registerRoutes(app);

  // Socket.IO
  const io = new SocketServer(app.server, {
    cors: {
      origin: config.SOCKET_CLIENT_URLS,
      credentials: true,
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000, // 2 min
      skipMiddlewares: false,
    },
  });

  registerSockets(io);

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal}, shutting down...`);
    await io.close();
    await app.close();
    process.exit(0);
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));

  // Start server
  try {
    await app.listen({ port: config.PORT, host: config.HOST });
    app.log.info(`🤖 Server running on ${config.HOST}:${config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

void bootstrap();
