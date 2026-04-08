import type { AxiosInstance, AxiosRequestConfig } from "axios";

export class RequestRetryer {
  public static async retry(
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
}
