import { FastifyInstance, FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { config } from "../config/environment.js";

declare module "fastify" {
  interface FastifyReply {
    setAuthCookies(accessToken: string, refreshToken: string): this;
    clearAuthCookies(): this;
  }
}

const authCookiePluginCallback: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.decorateReply(
    "setAuthCookies",
    function (this: FastifyReply, accessToken: string, refreshToken: string) {
      const { cookie } = config.app;

      this.setCookie("access_token", accessToken, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        path: cookie.path,
        maxAge: cookie.maxAge.accessToken,
      });

      this.setCookie("refresh_token", refreshToken, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        path: cookie.path,
        maxAge: cookie.maxAge.refreshToken,
      });

      return this;
    },
  );

  fastify.decorateReply("clearAuthCookies", function (this: FastifyReply) {
    const { cookie } = config.app;

    this.clearCookie("access_token", {
      path: cookie.path,
    });

    this.clearCookie("refresh_token", {
      path: cookie.path,
    });

    return this;
  });
};

export const authCookiePlugin = fp(authCookiePluginCallback, {
  name: "auth-cookie-plugin",
  dependencies: ["@fastify/cookie"],
});
