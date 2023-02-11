import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import styles from './GlassPane.module.scss';

type GlassPaneProps = {
  className: string;
};

export const GlassPane = ({
  children,
  className,
}: PropsWithChildren<GlassPaneProps>) => {
  return (
    <div
      className={clsx(
        styles.glass,
        'rounded-2xl border-solid border-2 border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};
