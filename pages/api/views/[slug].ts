import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

const DB_TIMEOUT_MS = 8_000;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Database request timeout')), ms)
    )
  ]);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.query.slug) {
      return res.status(400).json({ message: 'Slug is required' });
    }
    const slug = req.query.slug.toString();

    if (req.method === 'POST') {
      const newOrUpdatedViews = await withTimeout(
        prisma.views.upsert({
          where: { slug },
          create: { slug, count: 1 },
          update: { count: { increment: 1 } }
        }),
        DB_TIMEOUT_MS
      );
      return res.status(200).json({ total: newOrUpdatedViews.count.toString() });
    }

    if (req.method === 'GET') {
      const views = await withTimeout(
        prisma.views.findUnique({ where: { slug } }),
        DB_TIMEOUT_MS
      );
      if (!views) {
        return res.status(200).json({ total: '0' });
      }
      return res.status(200).json({ total: views.count.toString() });
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[views] DB unavailable:', e instanceof Error ? e.message : 'timeout');
    }
    if (req.method === 'GET') {
      return res.status(200).json({ total: '0' });
    }
    return res.status(503).json({ message: 'Database unavailable. Try again later.' });
  }
}
