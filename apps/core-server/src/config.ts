import { z } from "zod";

const EnvSchema = z.object({
  // ===================
  // ====<[ Global ]>====
  // ===================

  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Owner
  OWNER_EMAIL: z.email(),

  // Database
  MONGODB_URI_AUTH: z.url(),
  MONGODB_URI_SHORTURLS: z.url(),
  MONGODB_URI_IMAGEUPLOADS: z.url(),

  // Auth
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  BETTER_AUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_AUTH_BASE_URL: z.url(),
  // comma-separated allowed auth origins, supports wildcard *
  ALLOW_AUTH_ORIGIN_DIVIDE_BY_COMMA: z
    .string()
    .transform((val) => val.split(",").map((u) => u.trim())),

  // Short URL
  SHORT_URL: z.string(),
  URL_SHORTENER_TOKEN: z.string(),

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

  // comma-separated allowed origins for Socket.IO (usually just the game client)
  SOCKET_CLIENT_URLS: z.string().transform((val) => val.split(",").map((u) => u.trim())),

  // should be <this server's url>/api/auth
  BETTER_AUTH_URL: z.string().default("/api/auth"),
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
