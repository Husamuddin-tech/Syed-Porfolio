'use client';
import dynamic from 'next/dynamic';

import { motion } from 'motion/react';
import { HeroSection } from '@/components/HeroSection';

import Projects from '@/components/Projects';
import RC from '@/components/RC';
import Contact from '@/components/Contact';
import Achievements from '@/components/Achievements';

const About = dynamic(() => import('@/components/About'), { ssr: false });

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-x-hidden bg-(--bg-color) text-(--text-color) transition-colors duration-500 ease-in-out selection:bg-yellow-300/20 selection:text-yellow-650">
      {/* ✨ Subtle animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-(--bg-color) via-(--border-color)/5 to-(--bg-color) opacity-70 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* 🌈 Soft radial glow behind content */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-gradient-radial from-green-400/10 via-transparent to-transparent blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* 🌟 Hero Section (fade + scale on load) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 w-full"
      >
        <HeroSection />
      </motion.div>

      {/* 🌐 Other Sections (staggered reveal) */}
      <section className="relative z-10 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <About />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Projects />
          </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <Achievements />
              </motion.div>
              
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <RC />
          </motion.div>


          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Contact />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
