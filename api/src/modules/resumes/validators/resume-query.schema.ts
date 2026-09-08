import { querySchema } from "@shared/validators";
import Joi from "joi";

export const resumeQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy.valid("createdAt", "updatedAt", "title").messages({
    "any.only": "Sort must be one of createdAt, updatedAt, or title",
  }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,
  isActive: querySchema.isActive,
});
