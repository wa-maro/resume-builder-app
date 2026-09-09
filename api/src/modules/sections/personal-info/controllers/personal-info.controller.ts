import type { Request, Response } from "express";
import { BadRequestError } from "@shared/errors";
import { personalInfoService } from "@personal-info/services";
import {
  AddPersonalInfoInput,
  EditPersonalInfoInput,
} from "@personal-info/types";

async function createPersonalInfo(req: Request, res: Response) {
  const { resumeId } = req.params;
  const data: AddPersonalInfoInput = req.body;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(201).json({
    success: true,
    message: "Personal information added successfully",
    data: await personalInfoService.addPersonalInfo(resumeId, data),
  });
}

async function getPersonalInfo(req: Request, res: Response) {
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: await personalInfoService.findPersonalInfoByResumeId(resumeId),
  });
}

async function updatePersonalInfo(req: Request, res: Response) {
  const { resumeId, id } = req.params;
  const data: EditPersonalInfoInput = req.body;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information updated successfully",
    data: await personalInfoService.editPersonalInfoByResumeId(
      resumeId,
      id,
      data,
    ),
  });
}

export const personalInfoController = {
  createPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
};
