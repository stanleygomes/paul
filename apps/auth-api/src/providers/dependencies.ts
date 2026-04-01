import { EmailService } from "@paul/node-utils";
import { JwtService } from "@paul/node-utils";
import type { SignOptions } from "jsonwebtoken";
import { config } from "../config/environment.js";
import { UserRepository } from "../repositories/user.repository.js";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { ApiClientRepository } from "../repositories/api-client.repository.js";
import { SendEmailCodeService } from "../services/send-email-code.service.js";
import { VerifyEmailCodeService } from "../services/verify-email-code.service.js";
import { RefreshTokenService } from "../services/refresh-token.service.js";
import { ClientCredentialsService } from "../services/client-credentials.service.js";
import { CreateApiClientService } from "../services/create-api-client.service.js";
import { GetProfileService } from "../services/get-profile.service.js";
import { UpdateProfileService } from "../services/update-profile.service.js";
import { AuthController } from "../controllers/auth/auth.controller.js";

const userRepository = new UserRepository();
const verificationCodeRepository = new VerificationCodeRepository();
const apiClientRepository = new ApiClientRepository();

const emailService = new EmailService(
  config.services.resend.apiKey,
  config.services.resend.fromEmail,
);
const jwtService = new JwtService(
  config.auth.jwtPrivateKey,
  config.auth.jwtPublicKey,
  config.auth.accessTokenExpiresIn as SignOptions["expiresIn"],
  config.auth.refreshTokenExpiresIn as SignOptions["expiresIn"],
);

const sendEmailCodeService = new SendEmailCodeService(
  verificationCodeRepository,
  userRepository,
  emailService,
);

const verifyEmailCodeService = new VerifyEmailCodeService(
  verificationCodeRepository,
  userRepository,
  jwtService,
);

const refreshTokenService = new RefreshTokenService(jwtService);
const clientCredentialsService = new ClientCredentialsService(
  apiClientRepository,
  jwtService,
);
const createApiClientService = new CreateApiClientService(apiClientRepository);
const getProfileService = new GetProfileService(userRepository);
const updateProfileService = new UpdateProfileService(userRepository);

export const authController = new AuthController(
  sendEmailCodeService,
  verifyEmailCodeService,
  refreshTokenService,
  clientCredentialsService,
  createApiClientService,
  getProfileService,
  updateProfileService,
);
