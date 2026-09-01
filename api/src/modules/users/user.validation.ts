import Joi from "joi";
import { UserRole } from "./user.types.js";

export const UserQuerySchema = Joi.object({
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

  role: Joi.string()
    .valid(...Object.values(UserRole))
    .messages({
      "string.base": "Role must be a string",
      "any.only": "Role must be a valid user role",
    }),

  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be a boolean",
  }),
});

export const createUserAdminBodySchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "Username must be a text.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must not exceed 30 characters.",
    "any.required": "Username is required.",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "Email must be a text.",
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),

  role: Joi.string()
    .valid(...Object.values(UserRole))
    .required()
    .messages({
      "any.only": "Role must be either 'user' or 'admin'.",
      "string.base": "Role must be a text.",
      "string.empty": "Role is required.",
      "any.required": "Role is required.",
    }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a text.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
});
