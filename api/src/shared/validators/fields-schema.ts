import Joi from "joi";

export const emailSchema = Joi.string().trim().lowercase().email().messages({
  "string.base": "Email must be a text.",
  "string.email": "Please provide a valid email address.",
  "string.empty": "Email cannot be empty.",
});
