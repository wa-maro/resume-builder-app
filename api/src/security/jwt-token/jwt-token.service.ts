import jwt from "jsonwebtoken";
import { envConfig } from "@config";
import { AuthUser } from "@auth";
import { JwtPayload } from "./jwt-token.types.js";
import { UnauthorizedError } from "@shared/errors";

const JWT_SECRET = envConfig.jwtSecret;
const JWT_EXPIRATION = envConfig.jwtExpiration;

export const generateToken = (user: AuthUser) => {
  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
    isActive: user.isActive,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Token has expired");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError("Invalid token");
    }

    throw error;
  }
};
