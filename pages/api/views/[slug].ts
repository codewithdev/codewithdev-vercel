import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

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
      const newOrUpdatedViews = await prisma.views.upsert({
        where: { slug },
        create: {
          slug,
          count: 1
        },
        update: {
          count: {
            increment: 1
          }
        }
      });

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString()
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug
        }
      });

      if (!views) {
        return res.status(200).json({ total: '0' });
      }

      return res.status(200).json({ total: views.count.toString() });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e instanceof Error ? e.message : 'An error occurred' });
  }
}
