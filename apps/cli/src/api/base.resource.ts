import type { AxiosRequestConfig } from "@paul/http";
import type { HttpClient } from "../types/http.types";

export abstract class BaseResource {
  constructor(
    protected readonly client: HttpClient,
    protected readonly token?: string,
  ) {}

  protected getRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if (!this.token) {
      return config || {};
    }

    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${this.token}`,
      },
    };
  }
}
