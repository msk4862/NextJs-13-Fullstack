import { cookies } from 'next/headers';
import { getUserFromCookie } from '../auth';
import { delay } from '../utils';

export const getUserDetails = async () => {
  // adding fake delay
  await delay(4000);

  const user = await getUserFromCookie(cookies());
  return user;
};
