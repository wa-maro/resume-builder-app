import { MONTH_YEAR_REGEX } from "@shared/utils";
import Joi from "joi";

export const positionSchema = Joi.string().trim().messages({
  "string.base": "Position must be a text.",
  "string.empty": "Position cannot be empty.",
});

export const responsibilitiesSchema = Joi.string()
  .trim()
  .min(80)
  .max(500)
  .messages({
    "string.base": "Responsibilities must be a text.",
    "string.empty": "Responsibilities cannot be empty.",
    "string.min": "Responsibilities must be at least 80 characters long.",
    "string.max": "Responsibilities must not exceed 500 characters.",
  });

export const currentlyWorkingSchema = Joi.boolean().messages({
  "boolean.base": "currentlyWorking must be a boolean.",
});

export const companyNameSchema = Joi.string().trim().min(2).max(255).messages({
  "string.base": "Company name must be a text.",
  "string.empty": "Company name cannot be empty.",
  "string.min": "Company name must be at least 2 characters long.",
  "string.max": "Company name must be no longer than 255 characters.",
});

export const companyLocationSchema = Joi.string()
  .trim()
  .min(2)
  .max(255)
  .messages({
    "string.base": "Company location must be a text.",
    "string.empty": "Company location cannot be empty.",
    "string.min": "Company location must be at least 2 characters long.",
    "string.max": "Company location must be no longer than 255 characters.",
  });

export const startDateSchema = Joi.string()
  .trim()
  .pattern(MONTH_YEAR_REGEX)
  .messages({
    "string.base": "Start date must be a text.",
    "string.empty": "Start date cannot be empty.",
    "string.pattern.base":
      "Start date must be in MMM YYYY format (e.g., Jan 2024).",
  });

export const endDateSchema = Joi.string()
  .trim()
  .pattern(MONTH_YEAR_REGEX)
  .messages({
    "string.base": "End date must be a text.",
    "string.empty": "End date cannot be empty.",
    "string.pattern.base":
      "End date must be in MMM YYYY format (e.g., Jan 2024).",
  });
