import Joi from "joi";

export const ResumesQuerySchema = Joi.object({
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

  sort: Joi.string().valid("createdAt", "updatedAt", "username").messages({
    "string.base": "Sort must be a string",
    "any.only": "Sort must be one of createdAt, updatedAt, or username",
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
