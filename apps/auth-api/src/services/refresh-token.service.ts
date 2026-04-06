import { JwtService, JwtPayload } from "@paul/node-utils";
import { AuthError } from "../errors/AuthError.js";

export class RefreshTokenService {
  constructor(private readonly jwtService: JwtService) {}

  execute(refreshToken: string): { token: string; refreshToken: string } {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(refreshToken);
    } catch {
      throw new AuthError("Invalid or expired refresh token");
    }

    if (payload.type !== "refresh") {
      throw new AuthError("Invalid token type");
    }

    const token = this.jwtService.signAccessToken({
      id: payload.id,
      email: payload.email,
    });

    const newRefreshToken = this.jwtService.signRefreshToken({
      id: payload.id,
      email: payload.email,
    });

    return { token, refreshToken: newRefreshToken };
  }
}
