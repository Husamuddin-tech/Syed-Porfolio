'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, motion, useMotionTemplate } from 'motion/react';
import React from 'react';

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        // Background & layout
        'group relative flex h-160 w-full items-center justify-center transition-colors duration-500',
        // Soft beige gradient for light mode
        'bg-linear-to-br from-[#F5EBDD] via-[#F9F3EA] to-[#EFE2D0]',
        // Warm dark beige tones for dark mode
        'dark:from-[#1A1410] dark:via-[#2C221C] dark:to-[#3B2E26]',
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle grid pattern for texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] bg-size-[24px_24px] opacity-40 dark:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[24px_24px] opacity-30" />

      {/* Light mode hover highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 220, 170, 0.25) 0%, transparent 80%)',
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)
          `,
          maskImage: useMotionTemplate`
            radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)
          `,
        }}
      />

      {/* Dark mode hover highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 200, 150, 0.15) 0%, transparent 80%)',
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)
          `,
          maskImage: useMotionTemplate`
            radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)
          `,
        }}
      />

      <div className={cn('relative z-20 text-center px-4', className)}>
        {children}
      </div>
    </div>
  );
};

// Highlight text element — adjusted for beige palette
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block rounded-full px-3 py-1
         bg-linear-to-r from-[#E7CBA9] via-[#F4D7B4] to-[#E8C89B]
         dark:from-[#B38B63] dark:via-[#C69C73] dark:to-[#A87C57]
         shadow-[0_0_12px_rgba(180,140,90,0.25)]
         text-neutral-900 dark:text-[#FDF8F3]
         transition-all duration-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
