'use client';

import { motion } from 'motion/react';
import { Cover } from '@/components/ui/cover';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { TextGenerateEffect } from './ui/text-generate-effect';
import { FlipWords } from './ui/flip-words';
import { CometCard } from './ui/comet-card';
import Image from 'next/image';
import SkillSet from './SkillSet';

const bio = `I’m currently pursuing a Computer Science Engineering degree, specializing in Artificial Intelligence and Data Science, at Methodist College of Engineering. 
In addition, I’m a fellow at NxtWave Disruptive Technologies, actively working towards the CCBP 4.0 Certification Program to strengthen my professional expertise.`;
const cleanBio = bio.replace(/\t/g, ' ').replace(/ +/g, ' ');

const expertise = [
  'Artificial Intelligence (AI)',
  'Data Science',
  'Full-Stack Development',
  'Real-World Problem Solving',
  'Data-Driven Decision Making',
  'Future-Ready Technology Skills',
];

export default function About() {
  return (
    <>
    <motion.section
    id='about'
  className="relative flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-20 
  bg-linear-to-br from-[#F7EDE2] via-[#FAF6F0] to-[#F0E1CF]
  dark:from-[#1A1410] dark:via-[#2C221C] dark:to-[#3B2E26]
  text-neutral-900 dark:text-[#FDF8F3] transition-colors duration-700 overflow-hidden pb-5"
>
  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 w-full max-w-7xl mx-auto">
    
    {/* 🪐 Left Visual with Floating Aura */}
    <motion.div
      className="w-full lg:w-1/2 flex justify-center lg:justify-start relative"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Soft Floating Aura */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
        initial={{ scale: 0.95, opacity: 0.3 }}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 rounded-3xl bg-linear-to-tr from-yellow-100/30 via-amber-200/20 to-amber-300/30 blur-3xl opacity-50" />
      </motion.div>

      {/* Comet Card */}
      <CometCard>
        <button
          type="button"
          className="my-10 flex w-80 flex-col items-stretch rounded-3xl bg-[#E7CBA9]/60 backdrop-blur-xl p-3 md:p-4 transition-transform duration-500 hover:scale-105 hover:shadow-xl border border-[#E7CBA9]/30 relative overflow-hidden"
          aria-label="View Portfolio Card"
        >
          {/* Background Image */}
          <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop"
              alt="Background"
              fill
              className="absolute inset-0 object-cover contrast-90"
            />
          </div>

          {/* Overlay Mission */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-5 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-sm sm:text-base md:text-[1.05rem] font-medium leading-snug text-transparent bg-clip-text bg-linear-to-r from-yellow-700 via-yellow-800 to-amber-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              🚀 Mission: Designing elegant, AI-powered web experiences that
              combine innovation and usability.
            </p>
          </motion.div>

          {/* Card Footer */}
          <div className="mt-3 flex items-center justify-between p-2 text-sm font-mono text-neutral-700 dark:text-neutral-300">
            <span>Syed</span>
            <span className="opacity-60">Portfolio</span>
          </div>
        </button>
      </CometCard>
    </motion.div>

    {/* ✨ Right Text / Hero Info */}
    <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8 items-center lg:items-start text-center lg:text-left">
      
      {/* Hero Title */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
        bg-clip-text text-transparent 
        bg-linear-to-r from-[#B99563] via-[#C4A776] to-[#D6B57B]
        dark:from-[#A87C57] dark:via-[#B48A6B] dark:to-[#FDF8F3]
        leading-tight sm:leading-snug md:leading-relaxed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        👋 Hi, I’m <br />
        <Cover className="inline-block bg-transparent dark:bg-transparent">Syed Husamuddin</Cover>
      </motion.h1>

      {/* Dynamic Subheading */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <span className="text-base sm:text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300">
          A passionate&nbsp;
        </span>
        <LayoutTextFlip
          text=""
          words={['Full-Stack Developer', 'AI & Machine Learning']}
          className="text-base sm:text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-yellow-600 via-amber-500 to-orange-400 bg-transparent dark:bg-transparent"
        />
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-sm sm:text-base md:text-lg text-neutral-700/80 dark:text-neutral-400 leading-relaxed max-w-md lg:max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        I design and develop delightful digital experiences that blend
        creativity, technology, and artificial intelligence.
      </motion.p>

      {/* Animated Bio */}
      <motion.div
        className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-left text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
      >
        <TextGenerateEffect
          words={cleanBio}
          filter={true}
          duration={0.5}
        />
      </motion.div>

      {/* Expertise */}
      <motion.div
        className="mt-8 flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-yellow-700 via-amber-600 to-orange-400">
          Key Areas of Expertise
        </h2>
        <div className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-yellow-500 via-amber-400 to-orange-300">
          <FlipWords words={expertise} />
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>

{/* 🧠 Add SkillSet Section BELOW */}
      <motion.section
        id="skills"
        className="py-20 bg-linear-to-b from-[#FAF6F0] to-[#F7EDE2] dark:from-[#1A1410] dark:to-[#2C221C]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <SkillSet />
      </motion.section>

</>
);
}
