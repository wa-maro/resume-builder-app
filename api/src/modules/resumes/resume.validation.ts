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

export const createResumeBodySchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "Title must be a text.",
    "string.empty": "Title is required.",
  }),

  summary: Joi.string().trim().optional().allow("").messages({
    "string.base": "Summary must be a text.",
  }),

  declaration: Joi.object({
    statement: Joi.string().trim().optional().messages({
      "string.base": "Statement must be a text.",
    }),

    signature: Joi.string().trim().optional().messages({
      "string.base": "Signature must be a text.",
    }),

    date: Joi.date().optional().messages({
      "date.base": "Date must be a valid date.",
    }),
  })
    .min(1)
    .optional(),
});

export const editResumeBodySchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    "string.base": "Title must be a text.",
  }),

  summary: Joi.string().trim().optional().allow("").messages({
    "string.base": "Summary must be a text.",
  }),

  declaration: Joi.object({
    statement: Joi.string().trim().optional().messages({
      "string.base": "Statement must be a text.",
    }),

    signature: Joi.string().trim().optional().allow("").messages({
      "string.base": "Signature must be a text.",
    }),

    date: Joi.date().optional().messages({
      "date.base": "Date must be a valid date.",
    }),
  })
    .min(1)
    .optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });
