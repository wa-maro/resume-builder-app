import Joi from "joi";

export const usernameSchema = Joi.string().trim().min(3).max(30).messages({
  "string.base": "Username must be a text.",
  "string.min": "Username must be at least 3 characters long.",
  "string.max": "Username must not exceed 30 characters.",
  "string.empty": "Username cannot be empty.",
});

export const passwordSchema = Joi.string().min(6).messages({
  "string.base": "Password must be a text.",
  "string.empty": "Password cannot be empty",
  "string.min": "Password must be at least 6 characters long.",
});

export const emailSchema = Joi.string().trim().lowercase().email().messages({
  "string.base": "Email must be a text.",
  "string.email": "Please provide a valid email address.",
  "string.empty": "Email cannot be empty.",
});

export const nameSchema = Joi.string().trim().min(2).max(100).messages({
  "string.base": "Name must be a text.",
  "string.empty": "Name cannot be empty.",
  "string.min": "Name must be at least 2 characters long",
  "string.max": "Name cannot exceed 100 characters",
});

export const dateSchema = Joi.date().messages({
  "date.base": "Date must be a valid date.",
  "string.empty": "Date cannot be empty.",
});
