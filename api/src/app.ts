import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./shared/utils/loggers.util.js";
import errorHandler from "./http/middlewares/error-handler.middleware.js";
import { env } from "./config/env.js";

const app = express();

app.use((req, _res, next) => {
  httpLogger.http(`${req.method} ${req.url}`);

  next();
});

app.use(
  helmet({
    crossOriginResourcePolicy: false, // disable CORP for serving static files
  }),
);

app.use(
  cors({
    origin: env.frontendOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.get("/api/v1/hello-world", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World!",
  });
});

app.use(errorHandler);

export default app;
