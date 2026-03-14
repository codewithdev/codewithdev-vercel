import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

// Prisma v7 does not auto-load .env when evaluating prisma.config.ts,
// so we load it manually to make DATABASE_URL available for CLI commands.
config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
