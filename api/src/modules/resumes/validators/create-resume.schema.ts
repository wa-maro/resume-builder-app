import Joi from "joi";
import {
  declarationSchema,
  summarySchema,
  titleSchema,
} from "./resume-fields.schema.js";

export const createResumeBodySchema = Joi.object({
  title: titleSchema.required().messages({
    "any.required": "Title is required.",
  }),
  summary: summarySchema,
  declaration: declarationSchema,
});
