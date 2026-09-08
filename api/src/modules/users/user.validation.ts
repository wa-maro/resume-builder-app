import Joi from "joi";
import { UserRole } from "@users/types";
import { querySchema } from "@shared/validators";

export const userQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy
    .valid("createdAt", "updatedAt", "username")
    .messages({
      "any.only": "Sort must be one of createdAt, updatedAt, or username",
    }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,
  isActive: querySchema.isActive,

  role: Joi.string()
    .valid(...Object.values(UserRole))
    .messages({
      "string.base": "Role must be a string",
      "any.only": "Role must be a valid user role",
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

export const editUserAdminBodySchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).optional().messages({
    "string.base": "Username must be a text.",
    "string.empty": "Username cannot be empty.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must not exceed 30 characters.",
  }),

  email: Joi.string().trim().lowercase().email().optional().messages({
    "string.base": "Email must be a text.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Please provide a valid email address.",
  }),

  role: Joi.string()
    .valid(...Object.values(UserRole))
    .optional()
    .messages({
      "any.only": "Role must be either 'user' or 'admin'.",
      "string.base": "Role must be a text.",
    }),

  password: Joi.string().min(6).optional().messages({
    "string.base": "Password must be a text.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 6 characters long.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });
