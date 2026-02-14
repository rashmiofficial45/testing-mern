import { it, describe, expect, vi } from "vitest";
import { app } from "../index";
import request from "supertest";
import { prismaClient } from "../__mocks__/db";

vi.mock("../db")


describe("Tests the sum function", () => {
  it("Should return 3 when 1 + 2", async () => {
    prismaClient.request.create.mockResolvedValue({
      id: 1,
      a: 1,
      b: 2,
      result: 3,
      type: "Sum"
    })
    // Spy on the create method to check whether the inputs are right or not
    vi.spyOn(prismaClient.request, "create")

    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2
    })
    // expect the create method to be called with the right inputs
    expect(prismaClient.request.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        result: 3,
        type: "Sum"
      }
    })

    expect(res.body.answer).toBe(3);
    expect(res.body.id).toBe(1)
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
