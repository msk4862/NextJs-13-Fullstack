import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { User } from '@prisma/client';

import { db } from './db';
import { JWT_COOKIE_NAME, JWT_SECRET } from './environments';

type JWTData = {
  id: string;
  email: string;
};

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(JWT_SECRET));
};

export const validateJWT = async (jwt: string): Promise<JWTData> => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(JWT_SECRET)
  );

  return payload.payload as JWTData;
};

export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(JWT_COOKIE_NAME);

  const { id } = await validateJWT(jwt.value);

  // check if user is in DB a well
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
