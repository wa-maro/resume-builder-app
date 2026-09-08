import Joi from "joi";

export const messageSchema = Joi.string().trim().min(1).max(5000).messages({
  "string.base": "Message must be a string",
  "string.empty": "Message cannot be empty",
  "string.min": "Message cannot be empty",
  "string.max": "Message cannot exceed 5000 characters",
});
