import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Prisma v7: pg adapter requires a direct postgresql:// URL (not prisma+postgres:// Accelerate URL).
// https://pris.ly/d/help/next-js-best-practices

function createClient(): PrismaClient {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
  });
  return new PrismaClient({ adapter } as any) as PrismaClient;
}

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = createClient();
} else {
  if (!global.prisma) {
    global.prisma = createClient();
  }
  prisma = global.prisma!;
}

export default prisma;
