/*
|--------------------------------------------------------------------------
| Application Setup Layer
|--------------------------------------------------------------------------
| - Initializes Express framework
| - Acts as the foundation of our HTTP server
| - All routes and middleware will attach to this app instance
*/
import express from "express";

export const app = express();

/*
|--------------------------------------------------------------------------
| Middleware Layer (Important in real projects)
|--------------------------------------------------------------------------
| This allows Express to parse JSON request bodies.
| Without this, req.body will be undefined.
*/
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
| Purpose:
| - Confirms that the server is alive
| - Used by:
|   • Load balancers
|   • Monitoring tools
|   • DevOps pipelines
*/
app.get("/", (req, res) => {
  console.log("the server is up");
  res.send("the server is up and running");
});

/*
|--------------------------------------------------------------------------
| Business Logic Route: SUM API
|--------------------------------------------------------------------------
| Contract:
| POST /sum
|
| Expected Request Body:
| {
|   "a": number,
|   "b": number
| }
|
| Behavior:
| - Reads numbers from request body
| - Computes their sum
| - Returns result in JSON format
*/
app.post("/sum", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const result = a + b;

  res.json({
    result,
  });
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
