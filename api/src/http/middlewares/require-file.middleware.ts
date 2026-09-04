import type { NextFunction, Request, RequestHandler, Response } from "express";
import { FileRequiredError } from "@shared/errors";

export const requireFile = (fieldName: string): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.file) {
      return next(new FileRequiredError(`File "${fieldName}" is required`));
    }

    next();
  };
};
