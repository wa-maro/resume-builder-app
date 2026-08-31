import type { Request, Response } from "express";
import { createResume } from "../resume.service.js";

export async function createMyResume(req: Request, res: Response) {
  const { id } = req.user;
  const data = req.body;

  return res.status(201).json({
    success: true,
    message: "Resume created successfully",
    data: await createResume(id, data),
  });
}
