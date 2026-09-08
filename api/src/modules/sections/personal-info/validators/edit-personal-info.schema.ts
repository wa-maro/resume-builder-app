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

export const editPersonalInfoBodySchema = Joi.object({
  fullName: nameSchema.optional(),
  gender: genderSchema.optional(),
  dateOfBirth: dateSchema.optional(),
  nationality: nationalitySchema.optional(),
  placeOfDomicile: placeOfDomicileSchema.optional(),
  maritalStatus: maritalStatusSchema.optional(),
  disabilities: disabilitiesSchema.optional(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  physicalAddress: physicalAddressSchema.optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });
