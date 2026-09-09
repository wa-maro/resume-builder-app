import Joi from "joi";

export const confirmPasswordSchema = Joi.string()
  .valid(Joi.ref("password"))
  .messages({
    "string.base": "Confirm password must be a text.",
    "string.empty": "Confirm password cannot be empty",
    "any.only": "Passwords do not match.",
  });

export const loginPasswordSchema = Joi.string().required().messages({
  "string.base": "Password must be a text.",
  "string.empty": "Password is required.",
  "any.required": "Password is required.",
});

export const loginUsernameOrEmailSchema = Joi.string()
  .trim()
  .required()
  .messages({
    "string.base": "Username or email must be a text.",
    "string.empty": "Username or email is required.",
    "any.required": "Username or email is required.",
  });
