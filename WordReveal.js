'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LangContext';

export default function WordReveal({ text, en, ar, className, style, delay = 0 }) {
  const { isAr } = useLang();
  // Support either text= (English only) or en=/ar= bilingual props
  const resolved = isAr && ar ? ar : (en || text || '');
  const words = resolved.split(' ');
  return (
    <span className={className} style={{ ...style, display: 'block' }} aria-label={resolved}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 0.74, 0.18, 1], delay: delay + i * 0.06 }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
