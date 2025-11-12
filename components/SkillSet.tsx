'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';

export default function SkillSet() {
  type SkillItem = { name: string; icon: string };
  type SkillGroup = { label: string; items: SkillItem[] };
  type SkillCategory = { title: string; skills: SkillGroup[] };

  const skillCategories: SkillCategory[] = [
    {
      title: '💻 Technical Skills',
      skills: [
        {
          label: 'Languages',
          items: [
            { name: 'HTML', icon: 'vscode-icons:file-type-html' },
            { name: 'CSS', icon: 'vscode-icons:file-type-css' },
            { name: 'JavaScript', icon: 'logos:javascript' },
            { name: 'Python', icon: 'logos:python' },
            { name: 'C', icon: 'devicon:c' },
            { name: 'C++', icon: 'devicon:cplusplus' },
            { name: 'SQL', icon: 'vscode-icons:file-type-sql' },
            { name: 'DSA', icon: 'mdi:graph-outline' },
          ],
        },
        {
          label: 'Python Libraries',
          items: [
            { name: 'NumPy', icon: 'logos:numpy' },
            { name: 'Pandas', icon: 'logos:pandas-icon' },
            { name: 'Matplotlib', icon: 'logos:matplotlib-icon' },
            { name: 'Seaborn', icon: 'logos:seaborn-icon' },
            { name: 'Scikit-learn', icon: 'devicon:scikitlearn' },
            { name: 'TensorFlow', icon: 'logos:tensorflow' },
            { name: 'OpenCV', icon: 'logos:opencv' },
          ],
        },
        {
          label: 'JS Frameworks',
          items: [
            { name: 'Node.js', icon: 'logos:nodejs-icon' },
            { name: 'Express.js', icon: 'simple-icons:express' },
            { name: 'React', icon: 'logos:react' },
            { name: 'Next.js', icon: 'logos:nextjs-icon' },
            { name: 'Bootstrap', icon: 'logos:bootstrap' },
            { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
          ],
        },
        {
          label: 'Tools & Platforms',
          items: [
            { name: 'VS Code', icon: 'logos:visual-studio-code' },
            { name: 'Git', icon: 'logos:git-icon' },
            { name: 'GitHub', icon: 'logos:github-icon' },
            { name: 'MongoDB', icon: 'skill-icons:mongodb' },
            { name: 'MySQL', icon: 'logos:mysql' },
            { name: 'PostgreSQL', icon: 'logos:postgresql' },
            { name: 'Postman', icon: 'logos:postman-icon' },
            { name: 'Google Cloud', icon: 'logos:google-cloud' },
            { name: 'OpenAI', icon: 'logos:openai-icon' },
            { name: 'n8n', icon: 'simple-icons:n8n' },
          ],
        },
      ],
    },
    {
      title: '🤝 Soft Skills',
      skills: [
        {
          label: 'Interpersonal',
          items: [
            { name: 'Leadership', icon: 'mdi:crown' },
            { name: 'Team Work', icon: 'mdi:account-group' },
            { name: 'Interactive', icon: 'mdi:account-voice' },
          ],
        },
        {
          label: 'Professional',
          items: [
            { name: 'Problem Solving', icon: 'mdi:lightbulb-on-outline' },
            { name: 'Time Management', icon: 'mdi:clock-outline' },
            { name: 'Creativity', icon: 'mdi:palette-outline' },
            { name: 'Adaptability', icon: 'mdi:repeat-variant' },
          ],
        },
      ],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-10">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-linear-to-r from-amber-700 via-amber-500 to-yellow-400 dark:from-amber-200 dark:to-yellow-300 mb-6">
        Skill Set
      </h2>
      <p className="text-center text-neutral-600 dark:text-neutral-300 mb-16">
        Hover on a card to see the sparkle ✨
      </p>

      {skillCategories.map((category, i) => (
        <div key={i} className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-10 text-amber-800 dark:text-amber-300">
            {category.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {category.skills.map((group, j) => (
              <SkillCard
                key={j}
                title={group.label}
                icon={
                  group.label === 'Languages'
                    ? 'pepicons-print:code'
                    : group.label === 'Python Libraries'
                    ? 'gravity-ui:logo-python'
                    : group.label === 'JS Frameworks'
                    ? 'ion:logo-nodejs'
                    : group.label === 'Tools & Platforms'
                    ? 'mdi:tools'
                    : group.label === 'Interpersonal'
                    ? 'mdi:account-group'
                    : group.label === 'Professional'
                    ? 'mdi:briefcase-outline'
                    : 'mdi:star-outline'
                }
                colorIndex={j}
              >
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center mt-4 px-2 sm:px-4">
                  {group.items.map((item, k) => (
                    <motion.li
                      key={k}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex flex-col items-center justify-center text-white/90 hover:text-white transition-all duration-300"
                    >
                      <Icon
                        icon={item.icon}
                        className="text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2 drop-shadow-[0_0_12px_rgba(255,230,200,0.35)]"
                      />
                      <span className="text-[0.7rem] sm:text-sm md:text-base font-semibold text-center leading-tight">
                        {item.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </SkillCard>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function SkillCard({
  title,
  icon,
  children,
  colorIndex,
}: {
  title: string;
  icon?: string;
  children?: React.ReactNode;
  colorIndex: number;
}) {
  const [hovered, setHovered] = React.useState(false);

  const neutralPalette = [
    'bg-[#F8F6F3] dark:bg-[#1C1B1A]',
    'bg-[#EDEAE5] dark:bg-[#1E1D1C]',
    'bg-[#F2EFE9] dark:bg-[#201F1E]',
    'bg-[#E9E6DF] dark:bg-[#222120]',
  ];
  const cardColor = neutralPalette[colorIndex % neutralPalette.length];

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className={`relative border border-amber-900/10 dark:border-amber-100/10 rounded-3xl overflow-hidden w-full max-w-md sm:max-w-lg h-[520px] sm:h-[560px] flex flex-col items-center justify-center p-6 shadow-[0_0_25px_rgba(180,150,100,0.25)] hover:shadow-[0_0_45px_rgba(240,200,130,0.55)] transition-all duration-500 ${cardColor}`}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-linear-to-b from-[#F5E7C8]/60 to-[#EADDC5]/50 dark:from-[#141312]/80 dark:to-[#1A1917]/80"
          >
            {/* Wider Canvas Effect */}
            <div className="w-[130%] h-full -ml-[15%]">
              <CanvasRevealEffect animationSpeed={3.5} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full">
        {icon && (
          <motion.div
            animate={{
              y: hovered ? [-2, 2, -2] : 0,
              rotate: hovered ? [0, 2, -2, 0] : 0,
            }}
            transition={{
              repeat: hovered ? Infinity : 0,
              duration: 2.2,
              ease: 'easeInOut',
            }}
          >
            <Icon
              icon={icon}
              className="text-4xl sm:text-5xl text-amber-700 dark:text-amber-300 drop-shadow-md mb-3"
            />
          </motion.div>
        )}

        <motion.h4
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? 8 : 0 }}
          transition={{ duration: 0.4 }}
          className="font-semibold text-2xl sm:text-3xl text-amber-900 dark:text-amber-100 mb-4"
        >
          {title}
        </motion.h4>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.6 }}
          className="overflow-y-auto no-scrollbar h-full"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

