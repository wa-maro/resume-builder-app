import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateAuthenticatedUserInput,
} from "./auth.types.js";

async function register(req: Request, res: Response) {
  const data: RegisterUserInput = req.body;

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: await authService.register(data),
  });
}

async function login(req: Request, res: Response) {
  const data: LoginUserInput = req.body;

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: await authService.login(data),
  });
}

async function getUserProfile(req: Request, res: Response) {
  const { id: userId } = req.user;

  return res.status(200).json({
    success: true,
    message: "Account retrieved successfully",
    data: await authService.findAuthenticatedUser(userId),
  });
}

async function updateUserProfile(req: Request, res: Response) {
  const { id: userId } = req.user;
  const data: UpdateAuthenticatedUserInput = req.body;

  return res.status(200).json({
    success: true,
    message: "Account updated successfully",
    data: await authService.updateAuthenticatedUser(userId, data),
  });
}

export const authController = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
};
