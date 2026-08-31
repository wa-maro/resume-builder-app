import type { Request, Response } from "express";
import { createResume, findResumeByUserId } from "../resume.service.js";

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
