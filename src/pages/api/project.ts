import { validateJWT } from '@lib/auth';
import { db } from '@lib/db';
import { JWT_COOKIE_NAME } from '@lib/environments';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await validateJWT(req.cookies[JWT_COOKIE_NAME] || '');
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
