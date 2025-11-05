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
      title: 'AI & Machine Learning Certification',
      image:
        'https://drive.google.com/uc?export=view&id=1yrjSF3xPt0Rw9no7xFejS6u9DJwrOsYl',
      className: 'top-[8%] left-[5%] md:top-[10%] md:left-[15%] rotate-[-5deg]',
    },
    {
      title: 'Full Stack Web Development',
      image:
        'https://drive.google.com/uc?export=view&id=1pHse8hgEZQHkDoh1EmqH6ezQBc4f22B3',
      className:
        'top-[30%] left-[10%] md:top-[30%] md:left-[35%] rotate-[-7deg]',
    },
    {
      title: 'Data Science Workshop',
      image:
        'https://drive.google.com/uc?export=view&id=1wln-mQkv4hCQQwqNAPRkuFkaDdcvfJdL',
      className:
        'top-[15%] left-[40%] md:top-[12%] md:left-[50%] rotate-[6deg]',
    },
    {
      title: 'Hackathon Winner',
      image:
        'https://drive.google.com/uc?export=view&id=1yPkP5ip-1Oj1pp3RxMuHYvcmNc0zLfdW',
      className:
        'top-[42%] left-[55%] md:top-[40%] md:left-[60%] rotate-[8deg]',
    },
    {
      title: 'Masterclass Achievement',
      image:
        'https://drive.google.com/uc?export=view&id=1AaU6e8OwG7WZOfYVrScBP2nuLKvv3-pf',
      className:
        'top-[25%] right-[5%] md:top-[25%] md:right-[18%] rotate-[2deg]',
    },
  ];

  // 🏫 College Certificates (grid)
  const collegeCerts = [
    {
      title: 'Research Paper Publication',
      image:
        'https://drive.google.com/uc?export=view&id=111b58dVd3xVLjMiV4p735T-EUUpqmjko',
    },
    {
      title: 'Tech Symposium 2024',
      image:
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=3634&auto=format&fit=crop',
    },
    {
      title: 'Workshop on Cloud Computing',
      image:
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=3072&auto=format&fit=crop',
    },
    {
      title: 'HackFest Participation',
      image:
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop',
    },
  ];

  return (
    <motion.section
      id="achievements"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-linear-to-b from-[#f9f6f1] via-[#f3e9dc] to-[#efe0cc] dark:from-[#18120f] dark:via-[#231a15] dark:to-[#32261f] px-6 py-20"
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

      {/* 📜 Layout Split — Two Columns */}
      <div className="flex flex-col lg:flex-row gap-16 w-full max-w-7xl items-start justify-center">
        {/* LEFT — NxtWave Certificates */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#b8976b] dark:text-[#e3c59a]">
            NxtWave Certifications 💻
          </h2>
          <DraggableCardContainer className="relative flex min-h-[70vh] w-full items-center justify-center overflow-clip">
            <p className="absolute top-1/2 mx-auto max-w-xs -translate-y-3/4 text-center text-base md:text-lg font-semibold text-neutral-400 dark:text-neutral-700">
              Drag and explore my NxtWave highlights 🌟
            </p>
            {nxtwaveCerts.map((item) => (
              <DraggableCardBody key={item.title} className={item.className}>
                <div className="group relative flex flex-col items-center justify-center bg-white/20 dark:bg-neutral-800/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 dark:border-neutral-700 transition-all duration-500 hover:shadow-2xl hover:border-white/60 dark:hover:border-neutral-600">
                  {/* Image container - fits natural image size */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={380} // ✅ keeps the card the same size as image
                      height={240}
                      className="rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 mb-3 text-center text-base md:text-lg font-semibold text-neutral-800 dark:text-neutral-200 tracking-wide group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>

        {/* RIGHT — College Certificates */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
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
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 py-3">
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
