'use client';

import { useCallback } from 'react';
import { LogOut } from 'react-feather';
import { useRouter } from 'next/navigation';

import { Button } from '@components/Button';
import { signout } from '@lib/api';

export const Logout = () => {
  const router = useRouter();
  const onClick = useCallback(async () => {
    await signout();
    router.replace('/signin');
  }, [router]);

  return (
    <div className='flex items-center gap-2'>
      <Button type='submit' variant='text' onClick={onClick}>
        <LogOut size='20' />
      </Button>
    </div>
  );
};
