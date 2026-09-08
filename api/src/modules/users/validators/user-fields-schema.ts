import { UserRole } from "@users/types";
import Joi from "joi";

export const usernameSchema = Joi.string().trim().min(3).max(30).messages({
  "string.base": "Username must be a text.",
  "string.min": "Username must be at least 3 characters long.",
  "string.max": "Username must not exceed 30 characters.",
  "string.empty": "Username cannot be empty.",
});

export const emailSchema = Joi.string().trim().lowercase().email().messages({
  "string.base": "Email must be a text.",
  "string.email": "Please provide a valid email address.",
  "string.empty": "Email cannot be empty.",
});

export const userRoleSchema = Joi.string()
  .valid(...Object.values(UserRole))
  .messages({
    "any.only": "Role must be either 'user' or 'admin'.",
    "string.base": "Role must be a text.",
    "string.empty": "Role cannot be empty.",
  });

export const passwordSchema = Joi.string().min(6).messages({
  "string.base": "Password must be a text.",
  "string.empty": "Password is required.",
  "string.min": "Password must be at least 6 characters long.",
});
