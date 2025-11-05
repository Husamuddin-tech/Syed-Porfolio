'use client';
import { motion } from 'motion/react';
import { Highlight } from './ui/hero-highlight';
import { PixelatedCanvas } from './ui/pixelated-canvas';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

export function HeroSection() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) return null;

  const shadowColor = isDarkMode ? '#f4d7b4' : '#b38b63';

  return (
    <motion.section
    key={theme}
      className="relative flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-4 sm:px-6 md:px-20 
  bg-linear-to-br from-[#F8EFE4] via-[#F3E6D3] to-[#EBDAC1] 
  dark:from-[#1C1612] dark:via-[#2C231D] dark:to-[#3A2D24]
  text-[#3B2E26] dark:text-[#FDF8F3] transition-all duration-700 overflow-hidden"
    >
      {/* 🌤️ Soft beige glow behind image */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] md:w-[650px] md:h-[650px]
      bg-linear-to-tr from-[#E7CBA9]/50 via-[#F9E8CF]/30 to-transparent rounded-full blur-3xl shadow-[0_0_80px_rgba(231,203,169,0.4)]"
        />
      </div>

      {/* 📝 Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="text-center md:text-left mt-8 md:mt-0 md:mr-12 max-w-full sm:max-w-md md:max-w-xl z-10"
      >
        <motion.h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-extrabold leading-tight text-[#3B2E26] dark:text-[#FAF3E9]">
          Welcome to
          <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
            <Highlight className="px-4 py-1.5 rounded-full bg-[#E7CBA9]/70 dark:bg-[#A67C52]/60 text-[#3B2E26] dark:text-[#FDF8F3] shadow-sm">
              Syed
            </Highlight>
            <Highlight className="px-4 py-1.5 rounded-full bg-[#E7CBA9]/70 dark:bg-[#A67C52]/60 text-[#3B2E26] dark:text-[#FDF8F3] shadow-sm">
              Husamuddin&apos;s
            </Highlight>
          </div>
          <div className="mt-3 text-xl sm:text-2xl md:text-4xl text-[#4B3C2E] dark:text-[#EEDDCB] font-semibold tracking-wide">
            Portfolio
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl mt-5 text-[#5A4937] dark:text-[#D8C4B0] font-sans leading-relaxed"
        >
          Crafting clean code, creative UI, and intelligent systems 🚀
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-sm sm:text-base mt-3 italic text-[#6B5845] dark:text-[#CBB8A5]"
        >
          “Turning ideas into interactive elegance.”
        </motion.p>
      </motion.div>

      {/* 🖼️ Profile Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ scale: 1.05 }}
        className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 rounded-full overflow-hidden 
    border-[3px] border-[#E7CBA9] dark:border-[#B38B63] shadow-[0_0_50px_rgba(179,139,99,0.25)] z-10"
      >
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full h-full rounded-full overflow-hidden"
        > */}
          {/* Pixelated beige glow */}
          <PixelatedCanvas
            src="/assets/profilebg.png"
            width={400}
            height={380}
            cellSize={3}
            dotScale={0.6}
            shape="circle"
            backgroundColor="transparent"
            interactive={false}
            distortionStrength={0}
            tintColor={shadowColor}
            tintStrength={0.3}
            className="absolute -top-16 left-0 w-full h-full"
          />

          {/* Profile image */}
          <Image
            src="/assets/profilebg.png"
            alt="Syed Husamuddin"
            fill
            className="absolute inset-0 object-cover rounded-full"
          />
        </motion.div>
      {/* </motion.div> */}
    </motion.section>
  );
}
