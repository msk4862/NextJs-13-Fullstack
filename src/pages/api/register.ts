import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

import { db } from '@lib/db';
import { createJWT, hashPassword } from '@lib/auth';
import { JWT_COOKIE_NAME } from '@lib/environments';

type Data = {
  status: boolean;
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: await hashPassword(req.body.password),
      },
    });

    // set JWT token in cookie which will be used for authorisation in future requests
    const jwt = await createJWT(user);
    res.setHeader(
      'Set-Cookie',
      serialize(JWT_COOKIE_NAME, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    res.status(201).json({ status: true });
  }
  res.status(402).json({ status: false });
}
