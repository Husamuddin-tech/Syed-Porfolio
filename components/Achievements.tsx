'use client';
import { motion } from 'framer-motion';
import {
  DraggableCardBody,
  DraggableCardContainer,
} from '@/components/ui/draggable-card';
import Image from 'next/image';

const Achievements = () => {
  // 🎓 NxtWave Certificates (draggable)
  const nxtwaveCerts = [
    {
      title: 'Dynamic Web Application',
      image:
        'https://drive.google.com/uc?export=view&id=1MISHbZ7j0v2yBp1VK_mHAAQtMmRVBEoB',
    },
    {
      title: 'Responsive Website',
      image:
        'https://drive.google.com/uc?export=view&id=1HwUqUp_qApeTZnFEZXw2TlBZ-sJNpCbP',
    },
    {
      title: 'JavaScript Essentials',
      image:
        'https://drive.google.com/uc?export=view&id=1H_jQnuNY7BYKiFEVI_Vi8z1j5Pj8alOh',
    },
    {
      title: 'Web Design Using Flexbox',
      image:
        'https://drive.google.com/uc?export=view&id=1XyjT1dhZRQpPqX4sW_uatAZj3OjNErma',
    },
    {
      title: 'NxtCode- 7 Under 7 Challenge',
      image:
        'https://drive.google.com/uc?export=view&id=19SB0g9rSwQo14hwh2cC1K1P_6O9rQsHM',
    },
  ];

  // 🏫 College Certificates (grid)
  const collegeCerts = [
    {
      title: 'Research Paper Publication',
      image:
        'https://drive.google.com/uc?export=view&id=19lP3SutcAZhzFfnJ2z6QLgxKo3S8snqG',
    },
    {
      title: 'PowerBi Workshop',
      image:
        'https://drive.google.com/uc?export=view&id=1oNZcYjYxaXP7weSJDkcvmhWmZSxAFMV5',
    },
    {
      title: 'GDGC Web Tech Lead',
      image:
        'https://drive.google.com/uc?export=view&id=1AP99tXfYT6rR_hZYtFD0ENmCax_aXPi8',
    },
  ];

  return (
    <motion.section
      id="achievements"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-linear-to-b from-[#f9f6f1] via-[#f3e9dc] to-[#efe0cc] dark:from-[#18120f] dark:via-[#231a15] dark:to-[#32261f] px-6 py-20 before:absolute before:inset-0 before:opacity-5"
    >
      {/* 🔹 Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-16 text-center tracking-tight bg-linear-to-r from-[#5a4634] to-[#b2956b] dark:from-[#f5deb3] dark:to-[#e3c59a] bg-clip-text text-transparent"
      >
        Achievements & Certificates 🏆
      </motion.h1>

      {/* 📜 Split Layout — Two Balanced Columns */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-20 w-full max-w-7xl mx-auto">
        {/* LEFT — NxtWave Certificates */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center text-center px-2 overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#b8976b] dark:text-[#e3c59a]">
            NxtWave Certifications 💻
          </h2>

          <DraggableCardContainer className="relative flex min-h-[70vh] w-full max-w-[90vw] md:max-w-none items-center justify-center overflow-visible">
            <Image
              alt="NxtWave Logo"
              width={150}
              height={150}
              src="/assets/nxtwave.png"
            />

            {nxtwaveCerts.map((item, index) => {
              const rotation = (index - (nxtwaveCerts.length - 1) / 2) * 5;
              const zIndex = 10 + index;

              return (
                <DraggableCardBody
                  key={item.title}
                  className="absolute transition-transform duration-500 ease-out hover:scale-105"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                    className="group relative flex flex-col items-center justify-center bg-white/20 dark:bg-neutral-800/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 dark:border-neutral-700 hover:shadow-2xl hover:border-white/60 dark:hover:border-neutral-600"
                    style={{
                      transform: `rotate(${rotation}deg) translateY(${index * 10}px)`,
                      zIndex,
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={340}
                        height={240}
                        loading="lazy"
                        
                        className="rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 mb-3 text-center text-sm sm:text-base md:text-lg font-semibold text-neutral-800 dark:text-neutral-200 tracking-wide group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </motion.div>
                </DraggableCardBody>
              );
            })}
          </DraggableCardContainer>
        </div>

        {/* RIGHT — College Achievements */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center text-center px-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#b8976b] dark:text-[#e3c59a]">
            College Achievements 🎓
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {collegeCerts.map((cert) => (
              <motion.div
                key={cert.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-lg border-2 border-white/70 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/70"
              >
                <div className="relative w-full h-56 md:h-64">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300  py-3">
                  {cert.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Achievements;
