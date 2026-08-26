import express from "express";

const app = express();

app.get("/api/v1/hello-world", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World!",
  });
});

export default app;
