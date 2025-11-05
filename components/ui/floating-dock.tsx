'use client';

import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { useRef, useState } from 'react';

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
  iconSize?: number;
  gap?: number;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

/* 📱 Mobile Dock */
const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#F8F3ED]/90 via-[#F3E5D8]/80 to-[#E7CBA9]/80 border border-[#E2D2B8] shadow-md dark:from-[#1A1410]/90 dark:via-[#2C1F16]/80 dark:to-[#4A3222]/80 dark:border-[#3C2A1E] transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="h-4 w-4 text-[#6E4B2B] dark:text-[#F3E5D8]">
                    {item.icon}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#F8F3ED]/90 to-[#E7CBA9]/90 border border-[#E2D2B8] shadow-md dark:from-[#2C1F16]/80 dark:to-[#4A3222]/80 dark:border-[#3C2A1E] transition-all hover:scale-105 hover:shadow-lg"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-[#6E4B2B] dark:text-[#F3E5D8]" />
      </button>
    </div>
  );
};

/* 💻 Desktop Dock */
const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex backdrop-blur-md border border-[#E2D2B8] dark:border-[#3C2A1E] bg-linear-to-r from-[#F8F3ED]/85 via-[#F3E5D8]/80 to-[#E7CBA9]/75 dark:from-[#1A1410]/85 dark:via-[#2C1F16]/80 dark:to-[#4A3222]/75 shadow-[0_2px_20px_rgba(200,180,140,0.25)] dark:shadow-[0_2px_20px_rgba(100,70,40,0.4)] transition-all duration-300 hover:shadow-[0_4px_24px_rgba(200,180,140,0.4)] dark:hover:shadow-[0_4px_24px_rgba(120,90,60,0.7)]',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
          disableScale={item.title === 'Syed'}
        />
      ))}
    </motion.div>
  );
};

/* 🧭 Icon Container */
function IconContainer({
  mouseX,
  title,
  icon,
  href,
  disableScale,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  disableScale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return disableScale ? 0 : val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const widthIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const heightIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-linear-to-br from-[#F8F3ED] via-[#E7CBA9] to-[#E7CBA9]/80 dark:from-[#1A1410] dark:via-[#2C1F16] dark:to-[#4A3222] border border-[#E2D2B8] dark:border-[#3C2A1E] shadow-sm hover:shadow-lg transition-all"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-[#E2D2B8] dark:border-[#3C2A1E] bg-[#F8F3ED] px-2 py-0.5 text-xs font-medium whitespace-pre text-[#6E4B2B] dark:bg-[#2C1F16] dark:text-[#F3E5D8] shadow-sm"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-[#6E4B2B] dark:text-[#F3E5D8]"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
