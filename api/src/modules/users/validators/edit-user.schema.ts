import Joi from "joi";
import { userRoleSchema } from "./user-fields.schema.js";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@shared/validators";

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
