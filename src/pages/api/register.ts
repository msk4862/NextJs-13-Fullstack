import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

import { db } from '@lib/db';
import { createJWT, hashPassword } from '@lib/auth';
import { User, PrismaClient } from '@prisma/client';

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

    const jwt = await createJWT(user);
    const cookieName = process.env.COOKIE_NAME;

    if (cookieName) {
      res.setHeader(
        'Set-Cookie',
        serialize(cookieName, jwt, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
      );
    }

    res.status(201).json({ status: true });
  }
  res.status(402).json({ status: false });
}
