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

  describe("POST /sum", () => {
    it("test the post endpoint", async () => {
      const response = await request(app).post("/sum").send
        ({
          a: 1,
          b: 2
        })
      expect(response.statusCode).toBe(200)
      expect(response.body.answer).toBe(3)
    })

    it("should return the sum of two negative numbers", async () => {
      const response = await request(app).post("/sum").send({
        a: -1,
        b: -2
      });
      expect(response.statusCode).toBe(200)
      expect(response.body.answer).toBe(-3);
    });

    it("should return the sum of two zero number", async () => {
      const response = await request(app).post("/sum").send({
        a: 0,
        b: 0
      });
      expect(response.statusCode).toBe(200)
      expect(response.body.answer).toBe(0);
    });

    it("should return 411 if wrong inputs are provided", async () => {
      const response = await request(app).post("/sum").send({})
      expect(response.statusCode).toBe(411)
      expect(response.body.error).toBe("Incorrect inputs")
    })
  })

  describe('GET /sum', () => {
    it("should return the sum of two numbers", async () => {
      const res = await request(app)
        .get("/sum")
        .set({
          a: "1",
          b: "2"
        })
        .send();
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(3);
    });
    it("should return 411 if no inputs are provided", async()=> {
      const response = await request(app).get("/sum").send()
      expect(response.statusCode).toBe(411)
      expect(response.body.message).toBe("Incorrect inputs")
    })
   })
})