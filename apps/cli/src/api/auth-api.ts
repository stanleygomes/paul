import { httpClient } from "@paul/http";
import type { SendCodeResponse, VerifyCodeResponse } from "../types/auth.types";
import { AUTH_API_URL } from "../utils/runtime-config";
import {
  sendCodeResponseSchema,
  verifyCodeResponseSchema,
} from "../validators/auth.validators";

export async function sendLoginCode(email: string): Promise<SendCodeResponse> {
  const response = await httpClient.post<SendCodeResponse>(
    `${AUTH_API_URL}/v1/auth/send-code`,
    {
      email,
    },
  );

  return sendCodeResponseSchema.parse(response.data);
}

export async function verifyLoginCode(
  email: string,
  code: string,
): Promise<VerifyCodeResponse> {
  const response = await httpClient.post<VerifyCodeResponse>(
    `${AUTH_API_URL}/v1/auth/verify-code`,
    {
      email,
      code,
    },
  );

  return verifyCodeResponseSchema.parse(response.data);
}
