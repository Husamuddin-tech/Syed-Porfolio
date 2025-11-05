'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { HTMLMotionProps, motion, useAnimate } from 'motion/react';
import { Download } from 'lucide-react';

// ✅ Button Props
interface ButtonProps extends HTMLMotionProps<'button'> {
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  ...rest
}) => {
  const [scope, animate] = useAnimate();
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');

  // ---- Animations ----
  const animateLoading = async () => {
    setState('loading');
    await animate(
      '.loader',
      { scale: 1, opacity: 1, display: 'block' },
      { duration: 0.2 }
    );
  };

  const animateSuccess = async () => {
    setState('success');
    await animate(
      '.loader',
      { scale: 0, opacity: 0, display: 'none' },
      { duration: 0.2 }
    );
    await animate(
      '.check',
      { scale: 1, opacity: 1, display: 'block' },
      { duration: 0.2 }
    );

    // Hold success briefly
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset to idle
    await animate(
      '.check',
      { scale: 0, opacity: 0, display: 'none' },
      { duration: 0.2 }
    );
    setState('idle');
  };

  // ---- Click Handler ----
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await animateLoading();

    // Run user-defined onClick logic (like file download)
    if (onClick) await onClick(event);

    await animateSuccess();
  };

  return (
    <motion.button
      layout
      layoutId="button"
      ref={scope}
      className={cn(
        'flex min-w-[140px] items-center justify-center gap-2 rounded-full bg-neutral-500 px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-neutral-500 dark:ring-offset-black',
        className
      )}
      {...rest}
      onClick={handleClick}
    >
      <motion.div layout className="flex items-center gap-2">
        {/* Download Icon */}
        {state === 'idle' && (
          <motion.div
            key="download"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Download className="w-5 h-5" />
          </motion.div>
        )}

        {/* Loader Animation */}
        <Loader visible={state === 'loading'} />

        {/* Success Check Icon */}
        <CheckIcon visible={state === 'success'} />

        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  );
};

// ---- Loader ----
const Loader = ({ visible }: { visible: boolean }) => (
  <motion.svg
    animate={{
      rotate: visible ? [0, 360] : 0,
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0,
      display: visible ? 'block' : 'none',
    }}
    transition={{
      duration: 1,
      repeat: visible ? Infinity : 0,
      ease: 'linear',
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="loader text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </motion.svg>
);

// ---- Check Icon ----
const CheckIcon = ({ visible }: { visible: boolean }) => (
  <motion.svg
    animate={{
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0,
      display: visible ? 'block' : 'none',
    }}
    transition={{ duration: 0.2 }}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="check text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </motion.svg>
);
