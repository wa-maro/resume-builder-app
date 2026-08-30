import type { Request, Response } from "express";
import { ResumeFilter, ResumeQueryDto } from "../resume.types.js";
import { SortOrderDto } from "../../../shared/types/query-options.js";
import { findResumes } from "../resume.service.js";

export async function getResumes(req: Request, res: Response) {
  const { page, limit, sort, sortOrder, search, isActive } = req.query;

  const query: ResumeQueryDto = {};
  const filter: ResumeFilter = {};

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as "createdAt" | "updatedAt" | "title";

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) filter.search = search as string;

  if (isActive) filter.isActive = isActive === "true";

  query.filter = filter;

  return res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    ...(await findResumes(query)),
  });
}
