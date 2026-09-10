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

export const workExperiencesController = {
  getWorkExperiences,
};
