import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

const Input = z.object({
  a: z.number(),
  b: z.number()
})

app.post("/sum", async(req, res) => {
  const parsedResponse = await Input.safeParse(req.body)

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  if (parsedResponse.data.a > 1000000000000 || parsedResponse.data.b > 1000000000000) {
    return res.status(422).json({
      message: "Sorry we dont support big numbers"
    })
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;

  await prismaClient.request.create({
    data: {
      a: parsedResponse.data.a,
      b: parsedResponse.data.b,
      result: answer,
      type: "Sum"
    }
  })

  res.json({
    answer,
    // id: response.id
  })
});

app.get("/multiply", async (req, res) => {
  const parsedResponse = await Input.safeParse(req.body)

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const answer = parsedResponse.data.a * parsedResponse.data.b;

  const response = await prismaClient.request.create({
    data: {
      a: parsedResponse.data.a,
      b: parsedResponse.data.b,
      result: answer,
      type: "Multiply"
    }
  })

  res.json({
    answer,
    id: response.id
  })
});