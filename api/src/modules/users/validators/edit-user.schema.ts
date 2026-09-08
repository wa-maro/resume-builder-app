import Joi from "joi";
import {
  passwordSchema,
  usernameSchema,
  userRoleSchema,
} from "./user-fields.schema.js";
import { emailSchema } from "@shared/validators";

export const editUserAdminBodySchema = Joi.object({
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  role: userRoleSchema.optional(),
  password: passwordSchema.optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });
