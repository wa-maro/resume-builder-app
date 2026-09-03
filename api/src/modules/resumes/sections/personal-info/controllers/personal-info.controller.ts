import type { Request, Response } from "express";
import { BadRequestError } from "../../../../../shared/errors/http-errors.js";
import {
  addPersonalInfo,
  getPersonalInfobyResume,
} from "../personal-info.service.js";
import { AddPersonalInfoInput } from "../personal-info.types.js";

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
  const { resumeId, id } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: await getPersonalInfobyResume(resumeId, id),
  });
}
