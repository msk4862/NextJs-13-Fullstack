import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Inter } from '@next/font/google';

import { GlassPane } from '@components/GlassPain';
import { Sidebar } from '@components/Sidebar';

import '@styles/global.scss';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function DashboardRootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={clsx(inter.variable, 'dark')}>
      <head />
      <body className='h-screen w-screen candy-mesh p-6'>
        <GlassPane className='w-full h-full p-6 flex align-center container mx-auto'>
          <Sidebar />
          <main className='w-full pl-6 h-full'>{children}</main>
        </GlassPane>
        <div id='modal'></div>
      </body>
    </html>
  );
}
