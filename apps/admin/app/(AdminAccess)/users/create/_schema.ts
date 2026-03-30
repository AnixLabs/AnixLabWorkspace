import { signupSchema } from "@shared/lib/zod";
import { roles } from "@shared/auth/permissions";
import z from "zod";
import type { Role } from "@shared/auth/types";

export const roleEnum = Object.keys(roles) as Role[];

const { firstName, email, password } = signupSchema.shape;

export const createUserSchema = z.object({
  name: firstName,
  email,
  password,
  role: z.enum(roleEnum),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateUserErrors = Partial<Record<keyof CreateUserInput | "_root", string>>;
