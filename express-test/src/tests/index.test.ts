import request from "supertest"
import {app} from "../index"
import {describe, it, expect} from "@jest/globals"

describe("testing the server is running or not", ()=> {
  it("should return 200 status and a message", async()=> {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })
})