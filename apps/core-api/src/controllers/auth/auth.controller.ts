import {
  LoginPasswordInput,
  loginPasswordSchema as loginZodSchema,
  RegisterInput,
  registerSchema as registerZodSchema,
  ResetPasswordInput,
  resetPasswordSchema as resetPasswordZodSchema,
  sendCodeSchema as sendCodeZodSchema,
} from "@paul/entities";
import { FastifyInstance } from "fastify";
import { AuthError } from "../../errors/AuthError.js";
import { validateVerifyCode } from "../../schemas/validators/verify-code.validator.js";
import { CheckUserExistenceService } from "../../services/check-user-existence.service.js";
import { LoginPasswordService } from "../../services/login-password.service.js";
import { RefreshTokenService } from "../../services/refresh-token.service.js";
import { RegisterService } from "../../services/register.service.js";
import { ResetPasswordService } from "../../services/reset-password.service.js";
import { SendEmailCodeService } from "../../services/send-email-code.service.js";
import { VerifyEmailCodeService } from "../../services/verify-email-code.service.js";
import {
  checkEmailSchema,
  loginPasswordSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  sendCodeSchema,
  verifyCodeSchema,
} from "./auth.doc.js";

export class AuthController {
  constructor(
    private readonly sendEmailCodeService: SendEmailCodeService,
    private readonly verifyEmailCodeService: VerifyEmailCodeService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly loginPasswordService: LoginPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly registerService: RegisterService,
    private readonly checkUserExistenceService: CheckUserExistenceService,
  ) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: { email: string } }>(
      `${prefix}/v1/auth/check-email`,
      { schema: checkEmailSchema },
      async (request, reply) => {
        const validatedData = sendCodeZodSchema.parse(request.body);

        const { isRegistered } = await this.checkUserExistenceService.execute(
          validatedData.email,
        );

        reply.send({ isRegistered });
      },
    );

    fastify.post<{ Body: { email: string } }>(
      `${prefix}/v1/auth/send-code`,
      { schema: sendCodeSchema },
      async (request, reply) => {
        const validatedData = sendCodeZodSchema.parse(request.body);

        const { isRegistered } = await this.sendEmailCodeService.execute(
          validatedData.email,
        );

        reply.send({ message: "Verification code sent", isRegistered });
      },
    );

    fastify.post<{ Body: RegisterInput }>(
      `${prefix}/v1/auth/register`,
      { schema: registerSchema },
      async (request, reply) => {
        const validatedData = registerZodSchema.parse(request.body);
        const { token, refreshToken } = await this.registerService.execute(
          validatedData.email,
          validatedData.password,
        );

        reply.status(201).setAuthCookies(token, refreshToken).send({
          message: "User registered successfully",
          token,
          refreshToken,
        });
      },
    );

    fastify.post<{ Body: LoginPasswordInput }>(
      `${prefix}/v1/auth/login-password`,
      { schema: loginPasswordSchema },
      async (request, reply) => {
        const validatedData = loginZodSchema.parse(request.body);
        const { token, refreshToken } = await this.loginPasswordService.execute(
          validatedData.email,
          validatedData.password,
        );

        reply.setAuthCookies(token, refreshToken).send({
          message: "Logged in successfully",
          token,
          refreshToken,
        });
      },
    );

    fastify.post<{ Body: ResetPasswordInput }>(
      `${prefix}/v1/auth/reset-password`,
      { schema: resetPasswordSchema },
      async (request, reply) => {
        const validatedData = resetPasswordZodSchema.parse(request.body);
        await this.resetPasswordService.execute(
          validatedData.email,
          validatedData.code,
          validatedData.newPassword,
        );

        reply.send({ message: "Password reset successfully" });
      },
    );

    fastify.post<{ Body: { email: string; code: string } }>(
      `${prefix}/v1/auth/verify-code`,
      { schema: verifyCodeSchema },
      async (request, reply) => {
        const validatedData = validateVerifyCode(request.body);
        const result = await this.verifyEmailCodeService.execute(
          validatedData.email,
          validatedData.code,
        );

        reply.setAuthCookies(result.token, result.refreshToken).send({
          message: "Code verified successfully",
          token: result.token,
          refreshToken: result.refreshToken,
        });
      },
    );

    fastify.post<{ Body: { refreshToken?: string } }>(
      `${prefix}/v1/auth/refresh-token`,
      { schema: refreshTokenSchema },
      async (request, reply) => {
        try {
          const refreshToken =
            request.body?.refreshToken ||
            (request as any).cookies?.refresh_token;

          if (!refreshToken) {
            throw new AuthError("Refresh token is required");
          }

          const result = this.refreshTokenService.execute(refreshToken);

          reply
            .setAuthCookies(result.token, result.refreshToken)
            .send({ message: "Token refreshed successfully" });
        } catch (error) {
          fastify.log.error(error);
          throw error;
        }
      },
    );
  }
}
