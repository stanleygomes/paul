import type { AxiosError } from "axios";

export function isUnauthorizedError(error: any): error is AxiosError {
  const status = error.response?.status;
  const url = error.config?.url;
  const isRetry = error.config?._retry;

  return (
    status === 401 &&
    error.config &&
    !isRetry &&
    !url?.includes("/v1/auth/refresh-token")
  );
}
