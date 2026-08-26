import type { RequestHandler } from "express";
import { ValidationError } from "../errors/validation-error.js";
import { ValidateOptions } from "../../types/validation.types.js";

const validate = <TBody = unknown, TParams = unknown, TQuery = unknown>({
  body,
  params,
  query,
}: ValidateOptions<TBody, TParams, TQuery>): RequestHandler<
  TParams,
  unknown,
  TBody,
  TQuery
> => {
  return (req, _res, next) => {
    if (body) {
      const { error, value } = body.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        return next(new ValidationError("Invalid request body", error.details));
      }

      req.body = value;
    }

    // Validate and sanitize request params
    if (params) {
      const { error, value } = params.validate(req.params, {
        abortEarly: false,
      });

      if (error) {
        return next(
          new ValidationError("Invalid request params", error.details),
        );
      }

      req.params = value;
    }

    // Validate and sanitize request query
    if (query) {
      const { error, value } = query.validate(req.query, {
        abortEarly: false,
      });

      if (error) {
        return next(
          new ValidationError("Invalid request query", error.details),
        );
      }

      req.query = value;
    }

    next();
  };
};

export default validate;
