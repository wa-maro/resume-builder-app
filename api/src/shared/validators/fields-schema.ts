import Joi from "joi";

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
