import request from "supertest";
import app from "./app.js";

describe("GET /api/v1/hello-world", () => {
  it("should return a hello world response", async () => {
    const response = await request(app).get("/api/v1/hello-world");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Hello World!",
    });
  });
});
