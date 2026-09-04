import { envConfig } from "@config";
import { AppError } from "@shared/errors";
import { ValidationError } from "@shared/errors";
import { errorLogger } from "@shared/utils";
import type { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;

    if (error instanceof ValidationError) {
      errors = error.details;
    }
  }

  const stack =
    envConfig.nodeEnv === "development" && error instanceof Error
      ? error.stack
      : undefined;

  errorLogger.error({
    message: error instanceof Error ? error.message : "Unknown error",
    statusCode,
    stack,
    route: req.originalUrl,
    method: req.method,
  });

  const responseBody: {
    success: false;
    message: string;
    errors?: unknown;
    stack?: string;
  } = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    responseBody.errors = errors;
  }

  if (stack !== undefined) {
    responseBody.stack = stack;
  }

  res.status(statusCode).json(responseBody);
};

export default errorHandler;
