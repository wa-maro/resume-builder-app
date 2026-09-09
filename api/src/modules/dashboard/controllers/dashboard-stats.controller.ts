import { adminDashboardService } from "@dashboard/services";
import type { Request, Response } from "express";

async function getAdminDashboardStats(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: await adminDashboardService.adminDashboardStats(),
  });
}

export const adminDashboardController = {
  getDashboardStats: getAdminDashboardStats,
};
