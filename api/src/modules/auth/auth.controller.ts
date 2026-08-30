import type { Request, Response } from "express";
import { registerUser } from "./auth.service.js";

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: await registerUser(username, email, password),
  });
}
