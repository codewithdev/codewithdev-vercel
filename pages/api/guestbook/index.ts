import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';

// Explicit type until `prisma generate` picks up the new image + provider columns
type PortfolioEntry = {
  id: number;
  email: string;
  body: string;
  created_by: string;
  image: string | null;
  provider: string | null;
  updated_at: Date;
};

/** Infer the OAuth provider from the avatar URL so we don't need JWT callbacks. */
function inferProvider(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  if (imageUrl.includes('avatars.githubusercontent.com')) return 'github';
  if (imageUrl.includes('pbs.twimg.com')) return 'twitter';
  if (imageUrl.includes('media.licdn.com')) return 'linkedin';
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const entries = await prisma.portfolio.findMany({
        orderBy: { updated_at: 'desc' }
      }) as unknown as PortfolioEntry[];

      return res.json(
        entries.map((entry) => ({
          id: entry.id.toString(),
          body: entry.body,
          created_by: entry.created_by,
          image: entry.image ?? null,
          provider: entry.provider ?? null,
          updated_at: entry.updated_at
        }))
      );
    } catch {
      return res.status(200).json([]);
    }
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send('Unauthorized');
  }

  const email = session.user?.email;
  const name = session.user?.name;
  const image = session.user?.image ?? null;
  const provider = inferProvider(image);

  if (!email || !name) {
    return res.status(403).send('Unauthorized');
  }

  if (req.method === 'POST') {
    try {
      const newEntry = await prisma.portfolio.create({
        data: {
          email,
          body: (req.body.body || '').slice(0, 500),
          created_by: name,
          image,
          provider
        }
      });

      return res.status(200).json({
        id: newEntry.id.toString(),
        body: newEntry.body,
        created_by: newEntry.created_by,
        image: newEntry.image ?? null,
        provider: newEntry.provider ?? null,
        updated_at: newEntry.updated_at
      });
    } catch {
      return res.status(503).json({ message: 'Database unavailable. Try again later.' });
    }
  }

  return res.send('Method not allowed.');
}
