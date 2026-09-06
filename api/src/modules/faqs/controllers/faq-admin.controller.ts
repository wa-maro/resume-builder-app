import type { Request, Response } from "express";
import { CreateFAQInput, FAQQueryDto, FAQSortField } from "@faqs/types";
import { createForAdmin } from "../faq.repository.js";
import { SortOrderDto } from "@shared/types";
import { findFAQs } from "@faqs/services";

export async function createFAQAdmin(req: Request, res: Response) {
  const data: CreateFAQInput = req.body;

  return res.status(201).json({
    success: true,
    message: "Personal information added successfully",
    data: await createForAdmin(data),
  });
}

export async function getFAQsAdmin(req: Request, res: Response) {
  const { page, limit, sort, sortOrder, search, isActive } = req.query;

  const query: FAQQueryDto = {
    filter: {},
  };

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as FAQSortField;

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) query.filter!.search = search as string;

  if (isActive) query.filter!.isActive = isActive === "true";

  return res.status(200).json({
    success: true,
    message: "FAQs retrieved successfully",
    ...(await findFAQs(query)),
  });
}
