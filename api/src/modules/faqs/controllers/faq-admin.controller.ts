import type { Request, Response } from "express";
import {
  CreateFAQInput,
  FAQQueryDto,
  FAQSortField,
  UpdateFAQInput,
} from "@faqs/types";
import { SortOrderDto } from "@shared/types";
import { faqAdminService } from "@faqs/services";
import { BadRequestError } from "@shared/errors";

async function createFAQ(req: Request, res: Response) {
  const data: CreateFAQInput = req.body;

  return res.status(201).json({
    success: true,
    message: "FAQ created successfully",
    data: await faqAdminService.createFAQForAdmin(data),
  });
}

async function getFAQs(req: Request, res: Response) {
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
    ...(await faqAdminService.findFAQs(query)),
  });
}

async function getFAQ(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "FAQ retrieved successfully",
    data: await faqAdminService.findFAQById(id),
  });
}

async function updateFAQ(req: Request, res: Response) {
  const { id } = req.params;
  const data: UpdateFAQInput = req.body;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "FAQ updated successfully",
    data: await faqAdminService.updateFAQById(id, data),
  });
}

async function deleteFAQ(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "FAQ deleted successfully",
    data: await faqAdminService.removeFAQById(id),
  });
}

async function toggleFAQStatus(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  const faq = await faqAdminService.toggleFAQStatusById(id);

  const status = faq.isActive ? "activated" : "deactivated";

  return res.status(200).json({
    success: true,
    message: `FAQ ${status} successfully`,
    data: faq,
  });
}

export const faqAdminController = {
  createFAQ,
  getFAQs,
  getFAQ,
  updateFAQ,
  deleteFAQ,
  toggleFAQStatus,
};
