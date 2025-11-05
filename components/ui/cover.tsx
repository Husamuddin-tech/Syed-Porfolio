'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { SparklesCore } from '@/components/ui/sparkles';

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  // const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);
  const [beamVariants, setBeamVariants] = useState<
    { duration: number; delay: number }[]
  >([]);

  // ---------- Setup container dimensions ----------
  useEffect(() => {
    const updateDimensions = () => {
      if (!ref.current) return;
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;

      setContainerWidth(width);

      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // ---------- Precompute beam durations & delays ----------
  useEffect(() => {
  if (beamPositions.length === 0) return;

  // Schedule state update to avoid cascading renders
  const id = requestAnimationFrame(() => {
    const variants = beamPositions.map(() => ({
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2 + 1,
    }));
    setBeamVariants(variants);
  });

  return () => cancelAnimationFrame(id); // cleanup
}, [beamPositions]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative group/cover inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2 transition duration-200 rounded-sm hover:bg-neutral-900',
        className
      )}
    >
      {/* ---------------- Sparkles ---------------- */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 h-full w-full overflow-hidden z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{
                x: { duration: 10, ease: 'linear', repeat: Infinity },
              }}
              className="flex h-full w-[200%]"
            >
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                particleColor="#FFFFFF"
                className="w-full h-full"
              />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                particleColor="#FFFFFF"
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Beams ---------------- */}
      {beamPositions.map((pos, i) => {
        const variant = beamVariants[i] ?? { duration: 1.5, delay: 0 };
        return (
          <Beam
            key={i}
            hovered={hovered}
            duration={variant.duration}
            delay={variant.delay}
            width={containerWidth}
            style={{ top: `${pos}px` }}
          />
        );
      })}

      {/* ---------------- Text ---------------- */}
      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.8 : 1,
          x: hovered ? [0, -30, 30, -30, 30, 0] : 0,
          y: hovered ? [0, 30, -30, 30, -30, 0] : 0,
        }}
        transition={{
          duration: 0.2,
          x: { duration: 0.2, repeat: Infinity, repeatType: 'loop' },
          y: { duration: 0.2, repeat: Infinity, repeatType: 'loop' },
          scale: { duration: 0.2 },
        }}
        className={cn(
          'relative z-20 inline-block text-neutral-900 dark:text-white group-hover/cover:text-white transition duration-200',
          className
        )}
      >
        {children}
      </motion.span>

      {/* ---------------- Corner Circles ---------------- */}
      <CircleIcon className="absolute -right-0.5 -top-0.5" />
      <CircleIcon className="absolute -bottom-0.5 -right-0.5" />
      <CircleIcon className="absolute -left-0.5 -top-0.5" />
      <CircleIcon className="absolute -bottom-0.5 -left-0.5" />
    </div>
  );
};

// ---------------- Beam ----------------
export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...props
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width}
      height="1"
      viewBox={`0 0 ${width} 1`}
      fill="none"
      className={cn('absolute inset-x-0 w-full', className)}
      {...props}
    >
      <motion.path d={`M0 0.5H${width}`} stroke={`url(#beamGradient-${id})`} />

      <defs>
        <motion.linearGradient
          id={`beamGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: '0%', x2: '-5%', y1: 0, y2: 0 }}
          animate={{ x1: '110%', x2: '100%', y1: 0, y2: 0 }}
          transition={{
            duration: duration ?? 2,
            ease: 'linear',
            repeat: Infinity,
            delay: delay ?? 1,
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

// ---------------- Circle Icon ----------------
export const CircleIcon = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'pointer-events-none animate-pulse h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white',
      className
    )}
  />
);
