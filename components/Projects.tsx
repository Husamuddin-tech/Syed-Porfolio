'use client';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LinkPreview } from './ui/link-preview';
import { IconBrandGithub } from '@tabler/icons-react';

const projects = [
  {
    title: 'AI Wiki Quiz Generator',
    description:
      'Full-stack app that transforms Wikipedia articles into interactive quizzes using AI.',
    image: '/assets/projects/ai-wiki.png',
    github: 'https://github.com/Husamuddin-tech/AI-Wiki-Quiz-Generator',
    live: 'https://ai-wiki-quiz-generator-ui.onrender.com/',
  },
  {
    title: 'Incognito Talk',
    description:
      'Secure, anonymous communication platform designed for true privacy.',
    image: '/assets/projects/incognito.png',
    github: 'https://github.com/Husamuddin-tech/IncognitoTalk',
    live: 'https://incognito-talk-phi.vercel.app/',
  },
  {
    title: 'ClipGenie',
    description:
      'Create, upload, and share creative short clips effortlessly — powered by modern web tech.',
    image: '/assets/projects/clipgenie.png',
    github: 'https://github.com/Husamuddin-tech/ClipGenie',
    live: 'https://clipgenie-5wrj.onrender.com/',
  },
  {
    title: 'Resume AI Analyzer',
    description:
      'AI-powered resume analysis tool using Google Gemini to give tailored career insights.',
    image: '/assets/projects/resumeai.png',
    github: 'https://github.com/Husamuddin-tech/Resume-AI-Analyzer',
    live: 'https://resume-ai-analyzer-peach.vercel.app/',
  },
  {
    title: 'Old Portfolio',
    description:
      'My previous portfolio showcasing projects, skills, and resume — built with passion.',
    image: '/assets/projects/old-portfolio.png',
    github: 'https://github.com/Husamuddin-tech/Portfolio',
    live: 'https://husamuddintech.vercel.app/',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-linear-to-br from-[#F7EDE2] via-[#FAF6F0] to-[#F0E1CF] dark:from-[#1A1410] dark:via-[#2C221C] dark:to-[#3B2E26] text-neutral-900 dark:text-[#FDF8F3]"
    >
      {/* Header */}
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-center bg-linear-to-r from-[#5a4634] to-[#b2956b] dark:from-[#f5deb3] dark:to-[#e3c59a] bg-clip-text text-transparent"
      >
        Featured Projects
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-base md:text-lg text-center text-neutral-700 dark:text-neutral-400 mb-16 max-w-2xl"
      >
        A selection of my favorite projects — blending creativity, AI, and
        modern full-stack development.
      </motion.p>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-6xl"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <CardContainer className="inter-var w-full">
              <CardBody className="relative group/card bg-[#f9f6f1] dark:bg-[#1c1b19] border border-[#e0d6c3]/60 dark:border-[#3d3a36]/60 rounded-2xl p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_45px_rgba(210,180,140,0.3)] dark:hover:shadow-[0_0_35px_rgba(255,235,205,0.15)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] ease-out">
                {/* Title */}
                <CardItem
                  translateZ="60"
                  className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-[#f5f3ef] mb-2"
                >
                  {project.title}
                </CardItem>

                {/* Description */}
                <CardItem
                  as="p"
                  translateZ="80"
                  className="text-neutral-700 text-sm md:text-base dark:text-neutral-300 leading-relaxed"
                >
                  {project.description}
                </CardItem>

                {/* Image */}
                <CardItem
                  translateZ="120"
                  rotateX={10}
                  rotateZ={-6}
                  className="w-full mt-6"
                >
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      className="object-contain object-center rounded-xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </CardItem>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-10">
                  {/* GitHub */}
                  <CardItem
                    translateZ={30}
                    translateX={-20}
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-800 dark:text-[#f5f3ef] hover:text-[#a67c52] dark:hover:text-[#d2b48c] text-sm font-medium transition-all duration-300"
                  >
                    <IconBrandGithub size={18} />
                    <span>Code</span>
                  </CardItem>

                  {/* Visit */}
                  <CardItem
                    translateZ={30}
                    translateX={20}
                    as="a"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-linear-to-r from-[#d2b48c] to-[#c2a676] dark:from-[#e3c59a] dark:to-[#d2b48c] text-white dark:text-black text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    Visit →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center text-lg mt-16 leading-relaxed tracking-wide text-neutral-700 dark:text-neutral-300"
      >
        Want to see more? Explore my{' '}
        <motion.span
          whileHover={{
            scale: 1.1,
            rotate: 1,
            transition: { type: 'spring', stiffness: 300, damping: 12 },
          }}
          className="inline-block relative group"
        >
          <LinkPreview
            url="https://github.com/Husamuddin-tech?tab=repositories"
            className="relative font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#b08d57] via-[#d2b48c] to-[#b08d57]
                       hover:from-[#d2b48c] hover:to-[#e3c59a] transition-all duration-500"
          >
            GitHub
            <motion.span
              layout
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#d2b48c] to-[#e3c59a] rounded-full group-hover:w-full transition-all duration-500"
            />
          </LinkPreview>
        </motion.span>{' '}
        <span className="font-medium">profile</span> for more repositories and
        open-source work.
      </motion.div>
    </section>
  );
};

export default Projects;
