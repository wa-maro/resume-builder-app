import Joi from "joi";
import {
  answerSchema,
  orderSchema,
  questionSchema,
} from "./faq-fields.schema.js";

export const addFAQSchema = Joi.object({
  question: questionSchema.required().messages({
    "any.required": "Question is required",
  }),

  answer: answerSchema.required().messages({
    "any.required": "Answer is required",
  }),

  order: orderSchema.optional(),
});
