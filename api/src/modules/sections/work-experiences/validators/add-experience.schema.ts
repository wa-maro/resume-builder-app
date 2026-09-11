import Joi from "joi";
import {
  companyLocationSchema,
  companyNameSchema,
  currentlyWorkingSchema,
  endDateSchema,
  positionSchema,
  responsibilitiesSchema,
  startDateSchema,
} from "./experience-fields.schema.js";
import { isMonthYearBeforeOrEqual } from "@shared/utils";

const addCompanySchema = Joi.object({
  name: companyNameSchema.required().messages({
    "any.required": "Company Name is required.",
  }),

  location: companyLocationSchema.required().messages({
    "any.required": "Location is required.",
  }),
}).required();

export const addWorkExperienceSchema = Joi.object({
  position: positionSchema.required().messages({
    "any.required": "Position is required.",
  }),

  company: addCompanySchema.required().messages({
    "any.required": "Company is required.",
  }),

  responsibilities: responsibilitiesSchema.required().messages({
    "any.required": "Responsibilities is required.",
  }),

  startDate: startDateSchema.required().messages({
    "any.required": "Start date is required.",
  }),

  endDate: endDateSchema,

  currentlyWorking: currentlyWorkingSchema,
})
  .custom((obj, helpers) => {
    // Currently working → endDate must not be present
    if (obj.currentlyWorking === true && "endDate" in obj) {
      return helpers.error("workExperience.endDate.forbidden");
    }

    // Not currently working → endDate is required
    if (obj.currentlyWorking !== true && !obj.endDate) {
      return helpers.error("workExperience.endDate.required");
    }

    // Compare dates when both are present
    if (obj.startDate && obj.endDate) {
      if (isMonthYearBeforeOrEqual(obj.startDate, obj.endDate)) {
        return helpers.error("workExperience.date.order");
      }
    }

    return obj;
  })
  .messages({
    "workExperience.endDate.forbidden":
      "End date must not be provided when currently working.",

    "workExperience.endDate.required":
      "End date is required when not currently working.",

    "workExperience.date.order":
      "Start date must be before or equal to end date.",
  });
