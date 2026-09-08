import { Disability } from "@personal-info/types";
import Joi from "joi";
import {
  disabilitiesSchema,
  genderSchema,
  maritalStatusSchema,
  nationalitySchema,
  phoneSchema,
  physicalAddressSchema,
  placeOfDomicileSchema,
} from "./personal-info-fields.schema.js";
import { dateSchema, emailSchema, nameSchema } from "@shared/validators";

export const addPersonalInfoBodySchema = Joi.object({
  fullName: nameSchema.required().messages({
    "any.required": "Full name is required.",
  }),

  gender: genderSchema.required().messages({
    "any.required": "Gender is required.",
  }),

  dateOfBirth: dateSchema.required().messages({
    "any.required": "Date of birth is required.",
  }),

  nationality: nationalitySchema.optional(),

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
