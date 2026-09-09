import path from "node:path";
import type { Request, Response } from "express";
import { BadRequestError } from "@shared/errors";
import { UploadFolder, uploadsDir } from "@shared/utils";
import { resumeService } from "@resumes/services";
import { CreateResumeDto, UpdateResumeDto } from "@resumes/types";

async function createMyResume(req: Request, res: Response) {
  const { id } = req.user;
  const data: CreateResumeDto = req.body;

  return res.status(201).json({
    success: true,
    message: "Resume created successfully",
    data: await resumeService.createResume(id, data),
  });
}

async function getMyResume(req: Request, res: Response) {
  const { id } = req.user;

  return res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    data: await resumeService.findResumeByUserId(id),
  });
}

async function editMyResume(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;
  const data: UpdateResumeDto = req.body;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    data: await resumeService.editResumeByUserId(userId, resumeId, data),
  });
}

async function deleteMyResume(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  await resumeService.removeResumeByUserId(userId, resumeId);

  return res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
    data: null,
  });
}

async function getMyResumeAvatar(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  const avatar = await resumeService.findResumeAvatarByUserId(userId, resumeId);

  const filePath = path.join(uploadsDir, UploadFolder.RESUMES, avatar);

  return res.sendFile(filePath);
}

async function changeMyResumeAvatar(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new BadRequestError();
  }

  const resume = await resumeService.changeResumeAvatarByUserId(
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

export const resumeController = {
  changeMyResumeAvatar,
  createMyResume,
  deleteMyResume,
  editMyResume,
  getMyResume,
  getMyResumeAvatar,
};
