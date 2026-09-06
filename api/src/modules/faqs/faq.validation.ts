import Joi from "joi";

export const faqsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),

  limit: Joi.number().integer().min(1).max(100).messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),

  sort: Joi.string().valid("createdAt", "updatedAt", "title").messages({
    "string.base": "Sort must be a string",
    "any.only": "Sort must be one of createdAt, updatedAt, or title",
  }),

  sortOrder: Joi.string().valid("asc", "desc").messages({
    "string.base": "Sort order must be a string",
    "any.only": "Sort order must be either asc or desc",
  }),

  search: Joi.string().trim().min(1).messages({
    "string.base": "Search must be a string",
    "string.empty": "Search cannot be empty",
    "string.min": "Search must contain at least 1 character",
  }),

  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be a boolean",
  }),
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
