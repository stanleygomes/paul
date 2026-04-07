export interface SendCodeResponse {
  message: string;
  isRegistered: boolean;
}

export interface VerifyCodeResponse {
  token: string;
  refreshToken: string;
  isNew: boolean;
}
