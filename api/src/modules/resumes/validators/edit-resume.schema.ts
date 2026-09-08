import Joi from "joi";
import {
  declarationSchema,
  summarySchema,
  titleSchema,
} from "./resume-fields.schema.js";

export const editResumeBodySchema = Joi.object({
  title: titleSchema.optional(),
  summary: summarySchema,
  declaration: declarationSchema,
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });
