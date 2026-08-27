import Joi from "joi";

export type TypedJoiSchema<T> = Joi.ObjectSchema<T>;

export type ValidateOptions<
  TBody = unknown,
  TParams = unknown,
  TQuery = unknown,
> = {
  body?: TypedJoiSchema<TBody>;
  params?: TypedJoiSchema<TParams>;
  query?: TypedJoiSchema<TQuery>;
};
