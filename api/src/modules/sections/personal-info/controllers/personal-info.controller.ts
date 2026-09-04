import type { Request, Response } from "express";
import { BadRequestError } from "@shared/errors";
import {
  addPersonalInfo,
  editPersonalInfoByResume,
  getPersonalInfobyResume,
} from "../personal-info.service.js";
import {
  AddPersonalInfoInput,
  EditPersonalInfoInput,
} from "../personal-info.types.js";

export async function createPersonalInfo(req: Request, res: Response) {
  const { resumeId } = req.params;
  const data: AddPersonalInfoInput = req.body;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(201).json({
    success: true,
    message: "Personal information added successfully",
    data: await addPersonalInfo(resumeId, data),
  });
}

export async function getPersonalInfo(req: Request, res: Response) {
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: await getPersonalInfobyResume(resumeId),
  });
}

export async function updatePersonalInfo(req: Request, res: Response) {
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
    data: await editPersonalInfoByResume(resumeId, id, data),
  });
}
