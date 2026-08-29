import Joi from "joi";
import { UserRole } from "./user.types.js";

export const UserQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  sort: Joi.string().valid("createdAt", "updatedAt", "username"),
  sortOrder: Joi.string().valid("asc", "desc"),
  search: Joi.string().trim().min(1),
  role: Joi.string().valid(...Object.values(UserRole)),
  isActive: Joi.boolean(),
});
