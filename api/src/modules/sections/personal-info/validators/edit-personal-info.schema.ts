import Joi from "joi";
import {
  disabilitiesSchema,
  genderSchema,
  phoneSchema,
  physicalAddressSchema,
} from "./personal-info-fields.schema.js";
import { emailSchema, nameSchema } from "@shared/validators";

export const editPersonalInfoBodySchema = Joi.object({
  fullName: nameSchema.optional(),
  gender: genderSchema.optional(),
  dateOfBirth: Joi.date().optional(),
  nationality: Joi.string().optional(),
  placeOfDomicile: Joi.string().optional(),
  maritalStatus: Joi.string().optional(),
  disabilities: disabilitiesSchema.optional(),
  email: emailSchema.email().optional(),
  phone: phoneSchema.optional(),
  physicalAddress: physicalAddressSchema.optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });
