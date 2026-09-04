import { UnauthorizedError } from "@shared/errors";
import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../security/jwt-token/jwt-token.service.js";
import { findUserById } from "../../modules/users/user.service.js";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new UnauthorizedError());
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new UnauthorizedError());
  }

  try {
    const payload = verifyToken(token);
    if (!payload) return;

    const user = await findUserById(payload.id);

    if (!user) {
      return next(new UnauthorizedError());
    }

    req.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };

    next();
  } catch (error) {
    next(error);
  }
};
