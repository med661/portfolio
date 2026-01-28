import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { useTranslationContext } from '../contexts/translationContext';
import Link from 'next/link';
import { CONTACT_INFO } from '../constants/data';

const Footer: React.FC = () => {
  const { t } = useTranslationContext();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: CONTACT_INFO.github.href
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: CONTACT_INFO.linkedin.href
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: CONTACT_INFO.email.href
    }
  ];

  const footerLinks = [
    {
      title: t('footer.navigation'),
      links: [
        { name: t('about'), href: '#about' },
        { name: t('skills'), href: '#skills' },
        { name: t('projects'), href: '#projects' },
        { name: t('experience'), href: '#experience' }
      ]
    },
    {
      title: t('footer.more'),
      links: [
        { name: t('footer.achievements'), href: '#achievements' },
        { name: t('footer.education'), href: '#education' },
        { name: t('footer.interests'), href: '#interests' },
        { name: t('footer.contact'), href: '#contact' }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black pt-16 pb-6">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"></div>
      
      {/* Back to top button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <motion.button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <FaArrowUp className="text-white" />
        </motion.button>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Salah Sfar</h2>
              <p className="text-gray-400 mb-6 max-w-md">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{link.name}</span>
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
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

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-500 text-sm mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              © {currentYear} Salah Sfar. {t('footer.rights')}
            </motion.p>
            <motion.p 
              className="text-gray-500 text-sm flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('footer.madeWith')} <FaHeart className="text-red-500 mx-1" /> {t('footer.using')} Next.js & Tailwind CSS
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
