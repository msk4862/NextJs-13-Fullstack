import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const variants = {
  primary: 'bg-violet-500 text-white border-transparent hover:bg-violet-600',
  secondary:
    'bg-white text-black border-gray-400 hover:bg-gray-100 border-solid border-2 border-gray-800',
  text: 'bg-transparent text-black hover:bg-gray-100',
};

const sizes = {
  sm: 'text-md py-1 px-2',
  md: 'text-lg px-6 py-2',
  lg: 'text-xlg px-8 py-4',
};

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={clsx(
        'rounded-3xl font-bold transition duration-200 ease-in-out',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
