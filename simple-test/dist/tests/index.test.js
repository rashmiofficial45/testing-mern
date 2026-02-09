"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("test for sum function", () => {
    (0, globals_1.it)("adding 1 and 2", () => {
        (0, globals_1.expect)((0, index_1.sum)(1, 2)).toBe(3);
    });
    (0, globals_1.it)("adding negetive values", () => {
        (0, globals_1.expect)((0, index_1.sum)(-1, -2)).toBe(-3);
    });
});
