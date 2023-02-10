import bcrypt from 'bcrypt'
import { SignJWT, jwtVerify } from 'jose'
import { User } from '@prisma/client'

import { db } from './db'
import { fetcher } from './api'

export const register = async (user) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  })
}

export const signin = async (user) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  })
}

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword)

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  )

  return payload.payload as any
}

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME)

  const { id } = await validateJWT(jwt.value)

  // check if user is in DB a well
  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  })

  return user
}
