import { z } from "zod";

const EnvSchema = z.object({
  // ===================
  // ====<[ Global ]>====
  // ===================

  NODE_ENV: z.enum(["development", "production", "test"]),

  // Owner
  OWNER_EMAIL: z.email(),

  // Database
  MONGODB_URI_AUTH: z.url(),

  // Auth
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  BETTER_AUTH_SECRET: z.string().min(32),
  AUTH_BASE_URL: z.url(),

  // Zoho Mail
  EMAIL_HOST: z.string(),
  EMAIL_PASSWORD: z.string(),
  NO_REPLY_EMAIL: z.email(),
  CONTACT_EMAIL: z.email(),

  // ===================
  // ====<[ Local ]>====
  // ===================

  PORT: z.coerce.number().default(3001),
  HOST: z.string().default("0.0.0.0"),

  // comma-separated allowed origins for HTTP
  CLIENT_URLS: z.string().transform((val) => val.split(",").map((u) => u.trim())),

  // comma-separated allowed origins for Socket.IO
  SOCKET_CLIENT_URLS: z.string().transform((val) => val.split(",").map((u) => u.trim())),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(z.treeifyError(parsed.error));
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
export type Config = typeof config;
