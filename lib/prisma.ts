import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// One client per server process. DATABASE_URL is read when the first request
// needs it, never at build time.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function db(): PrismaClient {
  if (!globalForPrisma.prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not set");
    globalForPrisma.prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  }
  return globalForPrisma.prisma;
}
