import jwt from "jsonwebtoken";
import { envConfig } from "@config";
import { AuthUser } from "@auth";
import { JwtPayload } from "./jwt-token.types.js";

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
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
