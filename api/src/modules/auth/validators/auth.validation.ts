import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@shared/validators";
import Joi from "joi";
import {
  confirmPasswordSchema,
  loginPasswordSchema,
  loginUsernameOrEmailSchema,
} from "./auth-fields.schema.js";

export const registerBodySchema = Joi.object({
  username: usernameSchema.required().messages({
    "any.required": "Username is required.",
  }),
  email: emailSchema.required().messages({
    "any.required": "Email is required.",
  }),
  password: passwordSchema.required().messages({
    "any.required": "Password is required.",
  }),
  confirmPassword: confirmPasswordSchema.required().messages({
    "any.required": "Confirm password is required.",
  }),
});

export const loginBodySchema = Joi.object({
  usernameOrEmail: loginUsernameOrEmailSchema,
  password: loginPasswordSchema,
});

export const editProfileBodySchema = Joi.object({
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  confirmPassword: confirmPasswordSchema.optional(),
})
  .with("password", "confirmPassword")
  .min(1)
  .messages({
    "object.with": "Confirm password is required when changing your password.",
    "object.min": "At least one field must be provided for update.",
  });
