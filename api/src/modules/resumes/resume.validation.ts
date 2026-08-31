import Joi from "joi";

export const ResumesQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),

  limit: Joi.number().integer().min(1).max(100).messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),

  sort: Joi.string().valid("createdAt", "updatedAt", "title").messages({
    "string.base": "Sort must be a string",
    "any.only": "Sort must be one of createdAt, updatedAt, or title",
  }),

  sortOrder: Joi.string().valid("asc", "desc").messages({
    "string.base": "Sort order must be a string",
    "any.only": "Sort order must be either asc or desc",
  }),

  search: Joi.string().trim().min(1).messages({
    "string.base": "Search must be a string",
    "string.empty": "Search cannot be empty",
    "string.min": "Search must contain at least 1 character",
  }),

  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be a boolean",
  }),
});

export const createResumeBodySchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "Title must be a text.",
    "string.empty": "Title is required.",
  }),

  summary: Joi.string().trim().required().allow("").messages({
    "string.base": "Summary must be a text.",
    "string.empty": "Summary is required.",
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

    signature: Joi.string().trim().optional().messages({
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
