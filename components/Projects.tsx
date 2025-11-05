'use client';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Incognito Talk',
    description:
      'Join the most secure and anonymous communication network ever built.',
    image: '/assets/projects/incognito.png',
    github: 'https://github.com/Husamuddin-tech/IncognitoTalk',
    live: 'https://incognito-talk-phi.vercel.app/',
  },
  {
    title: 'ClipGenie',
    description:
      'Flex your videography skills and share your amazing clips—any email will do! 🎬✨',
    image: '/assets/projects/clipgenie.png',
    github: 'https://github.com/Husamuddin-tech/ClipGenie',
    live: 'https://clipgenie-5wrj.onrender.com/',
  },
  {
    title: 'Resume AI Analyzer',
    description:
      'An AI-powered resume analyzer using Google Gemini that identifies your strengths, weaknesses, and personalized improvement tips.',
    image: '/assets/projects/resumeai.png',
    github: 'https://github.com/Husamuddin-tech/Resume-AI-Analyzer',
    live: 'https://resume-ai-analyzer-peach.vercel.app/',
  },
  {
    title: 'Old Portfolio',
    description:
      'My personal portfolio which features some of my github projects as well as my resume and technical skills.',
    image: '/assets/projects/old-portfolio.png',
    github: 'https://github.com/Husamuddin-tech/Portfolio',
    live: 'https://husamuddintech.vercel.app/',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
        className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-16 tracking-tight text-center"
      >
        My Projects
      </motion.h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-6xl">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            // ✨ Floating idle animation
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          >
            <CardContainer className="inter-var w-full">
              <CardBody
                className="relative group/card 
                  bg-[#f9f6f1] dark:bg-[#1c1b19]
                  border border-[#e0d6c3]/60 dark:border-[#3d3a36]/60
                  rounded-2xl p-6 
                  transition-all duration-500 ease-in-out 
                  hover:shadow-2xl hover:shadow-[rgba(210,180,140,0.3)] 
                  dark:hover:shadow-[rgba(255,235,205,0.15)]
                  hover:scale-[1.03]"
              >
                {/* Title */}
                <CardItem
                  translateZ="60"
                  className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-[#f5f3ef]"
                >
                  {project.title}
                </CardItem>

                {/* Description */}
                <CardItem
                  as="p"
                  translateZ="80"
                  className="text-neutral-700 text-sm md:text-base mt-2 max-w-sm dark:text-neutral-300"
                >
                  {project.description}
                </CardItem>

                {/* Image with 3D effect */}
                <CardItem
                  translateZ="120"
                  rotateX={15}
                  rotateZ={-10}
                  className="w-full mt-6"
                >
                  <div className="relative w-full aspect-video sm:aspect-4/3 md:aspect-3/2 rounded-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} thumbnail`}
                      fill
                      className="object-contain object-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                      priority={false}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardItem>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-10">
                  {/* GitHub */}
                  <CardItem
                    translateZ={30}
                    translateX={-30}
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium
                      text-gray-800 dark:text-[#f5f3ef]
                      hover:text-[#a67c52] dark:hover:text-[#d2b48c]
                      hover:-translate-y-1
                      cursor-pointer
                      transition-all duration-300 ease-in-out"
                  >
                    Code →
                  </CardItem>

                  {/* Visit */}
                  <CardItem
                    translateZ={30}
                    translateX={30}
                    as="a"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl
                      bg-linear-to-r from-[#d2b48c] to-[#c2a676] 
                      dark:from-[#e3c59a] dark:to-[#d2b48c]
                      text-white dark:text-black 
                      text-xs md:text-sm font-semibold 
                      shadow-md hover:shadow-lg
                      hover:scale-105 hover:-translate-y-1
                      cursor-pointer
                      transition-transform duration-300 ease-in-out"
                  >
                    Visit
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
