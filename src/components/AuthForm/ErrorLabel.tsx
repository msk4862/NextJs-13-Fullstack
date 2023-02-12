import clsx from 'clsx';
import { AlertCircle } from 'react-feather';

type ErrorLabel = {
  className?: string;
  label: string;
  size?: 'xs' | 'sm' | 'base';
};

export const ErrorLabel = ({ className, label, size = 'xs' }: ErrorLabel) => {
  if (!label) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex items-center text-red-500 ml-2 mt-2',
        `text-${size}`,
        className
      )}
    >
      <AlertCircle size='15' />
      <label className='ml-1'>{label}</label>
    </div>
  );
};
