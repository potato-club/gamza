import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export type DomainRecord = {
  key: string;
  type: string;
  name: string;
  data: string;
  ttl: number;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DomainRecord>
) {
  await prisma.domain.findUnique({
    where: { name: req.query.name as string },
  });

  res.status(200).json({ name: 'John Doe' });
}
