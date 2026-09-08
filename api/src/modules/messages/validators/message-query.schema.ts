import { querySchema } from "@shared/validators";
import Joi from "joi";

export const messageQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy.valid("createdAt", "updatedAt", "name").messages({
    "any.only": "Sort must be one of createdAt, updatedAt, or name",
  }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,
  isActive: querySchema.isActive,

  isReplied: Joi.boolean().messages({
    "boolean.base": "isReplied must be a boolean",
  }),
});
