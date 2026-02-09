import { sum } from "../index";
import { describe, it, expect } from "@jest/globals"


describe("test for sum function", () => {
  it("adding 1 and 2", () => {
    expect(sum(1, 2)).toBe(3)
  })

  it("adding negetive values", ()=>{
    expect(sum(-1,-2)).toBe(-3)
  })
})

