import { querySchema } from "@shared/validators";
import { UserRole } from "@users/types";
import Joi from "joi";

export const userQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy
    .valid("createdAt", "updatedAt", "username")
    .messages({
      "any.only": "Sort must be one of createdAt, updatedAt, or username",
    }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,
  isActive: querySchema.isActive,

  role: Joi.string()
    .valid(...Object.values(UserRole))
    .messages({
      "string.base": "Role must be a string",
      "any.only": "Role must be a valid user role",
    }),
});
