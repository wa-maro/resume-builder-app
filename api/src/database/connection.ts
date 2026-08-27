import mongoose from "mongoose";
import { env } from "../config/env.js";
import { infoLogger } from "../shared/utils/loggers.util.js";

export async function connectDatabase(): Promise<void> {
  if (!env.mongodbUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(env.mongodbUri);

  infoLogger.info("Database connection established");
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();

  infoLogger.info("Database connection terminated");
}
