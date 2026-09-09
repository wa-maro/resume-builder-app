import { UserRole } from "@users/types";
import Joi from "joi";

export const userRoleSchema = Joi.string()
  .valid(...Object.values(UserRole))
  .messages({
    "any.only": "Role must be either 'user' or 'admin'.",
    "string.base": "Role must be a text.",
    "string.empty": "Role cannot be empty.",
  });
