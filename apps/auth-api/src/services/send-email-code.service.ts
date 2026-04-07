import {
  EmailService,
  buildVerificationCodeEmailHtml,
  generateVerificationCode,
} from "@paul/node-utils";
import { VerificationCodeRepository } from "../repositories/verification-code.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { PinoLogger } from "../config/pino.logger.js";
import { config } from "../config/environment.js";
import { verificationCodeHtmlTemplate } from "../templates/verification-code-template.js";

const CODE_LENGTH = 6;
const EXPIRES_IN_MINUTES = 30;

const logger = PinoLogger.getLogger();

export class SendEmailCodeService {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepository,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(email: string): Promise<{ isRegistered: boolean }> {
    const user = await this.userRepository.findByEmail(email);
    const isRegistered = !!user;

    const code = generateVerificationCode(CODE_LENGTH);
    const expiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000);

    const html = buildVerificationCodeEmailHtml(
      verificationCodeHtmlTemplate,
      code,
      EXPIRES_IN_MINUTES,
      config.app.web.baseUrl ?? "#",
    );

    await this.verificationCodeRepository.create(email, code, expiresAt);

    await this.emailService.sendVerificationCode(
      `Your verification code is ${code}`,
      email,
      html,
    );

    logger.info(`Verification code sent to ${email}`);

    return { isRegistered };
  }
}
