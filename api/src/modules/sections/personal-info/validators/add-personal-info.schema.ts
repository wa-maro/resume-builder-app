import { Disability } from "@personal-info/types";
import Joi from "joi";
import {
  dateOfBirthSchema,
  disabilitiesSchema,
  fullNameSchema,
  genderSchema,
  maritalStatusSchema,
  nationalitySchema,
  phoneSchema,
  physicalAddressSchema,
  placeOfDomicileSchema,
} from "./personal-info-fields.schema.js";
import { emailSchema } from "@shared/validators";

export const addPersonalInfoBodySchema = Joi.object({
  fullName: fullNameSchema.required().messages({
    "any.required": "Full name is required.",
  }),

  gender: genderSchema.required().messages({
    "any.required": "Gender is required.",
  }),

  dateOfBirth: dateOfBirthSchema.required().messages({
    "any.required": "Date of birth is required.",
  }),

  nationality: nationalitySchema.optional().trim().messages({
    "any.required": "Disability is required.",
  }),

  placeOfDomicile: placeOfDomicileSchema.optional(),

  maritalStatus: maritalStatusSchema.optional(),

  disabilities: disabilitiesSchema.default([Disability.NONE]),

  email: emailSchema.required().messages({
    "any.required": "Email is required.",
  }),

  phone: phoneSchema.required().messages({
    "any.required": "Phone is required.",
  }),

  physicalAddress: physicalAddressSchema.required().messages({
    "any.required": "Address is required.",
  }),
});
