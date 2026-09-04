import path from "node:path";
import type { Request, Response } from "express";
import {
  createResume,
  editResumeForUser,
  findResumeByUserId,
  findResumeAvatarForUser,
  removeResumeForUser,
  changeResumeAvatarForUser,
} from "../resume.service.js";
import { BadRequestError } from "../../../shared/errors/http-errors.js";
import { CreateResumeDto, UpdateResumeDto } from "../resume.types.js";
import { UploadFolder, uploadsDir } from "../../../shared/utils/upload.util.js";

export async function createMyResume(req: Request, res: Response) {
  const { id } = req.user;
  const data: CreateResumeDto = req.body;

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

export async function editMyResume(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;
  const data: UpdateResumeDto = req.body;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    data: await editResumeForUser(userId, resumeId, data),
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

export async function getMyResumeAvatar(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  const avatar = await findResumeAvatarForUser(userId, resumeId);

  const filePath = path.join(uploadsDir, UploadFolder.RESUMES, avatar);

  return res.sendFile(filePath);
}

export async function changeMyResumeAvatar(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  const resume = await changeResumeAvatarForUser(
    userId,
    resumeId,
    req.file!.filename,
  );

  return res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    data: resume,
  });
}
