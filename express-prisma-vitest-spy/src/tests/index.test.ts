import { it, describe, expect, vi } from "vitest";
import { app } from "../index";
import request from "supertest";

vi.mock("../db", () => ({
  prismaClient: {
    request: {
      create: vi.fn()
    }
  }
}))

describe("Tests the sum function", () => {
  it("Should return 3 when 1 + 2", async() => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2
    })
  expect(res.body.answer).toBe(3);
  expect(res.statusCode).toBe(200);
  })

  it("Should fail when a number is too big", async () => {
    const res = await request(app).post("/sum").send({
      a: 100000000000000000,
      b: 2
    })
    expect(res.body.message).toBe("Sorry we dont support big numbers");
    expect(res.statusCode).toBe(422);
  })
})
