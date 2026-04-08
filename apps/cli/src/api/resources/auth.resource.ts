import type {
  SendCodeResponse,
  VerifyCodeResponse,
} from "../../types/auth.types";
import {
  sendCodeResponseSchema,
  verifyCodeResponseSchema,
} from "../../validators/auth.validators";
import { BaseResource } from "../base.resource";

export class AuthResource extends BaseResource {
  async sendLoginCode(email: string): Promise<SendCodeResponse> {
    const response = await this.client.post<SendCodeResponse>(
      "/v1/auth/send-code",
      {
        email,
      },
    );

    return sendCodeResponseSchema.parse(response.data);
  }

  async verifyLoginCode(
    email: string,
    code: string,
  ): Promise<VerifyCodeResponse> {
    const response = await this.client.post<VerifyCodeResponse>(
      "/v1/auth/verify-code",
      {
        email,
        code,
      },
    );

    return verifyCodeResponseSchema.parse(response.data);
  }

  async refreshToken(
    token: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const response = await this.client.post<{
      token: string;
      refreshToken: string;
    }>(
      "/v1/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}
