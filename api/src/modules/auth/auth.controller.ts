import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service.js";

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: await registerUser(username, email, password),
  });
}

export async function login(req: Request, res: Response) {
  const { usernameOrEmail, password } = req.body;

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: await loginUser(usernameOrEmail, password),
  });
}
