import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { useTranslationContext } from '../contexts/translationContext';
import Link from 'next/link';
import { CONTACT_INFO } from '../constants/data';

const Footer: React.FC = () => {
  const { t } = useTranslationContext();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { name: 'GitHub',   icon: <FaGithub />,   url: CONTACT_INFO.github.href },
    { name: 'LinkedIn', icon: <FaLinkedin />,  url: CONTACT_INFO.linkedin.href },
    { name: 'Email',    icon: <FaEnvelope />,  url: CONTACT_INFO.email.href },
  ];

  const footerLinks = [
    {
      title: t('footer.navigation'),
      links: [
        { name: t('about'),      href: '#about' },
        { name: t('skills'),     href: '#skills' },
        { name: t('projects'),   href: '#projects' },
        { name: t('experience'), href: '#experience' },
      ],
    },
    {
      title: t('footer.more'),
      links: [
        { name: t('footer.achievements'), href: '#achievements' },
        { name: t('footer.education'),    href: '#education' },
        { name: t('footer.interests'),    href: '#interests' },
        { name: t('footer.contact'),      href: '#contact' },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 pt-16 pb-6">
      <div className="absolute inset-0 bg-blue-950 opacity-95 z-0" />
      {/* Top cyan separator line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent z-10" />

      {/* Back to top */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
        <motion.button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          aria-label="Back to top"
        >
          <FaArrowUp className="text-white" />
        </motion.button>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-300 bg-clip-text text-transparent">
                Salah Sfar
              </h2>
              <p className="text-gray-400 mb-6 max-w-md text-sm leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex gap-3">
                {socialLinks.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full glass-strong border border-white/10 hover:border-cyan-500/30 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{link.name}</span>
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Nav columns */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <motion.p
              className="text-gray-500 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {currentYear} Salah Sfar. {t('footer.rights')}
            </motion.p>
            <motion.p
              className="text-gray-500 text-xs flex items-center gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('footer.madeWith')} <FaHeart className="text-red-500" /> {t('footer.using')} Next.js & Tailwind CSS
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
