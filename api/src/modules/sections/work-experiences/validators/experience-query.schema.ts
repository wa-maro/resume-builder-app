import { querySchema } from "@shared/validators";
import Joi from "joi";
import { currentlyWorkingSchema } from "./experience-fields.schema.js";

export const workExperienceQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy
    .valid(
      "createdAt",
      "updatedAt",
      "position",
      "company",
      "startDate",
      "endDate",
    )
    .messages({
      "any.only":
        "Sort must be one of createdAt, updatedAt, position, company, startDate, or endDate",
    }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,

  currentlyWorking: currentlyWorkingSchema,
});
