import { httpClient } from "@paul/http";
import { AUTH_API_URL } from "../../config/api-config";

export interface SendCodeResponse {
  message: string;
  isRegistered: boolean;
}

export interface AuthResponse {
  message: string;
}

export type VerifyCodeResponse = AuthResponse;

export type RefreshTokenResponse = AuthResponse;

export interface CheckEmailResponse {
  isRegistered: boolean;
}

export const authService = {
  async checkEmail(email: string): Promise<CheckEmailResponse> {
    const response = await httpClient.post<CheckEmailResponse>(
      `${AUTH_API_URL}/v1/auth/check-email`,
      {
        email,
      },
    );

    return response.data;
  },

  async register(email: string, password: string): Promise<any> {
    const response = await httpClient.post<any>(
      `${AUTH_API_URL}/v1/auth/register`,
      {
        email,
        password,
      },
    );

    return response.data;
  },

  async sendCode(email: string): Promise<SendCodeResponse> {
    const response = await httpClient.post<SendCodeResponse>(
      `${AUTH_API_URL}/v1/auth/send-code`,
      {
        email,
      },
    );

    return response.data;
  },

  async loginPassword(email: string, password: string): Promise<any> {
    const response = await httpClient.post<any>(
      `${AUTH_API_URL}/v1/auth/login-password`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  },

  async resetPassword(data: {
    email: string;
    code: string;
    newPassword: string;
  }): Promise<any> {
    const response = await httpClient.post<any>(
      `${AUTH_API_URL}/v1/auth/reset-password`,
      data,
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
      {
        withCredentials: true,
      },
    );

    return response.data;
  },

  async getMe(): Promise<any> {
    const response = await httpClient.get(`${AUTH_API_URL}/v1/auth/me`);
    return response.data;
  },

  async refreshToken(): Promise<any> {
    const response = await httpClient.post(
      `${AUTH_API_URL}/v1/auth/refresh-token`,
      {},
    );
    return response.data;
  },

  async updateMe(data: { name: string }): Promise<any> {
    const response = await httpClient.patch(`${AUTH_API_URL}/v1/auth/me`, data);
    return response.data;
  },
};
