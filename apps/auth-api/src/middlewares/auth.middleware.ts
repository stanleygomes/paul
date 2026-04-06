import { JwtService } from "@paul/node-utils";
import { FastifyRequest } from "fastify";
import { AuthError } from "../errors/AuthError";
import { config } from "../config/environment";

const jwtService = new JwtService(
  config.auth.jwtPrivateKey,
  config.auth.jwtPublicKey,
);

export interface UserAuth {
  id: string;
  email: string;
}

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class AuthMiddleware {
  static async authorize(request: FastifyRequest): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthError("Not authorized");
    }

    const token = authHeader.replace("Bearer ", "").trim();
    try {
      const payload = jwtService.verify(token);

      if (!payload.id || !payload.email) {
        throw new AuthError("Invalid token payload");
      }

      (request as AuthenticatedRequest).user = {
        id: payload.id,
        email: payload.email,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError("Token expired or invalid");
    }
  }
}
