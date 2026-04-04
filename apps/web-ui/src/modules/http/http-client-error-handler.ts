import {
  handleUnauthorized,
  isUnauthorizedError,
} from "./error-handler/handle-unauthorized";

export async function handleResponseError(error: any) {
  const originalRequest = error.config;

  if (isUnauthorizedError(error)) {
    return handleUnauthorized(originalRequest);
  }

  return Promise.reject(error);
}
