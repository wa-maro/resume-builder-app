import { BadRequestError } from "@shared/errors";
import { workExperiencesService } from "@work-experiences/services";
import type { Request, Response } from "express";

async function getWorkExperiences(req: Request, res: Response) {
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Work experiences retrieved successfully",
    data: await workExperiencesService.findAllByResume(resumeId),
  });
}

async function deleteWorkExperience(req: Request, res: Response) {
  const { resumeId, id } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  await workExperiencesService.deleteByResumeAndId(resumeId, id);

  return res.status(200).json({
    success: true,
    message: "Work experience deleted successfully",
    data: null,
  });
}

export const workExperiencesController = {
  getWorkExperiences,
  deleteWorkExperience,
};
