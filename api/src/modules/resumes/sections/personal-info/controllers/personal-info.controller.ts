import type { Request, Response } from "express";
import { BadRequestError } from "../../../../../shared/errors/http-errors.js";
import { addPersonalInfo } from "../personal-info.service.js";
import { AddPersonalInfoInput } from "../personal-info.types.js";

export const createPersonalInfo = async (req: Request, res: Response) => {
  const { resumeId } = req.params;
  const data: AddPersonalInfoInput = req.body;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information added successfully",
    data: await addPersonalInfo(resumeId, data),
  });
};
