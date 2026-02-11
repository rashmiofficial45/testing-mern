"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
// 1. Create a PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
// 2. Create the Prisma adapter
const adapter = new adapter_pg_1.PrismaPg(pool);
// 3. Pass the adapter to PrismaClient
exports.prismaClient = new client_1.PrismaClient({ adapter });
