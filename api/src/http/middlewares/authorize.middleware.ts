import type { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "@shared/errors";
import { UserRole } from "@users/types";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError());
    }

    next();
  };
};
