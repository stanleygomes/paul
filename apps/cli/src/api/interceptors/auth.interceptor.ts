import type { AxiosInstance } from "axios";
import { handleUnauthorized } from "../handlers/unauthorized/unauthorized-handler";
import { isUnauthorizedError } from "../handlers/unauthorized/is-unauthorized-error";

export function setupAuthInterceptor(httpClient: AxiosInstance) {
  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (isUnauthorizedError(error)) {
        return handleUnauthorized(httpClient, error.config);
      }
      return Promise.reject(error);
    },
  );
}
