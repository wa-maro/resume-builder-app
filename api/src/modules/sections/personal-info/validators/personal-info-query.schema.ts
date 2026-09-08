import { Disability, Gender, MaritalStatus } from "@personal-info/types";
import { querySchema } from "@shared/validators";
import Joi from "joi";

export const personalInfoQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy
    .valid(
      "createdAt",
      "updatedAt",
      "fullName",
      "dateOfBirth",
      "placeOfDomicile",
    )
    .messages({
      "any.only":
        "Sort must be one of createdAt, updatedAt, fullName, dateOfBirth, or placeOfDomicile",
    }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,

  gender: Joi.string()
    .valid(...Object.values(Gender))
    .messages({
      "string.base": "Gender must be a string",
      "any.only": "Gender must be either 'male' or 'female'",
    }),

  maritalStatus: Joi.string()
    .valid(...Object.values(MaritalStatus))
    .messages({
      "string.base": "Marital status must be a string",
      "any.only":
        "Marital status must be one of: single, married, divorced, or widowed",
    }),

  disabilities: Joi.array()
    .items(Joi.string().valid(...Object.values(Disability)))
    .unique()
    .messages({
      "array.base": "Disabilities must be a list of strings",
      "array.unique": "Disabilities must not contain duplicates",
      "any.only": "Invalid disability value",
    }),
});
