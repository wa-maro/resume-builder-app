import type { NextFunction, Request, RequestHandler, Response } from "express";

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

const tryCatch = (
  controllerFunc: ControllerFunction,
  controllerName = "UnnamedController",
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await controllerFunc(req, res, next);
    } catch (error: unknown) {
      if (error instanceof Error) {
        error.message = `[${controllerName}] ${error.message}`;
      }

      next(error);
    }
  };
};

export default tryCatch;
