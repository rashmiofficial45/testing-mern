"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
/**
 * ─────────────────────────────────────────────
 *  OPTIONAL: Mock Prisma (recommended for unit tests)
 * ─────────────────────────────────────────────
 * Uncomment this if you do NOT want to hit the real database.
 */
vitest_1.vi.mock("../db", () => ({
    prismaClient: {
        sum: {
            create: vitest_1.vi.fn()
        }
    }
}));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
(0, vitest_1.describe)("POST /sum", () => {
    (0, vitest_1.describe)("When inputs are valid", () => {
        (0, vitest_1.it)("should return 200 and correct sum", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.app)
                .post("/sum")
                .send({ a: 1, b: 2 }); // Using 1 and 2 to be explicit
            (0, vitest_1.expect)(res.statusCode).toBe(200);
            (0, vitest_1.expect)(res.body.answer).toBe(3);
        }));
    });
    (0, vitest_1.describe)("When inputs are invalid", () => {
        (0, vitest_1.it)("should return 411 for wrong input types", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.app)
                .post("/sum")
                .send({
                a: ["asdasdasd"], // invalid type
                b: 2,
            });
            (0, vitest_1.expect)(res.statusCode).toBe(411);
            (0, vitest_1.expect)(res.body.message).toBe("Incorrect inputs");
        }));
        (0, vitest_1.it)("should return 411 for empty body", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.app).post("/sum").send({});
            (0, vitest_1.expect)(res.statusCode).toBe(411);
        }));
    });
});
