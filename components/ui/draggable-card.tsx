'use client';
import { cn } from '@/lib/utils';
import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from 'motion/react';

/**
 * DraggableCardBody
 * A 3D draggable interactive card with realistic spring physics and mouse-based tilt.
 */
export const DraggableCardBody = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  // Capture drag velocity for realistic throw physics
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  };

  // Interactive tilt on mouse move
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [20, -20]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-20, 20]),
    springConfig
  );

  // Subtle opacity + glare shifts
  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.85, 1, 0.85]),
    springConfig
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.25, 0, 0.25]),
    springConfig
  );

  // Dynamically adjust constraints on window resize
  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== 'undefined') {
        const { innerWidth, innerHeight } = window;
        setConstraints({
          top: -innerHeight / 2,
          left: -innerWidth / 2,
          right: innerWidth / 2,
          bottom: innerHeight / 2,
        });
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Track mouse position for tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      onDragStart={() => (document.body.style.cursor = 'grabbing')}
      onDragEnd={(event, info) => {
        document.body.style.cursor = 'default';

        // Reset rotation smoothly
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: { type: 'spring', ...springConfig },
        });

        // Simulate inertia with bounce
        const vX = velocityX.get();
        const vY = velocityY.get();
        const magnitude = Math.sqrt(vX * vX + vY * vY);
        const bounce = Math.min(0.8, magnitude / 1000);

        animate(info.point.x, info.point.x + vX * 0.3, {
          type: 'spring',
          stiffness: 60,
          damping: 14,
          bounce,
          mass: 0.7,
        });

        animate(info.point.y, info.point.y + vY * 0.3, {
          type: 'spring',
          stiffness: 60,
          damping: 14,
          bounce,
          mass: 0.7,
        });
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: 'transform',
      }}
      animate={controls}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      className={cn(
        'relative w-auto max-w-md min-w-[260px] overflow-visible rounded-2xl bg-linear-to-br from-neutral-50 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 p-5 shadow-2xl transform-3d border border-neutral-300/40 dark:border-neutral-700/60',
        'transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]',
        className
      )}
    >
      {children}

      {/* Glare effect */}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-linear-to-tl from-white/40 via-transparent to-transparent mix-blend-overlay rounded-2xl"
      />
    </motion.div>
  );
};

/**
 * DraggableCardContainer
 * Provides 3D perspective context for DraggableCardBody elements.
 */
export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      'relative flex items-center justify-center perspective-[3000px] overflow-visible',
      className
    )}
  >
    {children}
  </div>
);