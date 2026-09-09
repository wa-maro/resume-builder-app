import { dashboardAdminController } from "@dashboard/controllers";
import { tryCatch } from "@shared/utils";
import { Router } from "express";

const dashboardAdminRouter = Router();

dashboardAdminRouter.get(
  "/stats",
  tryCatch(dashboardAdminController.getAggregatedStats, "getAggregatedStats"),
);

export { dashboardAdminRouter };
