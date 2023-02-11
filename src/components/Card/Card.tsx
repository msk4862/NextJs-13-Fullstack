import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type CardProps = {
  className?: string;
};

export const Card = ({ className, children }: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={clsx(
        'rounded-3xl px-10 py-4 drop-shadow-xl bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};
