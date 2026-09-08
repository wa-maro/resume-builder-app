import { Disability, Gender, MaritalStatus } from "@personal-info/types";
import Joi from "joi";

export const fullNameSchema = Joi.string().trim().messages({
  "string.base": "Full name must be a text.",
  "string.empty": "Full name cannot be empty.",
});

export const genderSchema = Joi.string()
  .valid(...Object.values(Gender))
  .messages({
    "any.only": "Gender must be either 'male' or 'female'.",
    "string.base": "Gender must be a text.",
    "string.empty": "Gender cannot be empty.",
  });

export const dateOfBirthSchema = Joi.date().messages({
  "date.base": "Date of birth must be a valid date.",
  "string.empty": "Date of birth cannot be empty.",
});

export const nationalitySchema = Joi.string().trim().messages({
  "string.base": "Nationality must be a text.",
  "string.empty": "Nationality cannot be empty.",
});

export const placeOfDomicileSchema = Joi.string().trim().messages({
  "string.base": "Place of domicile must be a text.",
  "string.empty": "Place of domicile cannot be empty.",
});

export const maritalStatusSchema = Joi.string()
  .valid(...Object.values(MaritalStatus))
  .trim()
  .messages({
    "string.base": "Marital status must be a text.",
    "string.empty": "Marital status cannot be empty.",
    "any.only":
      "Marital status must be one of: single, married, divorced, widowed.",
  });

export const disabilitiesSchema = Joi.array()
  .items(Joi.string().valid(...Object.values(Disability)))
  .single()
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
    "array.unique": "Disabilities must not contain duplicates.",
  });

export const phoneSchema = Joi.string()
  .trim()
  .pattern(/^\+?[0-9]{7,15}$/)
  .messages({
    "string.base": "Phone must be a text.",
    "string.empty": "Phone cannot be empty.",
    "string.pattern.base":
      "Phone number must be valid (7-15 digits, optional + at start).",
  });

export const physicalAddressSchema = Joi.string().trim().messages({
  "string.base": "Address must be a text.",
  "string.empty": "Address cannot be empty.",
});
