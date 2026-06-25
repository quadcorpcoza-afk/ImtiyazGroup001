'use client';
import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, style, className, as: Tag = 'div' }) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.05, ease: [0.16, 0.74, 0.18, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
