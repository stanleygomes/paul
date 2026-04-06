import { EmailService } from "@paul/node-utils";
import { JwtService } from "@paul/node-utils";
import type { SignOptions } from "jsonwebtoken";
import { config } from "../config/environment";
import { UserRepository } from "../repositories/user.repository";
import { VerificationCodeRepository } from "../repositories/verification-code.repository";
import { ApiClientRepository } from "../repositories/api-client.repository";
import { SendEmailCodeService } from "../services/send-email-code.service";
import { VerifyEmailCodeService } from "../services/verify-email-code.service";
import { RefreshTokenService } from "../services/refresh-token.service";
import { ClientCredentialsService } from "../services/client-credentials.service";
import { CreateApiClientService } from "../services/create-api-client.service";
import { GetProfileService } from "../services/get-profile.service";
import { UpdateProfileService } from "../services/update-profile.service";
import { AuthController } from "../controllers/auth/auth.controller";

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
