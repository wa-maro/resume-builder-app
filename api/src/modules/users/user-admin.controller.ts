import type { Request, Response } from "express";
import { findUsers } from "./user.service.js";
import { SortOrderDto } from "../../shared/types/query-options.js";
import { UserFilter, UserQueryDto, UserRole } from "./user.types.js";

export async function getUsers(req: Request, res: Response) {
  const { page, limit, sort, sortOrder, search, role, isActive } = req.query;

  const query: UserQueryDto = {};
  const filter: UserFilter = {};

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as "createdAt" | "updatedAt" | "username";

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) filter.search = search as string;

  if (role) filter.role = role as UserRole;

  if (isActive) filter.isActive = isActive === "true";

  query.filter = filter;

  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    ...(await findUsers(query)),
  });
}
