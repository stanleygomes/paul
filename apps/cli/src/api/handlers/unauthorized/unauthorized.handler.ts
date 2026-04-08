import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { TokenRefreshFailureModule } from "../../../modules/auth/token-refresh-failure.module";
import { TokenRefreshModule } from "../../../modules/auth/token-refresh.module";
import { RequestRetryer } from "../../retry-request";

export class UnauthorizedHandler {
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(private readonly httpClient: AxiosInstance) {}

  public static isUnauthorizedError(error: any): error is AxiosError {
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

  public async handle(originalRequest: AxiosRequestConfig) {
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.addRefreshSubscriber((token: string) => {
          resolve(
            RequestRetryer.retry(this.httpClient, originalRequest, token),
          );
        });
      });
    }

    (originalRequest as any)._retry = true;
    this.isRefreshing = true;

    try {
      const newToken = await TokenRefreshModule.run();
      this.onRefreshed(newToken);
      this.isRefreshing = false;
      return RequestRetryer.retry(this.httpClient, originalRequest, newToken);
    } catch (error) {
      this.isRefreshing = false;
      await TokenRefreshFailureModule.run();
      return Promise.reject(error);
    }
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }
}
