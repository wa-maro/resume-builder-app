import { ValidationError } from "@shared/errors";
import { ValidateOptions } from "@shared/types";
import type { RequestHandler } from "express";

const validate = <
  TBody = unknown,
  TParams = unknown,
  TQuery extends object = Record<string, unknown>,
>({
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
        convert: true,
      });

      if (error) {
        return next(
          new ValidationError("Invalid request query", error.details),
        );
      }

      Object.assign(req.query, value);
    }

    next();
  };
};

export default validate;
