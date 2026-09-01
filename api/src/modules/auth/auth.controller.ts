import type { Request, Response } from "express";
import {
  findAuthenticatedUser,
  loginUser,
  registerUser,
  updateAuthenticatedUser,
} from "./auth.service.js";
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateAuthenticatedUserInput,
} from "./auth.types.js";

export async function register(req: Request, res: Response) {
  const data: RegisterUserInput = req.body;

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: await registerUser(data),
  });
}

export async function login(req: Request, res: Response) {
  const data: LoginUserInput = req.body;

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: await loginUser(data),
  });
}

export async function getUserProfile(req: Request, res: Response) {
  const { id: userId } = req.user;

  return res.status(200).json({
    success: true,
    message: "Account retrieved successfully",
    data: await findAuthenticatedUser(userId),
  });
}

export async function updateUserProfile(req: Request, res: Response) {
  const { id: userId } = req.user;
  const data: UpdateAuthenticatedUserInput = req.body;

  return res.status(200).json({
    success: true,
    message: "Account updated successfully",
    data: await updateAuthenticatedUser(userId, data),
  });
}
