import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

import { db } from '@lib/db';
import { comparePasswords, createJWT } from '@lib/auth';
import { JWT_COOKIE_NAME } from '@lib/environments';

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
    if (!isUser) {
      res.status(401).json({ error: 'Invalid login' });
    }

    const jwt = await createJWT(user);
    // set JWT token in cookie which will be used for authorisation in future requests
    res.setHeader(
      'Set-Cookie',
      serialize(JWT_COOKIE_NAME, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    res.status(200).end();
  } else {
    res.status(402).end();
  }
}
