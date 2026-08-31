import type { Request, Response } from "express";
import {
  createResume,
  findResumeByUserId,
  removeResumeForUser,
} from "../resume.service.js";
import { BadRequestError } from "../../../shared/errors/http-errors.js";

export async function createMyResume(req: Request, res: Response) {
  const { id } = req.user;
  const data = req.body;

  return res.status(201).json({
    success: true,
    message: "Resume created successfully",
    data: await createResume(id, data),
  });
}

export async function getMyResume(req: Request, res: Response) {
  const { id } = req.user;

  return res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    data: await findResumeByUserId(id),
  });
}

export async function deleteMyResume(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  await removeResumeForUser(userId, resumeId);

  return res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
    data: null,
  });
}
