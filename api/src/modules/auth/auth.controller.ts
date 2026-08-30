import type { Request, Response } from "express";
import {
  findAuthenticatedUser,
  loginUser,
  registerUser,
  updateAuthenticatedUser,
} from "./auth.service.js";

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

export async function getUserProfile(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: "Account retrieved successfully",
    data: await findAuthenticatedUser(req.user.id),
  });
}

export async function updateUserProfile(req: Request, res: Response) {
  const { newUsername, newEmail, newPassword } = req.body;

  return res.status(200).json({
    success: true,
    message: "Account updated successfully",
    data: await updateAuthenticatedUser(req.user.id, {
      newUsername,
      newEmail,
      newPassword,
    }),
  });
}
