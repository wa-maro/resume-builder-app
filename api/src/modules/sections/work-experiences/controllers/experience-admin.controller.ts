import { BadRequestError } from "@shared/errors";
import { SortOrderDto } from "@shared/types";
import { workExperiencesAdminService } from "@work-experiences/services";
import {
  EditWorkExperienceInput,
  WorkExperienceQueryDto,
  WorkExperienceSortField,
} from "@work-experiences/types";
import type { Request, Response } from "express";

async function getWorkExperiences(req: Request, res: Response) {
  const { page, limit, sort, sortOrder, search, currentlyWorking } = req.query;

  const query: WorkExperienceQueryDto = {
    filter: {},
  };

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as WorkExperienceSortField;

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) query.filter!.search = search as string;

  if (currentlyWorking)
    query.filter!.currentlyWorking = currentlyWorking === "true";

  return res.status(200).json({
    success: true,
    message: "Work experiences retrieved successfully.",
    ...(await workExperiencesAdminService.findAll(query)),
  });
}

async function getWorkExperience(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Work experience retrieved successfully.",
    data: await workExperiencesAdminService.findById(id),
  });
}

async function updateWorkExperience(req: Request, res: Response) {
  const { id } = req.params;
  const data: EditWorkExperienceInput = req.body;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Work experience updated successfully.",
    data: await workExperiencesAdminService.updateById(id, data),
  });
}

async function deleteWorkExperience(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  await workExperiencesAdminService.deleteById(id);

  return res.status(200).json({
    success: true,
    message: "Work experience deleted successfully.",
    data: null,
  });
}

export const workExperiencesAdminController = {
  getWorkExperiences,
  getWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
};
