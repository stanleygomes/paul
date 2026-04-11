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
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";
import { validateClientCredentials } from "../../schemas/validators/client-credentials.validator.js";
import { validateCreateClient } from "../../schemas/validators/create-client.validator.js";
import { validateVerifyCode } from "../../schemas/validators/verify-code.validator.js";
import { CheckUserExistenceService } from "../../services/check-user-existence.service.js";
import { ClientCredentialsService } from "../../services/client-credentials.service.js";
import { CreateApiClientService } from "../../services/create-api-client.service.js";
import { GetProfileService } from "../../services/get-profile.service.js";
import { LoginPasswordService } from "../../services/login-password.service.js";
import { RefreshTokenService } from "../../services/refresh-token.service.js";
import { RegisterService } from "../../services/register.service.js";
import { ResetPasswordService } from "../../services/reset-password.service.js";
import { SendEmailCodeService } from "../../services/send-email-code.service.js";
import { UpdateProfileService } from "../../services/update-profile.service.js";
import { VerifyEmailCodeService } from "../../services/verify-email-code.service.js";
import {
  checkEmailSchema,
  createClientSchema,
  getProfileSchema,
  loginPasswordSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  sendCodeSchema,
  tokenSchema,
  updateProfileSchema,
  verifyCodeSchema,
} from "./auth.doc.js";

export class AuthController {
  constructor(
    private readonly sendEmailCodeService: SendEmailCodeService,
    private readonly verifyEmailCodeService: VerifyEmailCodeService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly clientCredentialsService: ClientCredentialsService,
    private readonly createApiClientService: CreateApiClientService,
    private readonly getProfileService: GetProfileService,
    private readonly updateProfileService: UpdateProfileService,
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

        reply
          .status(201)
          .setAuthCookies(token, refreshToken)
          .send({ message: "User registered successfully" });
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

        reply
          .setAuthCookies(token, refreshToken)
          .send({ message: "Logged in successfully" });
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

        reply
          .setAuthCookies(result.token, result.refreshToken)
          .send({ message: "Code verified successfully" });
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

    fastify.post<{
      Body: {
        grant_type: "client_credentials";
        client_id: string;
        client_secret: string;
      };
    }>(
      `${prefix}/v1/auth/token`,
      { schema: tokenSchema },
      async (request, reply) => {
        const validatedData = validateClientCredentials(request.body);
        const result = await this.clientCredentialsService.execute(
          validatedData.client_id,
          validatedData.client_secret,
        );
        reply.send(result);
      },
    );

    fastify.post<{ Body: { name: string } }>(
      `${prefix}/v1/auth/clients`,
      { schema: createClientSchema },
      async (request, reply) => {
        const validatedData = validateCreateClient(request.body);
        const result = await this.createApiClientService.execute(
          validatedData.name,
        );
        reply.status(201).send(result);
      },
    );

    fastify.get(
      `${prefix}/v1/auth/me`,
      { preHandler: [AuthMiddleware.authorize], schema: getProfileSchema },
      async (request, reply) => {
        const { id } = (request as any).user as UserAuth;
        const result = await this.getProfileService.execute(id);
        reply.send(result);
      },
    );

    fastify.patch<{ Body: { name: string } }>(
      `${prefix}/v1/auth/me`,
      { preHandler: [AuthMiddleware.authorize], schema: updateProfileSchema },
      async (request, reply) => {
        const { id } = (request as any).user as UserAuth;
        const result = await this.updateProfileService.execute(
          id,
          request.body,
        );
        reply.send(result);
      },
    );
  }
}
