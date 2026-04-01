import { httpClient } from "@paul/http";
import { AUTH_API_URL } from "../../config/api-config";

export interface SendCodeResponse {
  message: string;
  isRegistered: boolean;
}

export interface VerifyCodeResponse {
  token: string;
  refreshToken: string;
  isNew: boolean;
}

export const authService = {
  async sendCode(email: string): Promise<SendCodeResponse> {
    const response = await httpClient.post<SendCodeResponse>(
      `${AUTH_API_URL}/v1/auth/send-code`,
      {
        email,
      },
    );

    return response.data;
  },

  async verifyCode(email: string, code: string): Promise<VerifyCodeResponse> {
    const response = await httpClient.post<VerifyCodeResponse>(
      `${AUTH_API_URL}/v1/auth/verify-code`,
      {
        email,
        code,
      },
    );

    return response.data;
  },
  async getMe(token: string): Promise<any> {
    const response = await httpClient.get(`${AUTH_API_URL}/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async updateMe(token: string, data: { name: string }): Promise<any> {
    const response = await httpClient.patch(
      `${AUTH_API_URL}/v1/auth/me`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
};
