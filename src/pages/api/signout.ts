import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

import { JWT_COOKIE_NAME } from '@lib/environments';

export default async function signout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const jwt = req.cookies[JWT_COOKIE_NAME];

    if (jwt) {
      // setting maxAge to negative to make JWT token expire
      res.setHeader(
        'Set-Cookie',
        serialize(JWT_COOKIE_NAME, jwt, {
          httpOnly: true,
          path: '/',
          maxAge: -1,
        })
      );
    } else {
      res.status(400).json({ status: false, message: 'User not logged in' });
    }

    res.status(200).end();
  } else {
    res.status(402).end();
  }
}
