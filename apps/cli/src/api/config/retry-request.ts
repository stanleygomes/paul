import type { AxiosInstance, AxiosRequestConfig } from "axios";

export async function retryRequest(
  httpClient: AxiosInstance,
  originalRequest: AxiosRequestConfig,
  token: string,
) {
  const request = originalRequest as any;
  request._retry = true;

  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  return httpClient(request);
}
