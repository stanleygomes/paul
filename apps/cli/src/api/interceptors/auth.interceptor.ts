import type { AxiosInstance } from "axios";
import { UnauthorizedHandler } from "../handlers/unauthorized/unauthorized.handler";

export class AuthInterceptor {
  private handler: UnauthorizedHandler;

  constructor(private readonly httpClient: AxiosInstance) {
    this.handler = new UnauthorizedHandler(this.httpClient);
  }

  public setup(): void {
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (UnauthorizedHandler.isUnauthorizedError(error) && error.config) {
          return this.handler.handle(error.config);
        }
        return Promise.reject(error);
      },
    );
  }
}
