import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const totalViews = await prisma.views.aggregate({
      _sum: {
        count: true
      }
    });

    // Handle case where count is null
    const count = totalViews._sum.count ?? 0;
    return res.status(200).json({ total: count.toString() });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred' });
  }
}
