'use client'; // we need to use usePathname hook, which will not be accessible in server component

import Link from 'next/link';
import { Settings, User, Grid, Calendar } from 'react-feather';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const icons = { Settings, User, Grid, Calendar };

export type SideBarLink = {
  label: string;
  link: string;
  icon: keyof typeof icons;
};

const SidebarLink = ({
  link: { label, link, icon },
}: {
  link: SideBarLink;
}) => {
  const pathname = usePathname();

  /**
   * we can't dircetly pass Icon Component from a server component to client,
   * as a Component is a function and functions 'can not be sent over a network',
   * they are not serializable just like a Date object, or a reccursive object
   */
  const Icon = icons[icon];
  return (
    <Link href={link} className='w-full flex justify-center items-center'>
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          pathname === link && 'stroke-violet-600'
        )}
      />
    </Link>
  );
};

export default SidebarLink;
