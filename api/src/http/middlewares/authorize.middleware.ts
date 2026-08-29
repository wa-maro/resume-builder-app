import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../../modules/users/user.types.js";
import { ForbiddenError } from "../../shared/errors/http-errors.js";

const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError());
    }

    next();
  };
};

export default authorize;
