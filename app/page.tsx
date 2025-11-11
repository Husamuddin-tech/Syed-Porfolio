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
    <main
      className="relative flex flex-col items-center min-h-screen w-full overflow-x-hidden bg-[--bg-color] text-[--text-color] transition-colors duration-500 ease-in-out selection:bg-yellow-300/20 selection:text-yellow-700 motion-safe:scroll-smooth"
    >
      {/* ✨ Subtle animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-[--bg-color] via-[--border-color]/10 to-[--bg-color] opacity-60 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* 🌈 Soft radial glow behind content */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-gradient-radial from-green-400/10 via-transparent to-transparent blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2 }}
      />

      {/* 🌟 Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <HeroSection />
      </motion.div>

      {/* 🌐 Other Sections */}
      <section className="relative z-10 w-full space-y-40 lg:space-y-48">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {/* About */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <About />
          </motion.div>

          {/* Projects */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Projects />
          </motion.div>

          {/* Achievements */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Achievements />
          </motion.div>

          {/* RC */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <RC />
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Contact />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
