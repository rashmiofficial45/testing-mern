import request from "supertest"
import { app } from "../index"
import { describe, it, expect } from "@jest/globals"

describe("testing the server is running or not", () => {
  describe("GET /", () => {
    it("should return 200 status and a message", async () => {
      const response = await request(app).get("/")
      expect(response.statusCode).toBe(200)
    })
  })

  describe("POST /sum", ()=> {
    it("test the post endpoint", async()=> {
      const response = await request(app).post("/sum").send
      ({
        a:1,
        b:2
      })
      expect(response.statusCode).toBe(200)
      expect(response.body.result).toBe(3)
    })
    it("should return the sum of two negative numbers", async () => {
      const response = await request(app).post("/sum").send({
        a: -1,
        b: -2
      });
      expect(response.statusCode).toBe(200)
      expect(response.body.result).toBe(-3);
    });

    it("should return the sum of two zero number", async () => {
      const response = await request(app).post("/sum").send({
        a: 0,
        b: 0
      });
      expect(response.statusCode).toBe(200)
      expect(response.body.result).toBe(0);
    });
  })
})