import { dateSchema } from "@shared/validators";
import Joi from "joi";

const statementSchema = Joi.string().trim().messages({
  "string.base": "Statement must be a text.",
  "string.empty": "Title cannot be empty.",
});

const signatureSchema = Joi.string().trim().messages({
  "string.base": "Signature must be a text.",
  "string.empty": "Signature cannot be empty.",
});

export const titleSchema = Joi.string().trim().messages({
  "string.base": "Title must be a text.",
  "string.empty": "Title cannot be empty.",
});

export const summarySchema = Joi.string().trim().optional().allow("").messages({
  "string.base": "Summary must be a text.",
});

export const declarationSchema = Joi.object({
  statement: statementSchema.optional(),
  signature: signatureSchema.optional(),
  date: dateSchema.optional(),
})
  .min(1)
  .optional();
