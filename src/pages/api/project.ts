import { validateJWT } from '@lib/auth';
import { db } from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieName = process.env.COOKIE_NAME ?? '';
  const user = await validateJWT(req.cookies[cookieName] || '');

  if (!user) {
    res.status(400).json({ status: false });
  }

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  res.json({ data: { message: 'ok' } });
}
