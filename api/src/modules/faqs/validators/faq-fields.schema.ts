import Joi from "joi";

export const questionSchema = Joi.string().trim().messages({
  "string.base": "Question must be a string",
  "string.empty": "Question cannot be empty",
});

export const answerSchema = Joi.string().trim().messages({
  "string.base": "Answer must be a string",
  "string.empty": "Answer cannot be empty",
});

export const orderSchema = Joi.number().integer().min(0).messages({
  "number.base": "Order must be a number",
  "number.integer": "Order must be an integer",
  "number.min": "Order cannot be negative",
});
