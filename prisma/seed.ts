import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function seed(): Promise<void> {
  await prisma.$disconnect();
}

seed();
