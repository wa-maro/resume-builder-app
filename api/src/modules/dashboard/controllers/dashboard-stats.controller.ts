import { adminDashboardStats } from "@dashboard/services";
import type { Request, Response } from "express";

export async function getDashboardStats(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: await adminDashboardStats(),
  });
}
