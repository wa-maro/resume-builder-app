import type { Request, Response } from "express";
import { SortOrderDto } from "@shared/types";
import { BadRequestError } from "@shared/errors";
import {
  ResumeQueryDto,
  ResumeSortField,
  UpdateResumeDto,
} from "@resumes/types";
import { resumeAdminService } from "@resumes/services";

async function getResumes(req: Request, res: Response) {
  const { page, limit, sort, sortOrder, search, isActive } = req.query;

  const query: ResumeQueryDto = {
    filter: {},
  };

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as ResumeSortField;

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) query.filter!.search = search as string;

  if (isActive) query.filter!.isActive = isActive === "true";

  return res.status(200).json({
    success: true,
    message: "Resumes retrieved successfully",
    ...(await resumeAdminService.findResumes(query)),
  });
}

async function getResume(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    data: await resumeAdminService.findResumeById(id),
  });
}

async function editResume(req: Request, res: Response) {
  const { id } = req.params;
  const data: UpdateResumeDto = req.body;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Resume updated successfully",
    data: await resumeAdminService.editResumeById(id, data),
  });
}

async function deleteResume(req: Request, res: Response) {
  const { id: resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  await resumeAdminService.removeResumeById(resumeId);

  return res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
    data: null,
  });
}

async function toggleResumeStatus(req: Request, res: Response) {
  const { id: resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  const resume = await resumeAdminService.toggleResumeStatusById(resumeId);

  const status = resume.isActive ? "activated" : "deactivated";

  return res.status(200).json({
    success: true,
    message: `Resume ${status} successfully`,
    data: resume,
  });
}

export const resumeAdminController = {
  getResumes,
  getResume,
  editResume,
  deleteResume,
  toggleResumeStatus,
};
