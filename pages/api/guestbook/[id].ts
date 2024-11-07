import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send('Unauthorized');
  }

  const { id } = req.query;
  const email = session.user?.email;

  if (!email) {
    return res.status(403).send('Unauthorized');
  }

  const entry = await prisma.portfolio.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!entry) {
    return res.status(404).send('Entry not found');
  }

  if (req.method === 'GET') {
    return res.json({
      id: entry.id.toString(),
      body: entry.body,
      created_by: entry.created_by,
      updated_at: entry.updated_at
    });
  }

  if (email !== entry.email) {
    return res.status(403).send('Unauthorized');
  }

  if (req.method === 'DELETE') {
    await prisma.portfolio.delete({
      where: {
        id: Number(id)
      }
    });

    return res.status(204).json({});
  }

  if (req.method === 'PUT') {
    const body = (req.body.body || '').slice(0, 500);

    const updatedEntry = await prisma.portfolio.update({
      where: {
        id: Number(id)
      },
      data: {
        body,
        updated_at: new Date().toISOString()
      }
    });

    return res.status(201).json({
      ...updatedEntry,
      body
    });
  }

  return res.send('Method not allowed.');
}
