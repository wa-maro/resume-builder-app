import { ForbiddenError } from "@shared/errors";
import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../../modules/users/user.types.js";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError());
    }

    next();
  };
};
