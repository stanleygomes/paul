import { FastifyRequest } from "fastify";

export interface UserAuth {
  id: string;
  email: string;
}

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class AuthMiddleware {
  static async authorize(request: FastifyRequest): Promise<void> {
    const userId =
      (request.headers["x-user-id"] as string) || "default-user-id";
    const userEmail =
      (request.headers["x-user-email"] as string) || "default@example.com";

    (request as AuthenticatedRequest).user = {
      id: userId,
      email: userEmail,
    };
  }
}
