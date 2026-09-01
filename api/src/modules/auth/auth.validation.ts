import Joi from "joi";

export const registerBodySchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "Username must be a text.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must not exceed 30 characters.",
    "any.required": "Username is required.",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "Email must be a text.",
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a text.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "string.empty": "Confirm password is required.",
    "any.required": "Confirm password is required.",
  }),
});

export const loginBodySchema = Joi.object({
  usernameOrEmail: Joi.string().trim().required().messages({
    "string.base": "Username or email must be a text.",
    "string.empty": "Username or email is required.",
    "any.required": "Username or email is required.",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a text.",
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  }),
});

export const editProfileBodySchema = Joi.object({
  newUsername: Joi.string().trim().min(3).max(30).messages({
    "string.base": "newUsername must be a text.",
    "string.min": "newUsername must be at least 3 characters long.",
    "string.max": "newUsername must not exceed 30 characters.",
  }),

  newEmail: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
    .messages({
      "string.base": "newEmail must be a text.",
      "any.required": "newEmail is required.",
    }),

  newPassword: Joi.string().min(6).messages({
    "string.base": "newPassword must be a text.",
    "string.min": "Password must be at least 8 characters long.",
  }),

  confirmNewPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
      "string.empty": "Confirm password is required.",
      "any.required": "Confirm password is required.",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
