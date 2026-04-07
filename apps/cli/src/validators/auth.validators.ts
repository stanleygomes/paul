import { z } from "zod";

export const emailInputSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const otpCodeSchema = z
  .string()
  .regex(/^\d{6}$/, "Invalid verification code");

export const sendCodeResponseSchema = z.object({
  message: z.string(),
  isRegistered: z.boolean(),
});

export const verifyCodeResponseSchema = z.object({
  token: z.string().min(1),
  refreshToken: z.string().min(1),
  isNew: z.boolean(),
});
