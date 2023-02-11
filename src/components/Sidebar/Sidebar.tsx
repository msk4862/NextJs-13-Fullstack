import Image from 'next/image';

import { Card } from '@components/Card';
import SidebarLink from './SidebarLink';

import logo from '@assets/images/next.svg';

import type { SideBarLink } from './SidebarLink';

const links: SideBarLink[] = [
  { label: 'Home', icon: 'Grid', link: '/home' },
  {
    label: 'Calendar',
    icon: 'Calendar',
    link: '/calendar',
  },
  { label: 'Profile', icon: 'User', link: '/profile' },
  {
    label: 'Settings',
    icon: 'Settings',
    link: '/settings',
  },
];

export const Sidebar = () => {
  return (
    <Card className='h-full w-40 flex items-center justify-between flex-wrap'>
      <div className='w-full flex justify-center items-center'>
        <Image src={logo} alt='Able logo' priority className='w-14' />
      </div>
      {links.map((link) => (
        <SidebarLink key={link.link} link={link} />
      ))}
    </Card>
  );
};
