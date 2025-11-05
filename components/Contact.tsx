'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import {
  IconBrandGmail,
  IconBrandLinkedin,
  IconBrandX,
  IconMapPin,
} from '@tabler/icons-react';
import { Send } from 'lucide-react';

const variantsFade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    try {
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        PUBLIC_KEY
      );

      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 2500);
    } catch (error) {
      console.error('Email send error:', error);
      alert('Something went wrong. Please try again later.');
      setSent(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-linear-to-br from-[#F7EDE2] via-[#FAF6F0] to-[#F0E1CF] dark:from-[#18120F] dark:via-[#231A15] dark:to-[#32261F] text-neutral-900 dark:text-[#FDF8F3]"
    >
      {/* Heading */}
      <motion.h2
        variants={variantsFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold mb-10 text-center bg-linear-to-r from-[#5a4634] to-[#b2956b] dark:from-[#f5deb3] dark:to-[#e3c59a] bg-clip-text text-transparent tracking-tight"
      >
        Let’s Connect
      </motion.h2>

      {/* Container */}
      <motion.div
        variants={variantsFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl bg-white/70 dark:bg-[#2a211b]/90 backdrop-blur-xl border border-[#e5d6c3]/60 dark:border-[#3d3a36]/60 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden hover:shadow-[0_0_45px_rgba(210,180,140,0.4)] dark:hover:shadow-[0_0_35px_rgba(255,235,205,0.15)] hover:-translate-y-1 transition-all duration-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <motion.div
            variants={variantsFade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="flex flex-col justify-center gap-6 p-8 md:p-10 bg-linear-to-br from-[#f6eee0] to-[#f0e1cf] dark:from-[#1f1814] dark:to-[#2b221c] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
          >
            <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Whether it’s a collaboration, hiring opportunity, or just a
              friendly hello — feel free to reach out!
            </p>

            <div className="flex flex-col gap-5 text-sm">
              {[
                {
                  Icon: IconBrandGmail,
                  text: 'techmubbu@gmail.com',
                  link: 'mailto:techmubbu@gmail.com',
                },
                {
                  Icon: IconBrandLinkedin,
                  text: 'LinkedIn Profile',
                  link: 'https://www.linkedin.com/in/syed-husamuddin/',
                },
                {
                  Icon: IconBrandX,
                  text: '@SyedHusamuddin8',
                  link: 'https://x.com/SyedHusamuddin8',
                },
                {
                  Icon: IconMapPin,
                  text: 'Hyderabad, India',
                  link: null,
                },
              ].map(({ Icon, text, link }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-[#f0e1cf]/50 dark:bg-[#3a2e25]/70 group-hover:bg-[#b8976b]/20 transition-all">
                    <Icon className="w-5 h-5 text-[#b8976b] group-hover:text-[#a67c52] transition-colors" />
                  </div>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#b8976b] transition-colors text-sm md:text-base"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm md:text-base">{text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={variantsFade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="p-8 md:p-10 flex flex-col gap-5 bg-white/60 dark:bg-transparent"
          >
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e5d6c3]/60 dark:border-[#3d3a36]/60 focus:ring-2 focus:ring-[#b8976b] outline-none bg-transparent text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e5d6c3]/60 dark:border-[#3d3a36]/60 focus:ring-2 focus:ring-[#b8976b] outline-none bg-transparent text-sm"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e5d6c3]/60 dark:border-[#3d3a36]/60 focus:ring-2 focus:ring-[#b8976b] outline-none bg-transparent text-sm resize-none"
            />
            <motion.button
              whileHover={!sent ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              disabled={sent}
              type="submit"
              aria-label="Send Message"
              className={`relative flex items-center justify-center gap-2 px-8 py-3 rounded-3xl font-semibold text-base shadow-md transition-all duration-300 
                ${
                  sent
                    ? 'bg-[#c0aa84] cursor-not-allowed'
                    : 'bg-linear-to-r from-[#d2b48c] to-[#b8976b] dark:from-[#e3c59a] dark:to-[#c7a66a] hover:shadow-[0_0_35px_rgba(210,180,140,0.5)]'
                }
                text-white dark:text-[#1e130b]`}
            >
              <motion.div
                animate={sent ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
              {sent ? 'Message Sent!' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
