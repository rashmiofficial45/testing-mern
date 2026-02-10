"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/*
|--------------------------------------------------------------------------
| Application Setup Layer
|--------------------------------------------------------------------------
| - Initializes Express framework
| - Acts as the foundation of our HTTP server
| - All routes and middleware will attach to this app instance
*/
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const sumSchema = zod_1.default.object({
    a: zod_1.default.number(),
    b: zod_1.default.number()
});
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.get("/", (req, res) => {
    console.log("the server is up");
    res.send("the server is up and running");
});
exports.app.post("/sum", (req, res) => {
    const result = sumSchema.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({
            error: "Incorrect inputs"
        });
        return;
    }
    const a = result.data.a;
    const b = result.data.b;
    const answer = a + b;
    res.json({
        answer,
    });
});
exports.app.get("/sum", (req, res) => {
    const parsedResponse = sumSchema.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    });
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
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
