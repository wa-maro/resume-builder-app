import { adminDashboardController } from "@dashboard/controllers";
import { tryCatch } from "@shared/utils";
import { Router } from "express";

const dashboardAdminRouter = Router();

dashboardAdminRouter.get(
  "/stats",
  tryCatch(adminDashboardController.getDashboardStats, "getDashboardStats"),
);

export { dashboardAdminRouter };
