import { Request, Response } from "express";
import { BadRequestError } from "../../../../../shared/errors/http-errors.js";
import {
  getPersonalInfoForAdmin,
  removePersonalInfo,
} from "../personal-info.service.js";

export async function getPersonalInfo(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: await getPersonalInfoForAdmin(id),
  });
}

export async function deletePersonalInfo(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  await removePersonalInfo(id);

  return res.status(200).json({
    success: true,
    message: "Personal information delete successfully",
    data: null,
  });
}
