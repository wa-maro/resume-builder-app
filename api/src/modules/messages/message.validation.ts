import Joi from "joi";

export const messagesQuerySchema = Joi.object({
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

  isReplied: Joi.boolean().messages({
    "boolean.base": "isReplied must be a boolean",
  }),
});

export const createMessageSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  message: Joi.string().trim().min(1).max(5000).required().messages({
    "string.base": "Message must be a string",
    "string.empty": "Message is required",
    "string.min": "Message cannot be empty",
    "string.max": "Message cannot exceed 5000 characters",
    "any.required": "Message is required",
  }),
}).required();

export const replyMessageSchema = Joi.object({
  reply: Joi.string().trim().min(1).max(5000).required().messages({
    "string.base": "Reply must be a string",
    "string.empty": "Reply is required",
    "string.min": "Reply cannot be empty",
    "string.max": "Reply cannot exceed 5000 characters",
    "any.required": "Reply is required",
  }),
}).required();
