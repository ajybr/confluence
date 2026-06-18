import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv4first");

import pg from "pg";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({
  connectionString: process.env.DIRECT_URL!,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma
