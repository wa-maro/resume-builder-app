import jwt from "jsonwebtoken";
import { envConfig } from "../../config/env.js";
import { AuthUser } from "../../modules/auth/auth.types.js";
import { JwtPayload } from "./jwt-token.types.js";

const JWT_SECRET = envConfig.jwtSecret;
const JWT_EXPIRATION = envConfig.jwtExpiration;

export const generateToken = (user: AuthUser) => {
  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
