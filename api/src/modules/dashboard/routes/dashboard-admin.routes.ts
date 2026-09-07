import { getDashboardStats } from "@dashboard/controllers";
import { tryCatch } from "@shared/utils";
import { Router } from "express";

const dashboardAdminRouter = Router();

dashboardAdminRouter.get(
  "/stats",
  tryCatch(getDashboardStats, "getDashboardStats"),
);

export { dashboardAdminRouter };
