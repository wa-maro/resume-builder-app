import Joi from "joi";
import {
  passwordSchema,
  usernameSchema,
  userRoleSchema,
} from "./user-fields.schema.js";
import { emailSchema } from "@shared/validators";

export const createUserAdminBodySchema = Joi.object({
  username: usernameSchema.required().messages({
    "any.required": "Username is required.",
  }),
  email: emailSchema.required().messages({
    "any.required": "Email is required.",
  }),
  role: userRoleSchema.required().messages({
    "any.required": "Role is required.",
  }),
  password: passwordSchema.required().messages({
    "any.required": "Password is required.",
  }),
});
