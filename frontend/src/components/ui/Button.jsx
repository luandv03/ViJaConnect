import React from 'react';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';

const buttonVariants = (options) => {
  const baseClasses =
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900';

  const variantClasses = {
    default:
      'bg-zinc-900 text-zinc-100 hover:bg-zinc-800',
    destructive: 'text-white bg-red-500 hover:bg-red-600 dark:hover:bg-red-600',
    outline:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300',
    subtle:
      'hover:bg-zinc-200 bg-zinc-100 text-zinc-900',
    ghost:
      'bg-transparent hover:bg-zinc-100 text-zinc-800 data-[state=open]:bg-transparent data-[state=open]:bg-transparent',
    link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
  };

  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-2 rounded-md',
    xs: 'h-8 px-1.5 rounded-sm',
    lg: 'h-11 px-8 rounded-md',
  };

  return classNames(
    baseClasses,
    variantClasses[options.variant || 'default'],
    sizeClasses[options.size || 'default'],
    options.className
  );
};

const Button = React.forwardRef(
  (
    // eslint-disable-next-line react/prop-types
    { className, children, variant, isLoading, size, ...props },
    ref
  ) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
