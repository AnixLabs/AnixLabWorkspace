import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { twoFactor, username, emailOTP, admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { z } from "zod";
import { getMongoClient } from "@shared/lib/mongodb";
import { sendNoReplyMail } from "@shared/lib/sendMail";

const AuthEnvSchema = z.object({
  AUTH_BASE_URL: z.url().optional(),
  NEXT_PUBLIC_AUTH_BASE_URL: z.url().optional(),

  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),

  MONGODB_URI_AUTH: z.string(),

  BASE_URL: z.url().optional(),
  CLIENT_URLS: z
    .string()
    .transform((val) => val.split(",").map((u) => u.trim()))
    .optional(),
});

const parsed = AuthEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(z.treeifyError(parsed.error));
  process.exit(1);
}

const authEnv = parsed.data;

const AUTH_BASE_URL = parsed.data.AUTH_BASE_URL ?? parsed.data.NEXT_PUBLIC_AUTH_BASE_URL;
if (!AUTH_BASE_URL) {
  throw new Error("Missing AUTH_BASE_URL or NEXT_PUBLIC_AUTH_BASE_URL env");
}

const trustedOrigins = authEnv.CLIENT_URLS ?? [AUTH_BASE_URL];
if (authEnv.BASE_URL) trustedOrigins.push(authEnv.BASE_URL);
if (trustedOrigins.length === 0) {
  throw new Error("At least one CLIENT_URLS origin must be specified");
}

// MongoDB
const db = getMongoClient(authEnv.MONGODB_URI_AUTH).db("BetterAuth");

// Auth config
export const auth = betterAuth({
  appName: "Anix Lab",
  baseURL: AUTH_BASE_URL,
  trustedOrigins,

  database: mongodbAdapter(db),

  account: {
    accountLinking: { enabled: true },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  socialProviders: {
    google: {
      clientId: authEnv.AUTH_GOOGLE_ID,
      clientSecret: authEnv.AUTH_GOOGLE_SECRET,
    },
  },

  // advanced: {
  //   ...(authEnv.NODE_ENV === "production" && {
  //     crossSubDomainCookies: {
  //       enabled: true,
  //       domain: "anixlab.in",
  //     },
  //     useSecureCookies: true,
  //   }),

  //   cookiePrefix: "anix7-auth",
  // },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendNoReplyMail({
          sendTo: user.email,
          subject: "Verify your email address",
          html: `
            <p>Hello ${user.name ?? ""},</p>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${url}">${url}</a>
          `,
        });
      } catch (error) {
        console.error("Verify email send failed", error);
      }
    },

    sendOnSignUp: true,
    sendOnSignIn: true,

    autoSignInAfterVerification: true,
  },

  plugins: [
    twoFactor(),

    username(),

    emailOTP({
      disableSignUp: false,

      async sendVerificationOTP({ email, otp, type }) {
        let subject = "Your verification code";
        const html = `<strong>${otp}</strong>`;

        if (type === "sign-in") subject = "Sign-in verification code";
        else if (type === "email-verification") subject = "Verify your email";
        else if (type === "forget-password") subject = "Reset your password";

        try {
          await sendNoReplyMail({
            sendTo: email,
            subject,
            html,
            fromName: "Anix Lab Verification",
          });
        } catch (error) {
          console.error("OTP email send failed", error);
        }
      },
    }),

    admin(),

    nextCookies(), // ⚠️ Must be last
  ],
});

// Inferred types from better-auth
export type AuthServerSession = typeof auth.$Infer.Session;
