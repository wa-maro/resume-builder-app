import Joi from "joi";

const page = Joi.number().integer().min(1).messages({
  "number.base": "Page must be a number",
  "number.integer": "Page must be an integer",
  "number.min": "Page must be at least 1",
});

const limit = Joi.number().integer().min(1).max(100).messages({
  "number.base": "Limit must be a number",
  "number.integer": "Limit must be an integer",
  "number.min": "Limit must be at least 1",
  "number.max": "Limit cannot exceed 100",
});

const sortBy = Joi.string().messages({
  "string.base": "Sort must be a string",
});

const sortOrder = Joi.string().valid("asc", "desc").messages({
  "string.base": "Sort order must be a string",
  "any.only": "Sort order must be either asc or desc",
});

const search = Joi.string().trim().min(1).messages({
  "string.base": "Search must be a string",
  "string.empty": "Search cannot be empty",
  "string.min": "Search must contain at least 1 character",
});

const isActive = Joi.boolean().messages({
  "boolean.base": "isActive must be a boolean",
});

export const querySchema = {
  page,
  limit,
  sortBy,
  sortOrder,
  search,
  isActive,
};
