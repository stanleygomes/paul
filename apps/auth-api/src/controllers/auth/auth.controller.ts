import { FastifyInstance } from "fastify";
import { SendEmailCodeService } from "../../services/send-email-code.service.js";
import { VerifyEmailCodeService } from "../../services/verify-email-code.service.js";
import { RefreshTokenService } from "../../services/refresh-token.service.js";
import { ClientCredentialsService } from "../../services/client-credentials.service.js";
import { CreateApiClientService } from "../../services/create-api-client.service.js";
import { GetProfileService } from "../../services/get-profile.service.js";
import { UpdateProfileService } from "../../services/update-profile.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";
import { validateSendCode } from "../../schemas/validators/send-code.validator.js";
import { validateVerifyCode } from "../../schemas/validators/verify-code.validator.js";
import { validateRefreshToken } from "../../schemas/validators/refresh-token.validator.js";
import { validateClientCredentials } from "../../schemas/validators/client-credentials.validator.js";
import { validateCreateClient } from "../../schemas/validators/create-client.validator.js";
import {
  createClientSchema,
  refreshTokenSchema,
  sendCodeSchema,
  tokenSchema,
  verifyCodeSchema,
  getProfileSchema,
  updateProfileSchema,
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
  ) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: { email: string } }>(
      `${prefix}/v1/auth/send-code`,
      { schema: sendCodeSchema },
      async (request, reply) => {
        const validatedData = validateSendCode(request.body);

        const { isRegistered } = await this.sendEmailCodeService.execute(
          validatedData.email,
        );

        reply.send({ message: "Verification code sent", isRegistered });
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
        reply.send(result);
      },
    );

    fastify.post<{ Body: { refreshToken: string } }>(
      `${prefix}/v1/auth/refresh-token`,
      { schema: refreshTokenSchema },
      async (request, reply) => {
        const validatedData = validateRefreshToken(request.body);
        const result = await this.refreshTokenService.execute(
          validatedData.refreshToken,
        );
        reply.send(result);
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
