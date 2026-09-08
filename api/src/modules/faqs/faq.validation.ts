import { querySchema } from "@shared/validators";
import Joi from "joi";

export const faqQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy
    .valid("createdAt", "updatedAt", "question", "order")
    .messages({
      "any.only":
        "Sort must be one of createdAt, updatedAt, question, or order",
    }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,
  isActive: querySchema.isActive,
});

export const addFAQSchema = Joi.object({
  question: Joi.string().trim().required().messages({
    "string.base": "Question must be a string",
    "string.empty": "Question cannot be empty",
    "any.required": "Question is required",
  }),

  answer: Joi.string().trim().required().messages({
    "string.base": "Answer must be a string",
    "string.empty": "Answer cannot be empty",
    "any.required": "Answer is required",
  }),

  order: Joi.number().integer().min(0).optional().messages({
    "number.base": "Order must be a number",
    "number.integer": "Order must be an integer",
    "number.min": "Order cannot be negative",
  }),
});

export const editFAQSchema = Joi.object({
  question: Joi.string().trim().optional().messages({
    "string.base": "Question must be a string",
  }),

  answer: Joi.string().trim().optional().messages({
    "string.base": "Answer must be a string",
  }),

  order: Joi.number().integer().min(0).optional().messages({
    "number.base": "Order must be a number",
    "number.integer": "Order must be an integer",
    "number.min": "Order cannot be negative",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
