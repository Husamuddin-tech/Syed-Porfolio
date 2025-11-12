'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/stateful-button';

const PDFViewer = dynamic(() => import('./PDFViewer'), { ssr: false });

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

const RC = () => {
  // ---- Download Logic ----
  const handleDownload = async () => {
    // Simulate download time (1.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const link = document.createElement('a');
    link.href = '/Syed-resume.pdf';
    link.download = 'Syed_Husamuddin_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-linear-to-br from-[#F7EDE2] via-[#FAF6F0] to-[#F0E1CF] dark:from-[#18120F] dark:via-[#231A15] dark:to-[#32261F] text-neutral-900 dark:text-[#FDF8F3]"
    >
      {/* Heading */}
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold mb-10 text-center tracking-tight bg-linear-to-r from-[#5a4634] to-[#b2956b] dark:from-[#f5deb3] dark:to-[#e3c59a] bg-clip-text text-transparent"
      >
        My Resume / CV
      </motion.h1>

      {/* PDF Viewer Card */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full max-w-3xl backdrop-blur-xl bg-white/70 dark:bg-[#2a211b]/90 border border-[#e5d6c3]/60 dark:border-[#3d3a36]/60 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_45px_rgba(210,180,140,0.4)] dark:hover:shadow-[0_0_35px_rgba(255,235,205,0.15)] hover:-translate-y-1.5"
      >
        <div className="overflow-hidden rounded-2xl border border-[#e8dcc9]/50 dark:border-[#3b312a]/50">
          <PDFViewer fileUrl="/Syed-resume.pdf" />
        </div>

        <div className="text-center py-4 text-sm text-neutral-600 dark:text-neutral-400">
          Having trouble viewing the file? Use the button below to download
          directly.
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 relative group"
      >
        {/* Glow Border */}
        <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-[#d2b48c] to-[#b8976b] dark:from-[#e3c59a] dark:to-[#c7a66a] opacity-70 blur-md group-hover:opacity-100 transition duration-500" />

        {/* Stateful Animated Button */}
        <Button
          aria-label="Download Syed Husamuddin Resume PDF"
          onClick={handleDownload}
          className="relative flex flex-col items-center justify-center px-10 py-4 rounded-3xl bg-linear-to-r from-[#d2b48c] to-[#b8976b] dark:from-[#e3c59a] dark:to-[#c7a66a] text-white dark:text-[#1e130b] font-semibold text-base shadow-lg hover:scale-105 active:scale-95 hover:shadow-[0_0_35px_rgba(210,180,140,0.5)] dark:hover:shadow-[0_0_25px_rgba(255,235,205,0.2)] transition-all duration-300 overflow-hidden group"
        >
          {/* Main Label */}
          <motion.span
            layout
            className="tracking-wide flex items-center gap-2 text-lg"
            whileHover={{ y: -1 }}
            transition={{ type: 'spring', stiffness: 250 }}
          >
            Download Resume
          </motion.span>

          {/* Sub Label — now always visible */}
          <motion.p
            className="text-xs mt-1 font-medium text-white/90 dark:text-[#1e130b]/90 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Double Click
          </motion.p>

          {/* Glow Background */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#e4cfa9]/25 via-transparent to-[#b68c57]/25 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </Button>
      </motion.div>
    </section>
  );
};

export default RC;
