import { dashboardAdminService } from "@dashboard/services";
import type { Request, Response } from "express";

async function getAggregatedStats(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: await dashboardAdminService.aggregateStats(),
  });
}

export const dashboardAdminController = {
  getAggregatedStats,
};
