import Joi from "joi";
import { Disability, Gender, MaritalStatus } from "@personal-info/types";

export const personalInfoQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),

  limit: Joi.number().integer().min(1).max(100).messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),

  sort: Joi.string()
    .valid(
      "createdAt",
      "updatedAt",
      "fullName",
      "dateOfBirth",
      "placeOfDomicile",
    )
    .messages({
      "string.base": "Sort must be a string",
      "any.only":
        "Sort must be one of createdAt, updatedAt, fullName, dateOfBirth, or placeOfDomicile",
    }),

  sortOrder: Joi.string().valid("asc", "desc").messages({
    "string.base": "Sort order must be a string",
    "any.only": "Sort order must be either asc or desc",
  }),

  search: Joi.string().trim().min(1).messages({
    "string.base": "Search must be a string",
    "string.empty": "Search cannot be empty",
    "string.min": "Search must contain at least 1 character",
  }),

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

export const addPersonalInfoBodySchema = Joi.object({
  fullName: Joi.string().required().trim().messages({
    "string.base": "Full name must be a text.",
    "string.empty": "Full name is required.",
  }),

  gender: Joi.string()
    .valid(...Object.values(Gender))
    .required()
    .messages({
      "any.only": "Gender must be either 'male' or 'female'.",
      "string.base": "Gender must be a text.",
      "string.empty": "Gender is required.",
    }),

  dateOfBirth: Joi.date().required().messages({
    "date.base": "Date must be a valid date.",
  }),

  nationality: Joi.string().optional().trim().messages({
    "string.base": "Nationality must be a text.",
  }),

  placeOfDomicile: Joi.string().optional().trim().messages({
    "string.base": "Place of Domicile must be a text.",
  }),

  maritalStatus: Joi.string()
    .valid(...Object.values(MaritalStatus))
    .optional()
    .trim()
    .messages({
      "string.base": "Marital status must be a text.",
      "any.only":
        "Marital status must be one of: single, married, divorced, widowed.",
    }),

  disabilities: Joi.array()
    .items(Joi.string().valid(...Object.values(Disability)))
    .single()
    .unique()
    .default([Disability.NONE])
    .custom((value: Disability[], helpers) => {
      if (value.includes(Disability.NONE) && value.length > 1) {
        return helpers.error("any.invalid");
      }

      return value;
    })
    .messages({
      "any.invalid":
        "If 'none' is selected, no other disabilities can be selected.",
      "array.base": "Disabilities must be a list of strings.",
      "array.unique": "Disabilities must not contain duplicates.",
    }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "Email must be a text.",
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),

  phone: Joi.string()
    .required()
    .trim()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.base": "Phone must be a text.",
      "string.empty": "Phone is required.",
      "string.pattern.base":
        "Phone number must be valid (7-15 digits, optional + at start).",
    }),

  physicalAddress: Joi.string().required().trim().messages({
    "string.base": "Address must be a text.",
    "string.empty": "Address is required.",
  }),
});

export const editPersonalInfoBodySchema = Joi.object({
  fullName: Joi.string().optional().trim().messages({
    "string.base": "Full name must be a text.",
  }),

  gender: Joi.string()
    .valid(...Object.values(Gender))
    .optional()
    .messages({
      "string.base": "Gender must be a text.",
      "any.only": "Gender must be either 'male' or 'female'.",
    }),

  dateOfBirth: Joi.date().optional().messages({
    "date.base": "Date must be a valid date.",
  }),

  nationality: Joi.string().optional().trim().messages({
    "string.base": "Nationality must be a text.",
  }),

  placeOfDomicile: Joi.string().optional().trim().messages({
    "string.base": "Place of Domicile must be a text.",
  }),

  maritalStatus: Joi.string()
    .valid(...Object.values(MaritalStatus))
    .optional()
    .trim()
    .messages({
      "string.base": "Marital status must be a text.",
      "any.only":
        "Marital status must be one of: single, married, divorced, widowed.",
      "array.unique": "Disabilities must not contain duplicates.",
    }),

  disabilities: Joi.array()
    .items(Joi.string().valid(...Object.values(Disability)))
    .unique()
    .custom((value: Disability[], helpers) => {
      if (value.includes(Disability.NONE) && value.length > 1) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid":
        "If 'none' is selected, no other disabilities can be selected.",
      "array.base": "Disabilities must be a list of strings.",
    }),

  email: Joi.string().trim().lowercase().email().optional().messages({
    "string.base": "Email must be a text.",
    "string.email": "Please provide a valid email address.",
  }),

  phone: Joi.string()
    .optional()
    .trim()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.base": "Phone must be a text.",
      "string.pattern.base":
        "Phone number must be valid (7-15 digits, optional + at start).",
    }),

  physicalAddress: Joi.string().optional().trim().messages({
    "string.base": "Address must be a text.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });
