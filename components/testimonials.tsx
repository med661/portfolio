import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslationContext } from '@/contexts/translationContext';

interface Testimonial {
  quoteKey: string;
  authorKey: string;
  roleKey: string;
  initials: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quoteKey: 'testimonials.item1Quote',
    authorKey: 'testimonials.item1Author',
    roleKey: 'testimonials.item1Role',
    initials: 'HA',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    quoteKey: 'testimonials.item2Quote',
    authorKey: 'testimonials.item2Author',
    roleKey: 'testimonials.item2Role',
    initials: 'RG',
    color: 'from-blue-500 to-cyan-400',
  },
];

export const Testimonials = () => {
  const { t } = useTranslationContext();
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(i => (i + 1) % TESTIMONIALS.length);

  const current = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-24 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950"
    >
      <div className="absolute inset-0 bg-blue-950 z-0" />
      <div className="container mx-auto px-6 z-10 relative max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white text-center"
        >
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
            {t('testimonials.title')}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-14"
        >
          {t('testimonials.subtitle')}
        </motion.p>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10 relative"
            >
              <FaQuoteLeft className="text-cyan-500/30 text-6xl absolute top-6 start-8" />

              <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 relative z-10 italic font-light pt-6">
                &ldquo;{t(current.quoteKey)}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {current.initials}
                </div>
                <div>
                  <p className="text-white font-semibold">{t(current.authorKey)}</p>
                  <p className="text-gray-400 text-sm">{t(current.roleKey)}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center"
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-cyan-500 w-6' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
