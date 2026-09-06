import Joi from "joi";

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
