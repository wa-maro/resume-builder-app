import Joi from "joi";
import {
  answerSchema,
  orderSchema,
  questionSchema,
} from "./faq-fields.schema.js";

export const editFAQSchema = Joi.object({
  question: questionSchema.optional(),
  answer: answerSchema.optional(),
  order: orderSchema.optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
