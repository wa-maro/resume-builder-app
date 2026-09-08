import Joi from "joi";
import { messageSchema } from "./message-fields.schema.js";
import { emailSchema, nameSchema } from "@shared/validators";

export const createMessageSchema = Joi.object({
  name: nameSchema.required().messages({
    "any.required": "Name is required",
  }),

  email: emailSchema.required().messages({
    "any.required": "Email is required",
  }),

  message: messageSchema.required().messages({
    "any.required": "Message is required",
  }),
});

export const replyMessageSchema = Joi.object({
  reply: messageSchema.required().messages({
    "any.required": "Message is required",
  }),
});
