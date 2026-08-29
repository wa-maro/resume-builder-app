import Joi from "joi";

export type TypedJoiSchema<T> = Joi.ObjectSchema<T>;
export type TypedJoiSchemaObject<T extends object> = Joi.ObjectSchema<T>;

export type ValidateOptions<
  TBody = unknown,
  TParams = unknown,
  TQuery extends object = Record<string, unknown>,
> = {
  body?: TypedJoiSchema<TBody>;
  params?: TypedJoiSchema<TParams>;
  query?: TypedJoiSchemaObject<TQuery>;
};
