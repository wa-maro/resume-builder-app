import { querySchema } from "@shared/validators";
import Joi from "joi";

export const faqQuerySchema = Joi.object({
  page: querySchema.page,
  limit: querySchema.limit,
  sort: querySchema.sortBy
    .valid("createdAt", "updatedAt", "question", "order")
    .messages({
      "any.only":
        "Sort must be one of createdAt, updatedAt, question, or order",
    }),
  sortOrder: querySchema.sortOrder,
  search: querySchema.search,
  isActive: querySchema.isActive,
});
