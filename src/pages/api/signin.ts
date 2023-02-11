import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

import { db } from '@lib/db';
import { comparePasswords, createJWT } from '@lib/auth';

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid login' });
      return;
    }

    const isUser = await comparePasswords(req.body.password, user.password);

    console.log(isUser);

    if (isUser) {
      const cookieName = process.env.COOKIE_NAME;
      if (cookieName) {
        const jwt = await createJWT(user);
        res.setHeader(
          'Set-Cookie',
          serialize(cookieName, jwt, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
        );
      }
      res.status(200).end();
    } else {
      res.status(401).json({ error: 'Invalid login' });
    }
  } else {
    res.status(402).end();
  }
}
