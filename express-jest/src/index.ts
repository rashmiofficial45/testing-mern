/*
|--------------------------------------------------------------------------
| Application Setup Layer
|--------------------------------------------------------------------------
| - Initializes Express framework
| - Acts as the foundation of our HTTP server
| - All routes and middleware will attach to this app instance
*/
import express from "express";
import z from "zod"

const sumSchema = z.object({
  a: z.number(),
  b: z.number()
})

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("the server is up");
  res.send("the server is up and running");
});

app.post("/sum", (req, res) => {
  const result = sumSchema.safeParse(req.body)
  if (!result.success){
    res.status(411).json({
      error: "Incorrect inputs"
    })
    return
  }
  const a = result.data.a
  const b = result.data.b
  const answer = a + b
  res.json({
    answer,
  });
});

app.get("/sum", (req, res) => {
  const parsedResponse = sumSchema.safeParse({
    a: Number(req.headers["a"]),
    b: Number(req.headers["b"])
  })

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    })
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;

  res.status(200).json({ answer });

});
/*
|--------------------------------------------------------------------------
| Server Bootstrap Layer
|--------------------------------------------------------------------------
| Note:
| - In real production apps, we normally DO NOT start the server here
| - Instead, we export `app` and start the server in a separate file (e.g., bin.ts)
| - This makes testing easier and more modular
|
| Example in real project:
|   export default app;
|
| Then in bin.ts:
|   app.listen(3000)
*/
// app.listen(3000, () => {
//   console.log("the server is running on the port 3000");
// });
