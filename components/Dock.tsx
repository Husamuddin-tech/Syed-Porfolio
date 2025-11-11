'use client';
import { motion } from 'motion/react';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconCertificate2,
  IconFileText,
  IconFolder,
  IconHome,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function Dock() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ Prevent hydration mismatch by waiting for client mount
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);
  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';
  const toggleDarkMode = () => {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    setTheme(isDark ? 'light' : 'dark');
    // 🔁 Reload the page after a small delay to ensure the theme updates
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };
  const links = [
    {
      title: 'Home',
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
      ariaLabel: 'Go to Home section',
    },
    {
      title: 'About',
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#about',
      ariaLabel: 'Go to About section',
    },
    {
      title: 'Projects',
      icon: (
        <IconFolder className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#projects',
      ariaLabel: 'Go to Projects section',
    },
    {
      title: 'Toggle Dark Mode!!',
      icon: (
        <div
          className="relative group cursor-pointer h-full w-full"
          onClick={toggleDarkMode}
        >
          <Image
            src="/assets/logo.PNG"
            width={24}
            height={24}
            alt="Syed Logo"
            className={`h-full w-full filter ${
              isDark ? 'grayscale invert' : 'grayscale'
            } transition-all duration-300`}
          />
        </div>
      ),
      href: '#',
      ariaLabel: 'Toggle Dark Mode',
    },
    {
      title: 'Achievements',
      icon: (
        <IconCertificate2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#achievements',
      ariaLabel: 'Go to Achievements section',
    },
    {
      title: 'Resume/CV',
      icon: (
        <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#resume',
      ariaLabel: 'Go to Resume/CV section',
    },
    {
      title: 'Contact',
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#contact',
      ariaLabel: 'Go to Contact section',
    },
  ];

  return (
    <>
      {/* 🌐 Desktop & Tablet Dock - Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="backdrop-blur-lg bg-linear-to-r from-[#F8F3ED]/90 via-[#F3E5D8]/90 to-[#E7CBA9]/90 dark:from-[#1A1410]/90 dark:via-[#2C1F16]/90 dark:to-[#4A3222]/90 border border-[#E2D2B8] dark:border-[#3C2A1E] shadow-[0_2px_20px_rgba(230,200,150,0.25)] dark:shadow-[0_2px_20px_rgba(100,70,40,0.5)] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 hover:shadow-[0_4px_24px_rgba(230,200,150,0.35)] dark:hover:shadow-[0_4px_24px_rgba(120,90,60,0.7)] transition-all duration-300"
        >
          <FloatingDock items={links} />
        </motion.div>
      </motion.div>

      {/* 📱 Mobile Dock - Right Center */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="flex md:hidden fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="backdrop-blur-lg bg-linear-to-b from-[#F8F3ED]/90 via-[#F3E5D8]/90 to-[#E7CBA9]/90 dark:from-[#1A1410]/90 dark:via-[#2C1F16]/90 dark:to-[#4A3222]/90 border border-[#E2D2B8] dark:border-[#3C2A1E] shadow-[0_2px_20px_rgba(230,200,150,0.25)] dark:shadow-[0_2px_20px_rgba(100,70,40,0.5)] rounded-2xl p-2 sm:p-3 hover:shadow-[0_4px_24px_rgba(230,200,150,0.35)] dark:hover:shadow-[0_4px_24px_rgba(120,90,60,0.7)] transition-all duration-300"
        >
          <FloatingDock items={links} iconSize={24} gap={4} />
        </motion.div>
      </motion.div>
    </>
  );
}
