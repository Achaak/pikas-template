import { prisma } from ".";

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
] as Partial<User>[];

const seed = async (): Promise<void> => {
  try {
    await Promise.all(
      DEFAULT_USERS.map(async (user) =>
        prisma.user
          .upsert({
            where: {
              email: user.email!,
            },
            update: {
              ...user,
            },
            create: {
              ...user,
            },
          })
          .then((u) => {
            console.log(`Created user: ${u.name ?? u.id}`);
          })
          .catch((error) => {
            console.error(error);
          })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void seed();
