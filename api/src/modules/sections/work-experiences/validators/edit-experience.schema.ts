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
import { isMonthYearAfter } from "@shared/utils";

const editCompanySchema = Joi.object({
  name: companyNameSchema.optional(),

  location: companyLocationSchema.optional(),
})
  .min(1)
  .optional();

export const editWorkExperienceSchema = Joi.object({
  position: positionSchema.optional(),

  company: editCompanySchema,

  responsibilities: responsibilitiesSchema.optional(),

  startDate: startDateSchema.optional(),

  endDate: endDateSchema.optional(),

  currentlyWorking: currentlyWorkingSchema.optional(),
})
  .min(1)
  .custom((obj, helpers) => {
    // currentlyWorking=true means endDate must not be provided
    if (obj.currentlyWorking === true && "endDate" in obj) {
      return helpers.error("workExperience.endDate.forbidden");
    }

    // Compare dates only when both are being updated
    if (obj.startDate && obj.endDate) {
      if (!isMonthYearAfter(obj.startDate, obj.endDate)) {
        return helpers.error("workExperience.date.order");
      }
    }

    return obj;
  })
  .messages({
    "object.min": "At least one field must be provided to update.",

    "workExperience.endDate.forbidden":
      "End date must not be provided when currently working.",

    "workExperience.date.order":
      "End date must be after or equal to the start date.",
  });
