'use client';
import { motion } from 'framer-motion';

export default function Marquee({ items = [], speed = 38, reverse = false, style = {} }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', display: 'flex', ...style }}>
      <motion.div
        style={{ display: 'flex', gap: 0, flexShrink: 0, width: 'max-content' }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 0, whiteSpace: 'nowrap', paddingInlineEnd: 56 }}
          >
            <span>{item}</span>
            <span style={{
              display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
              background: 'var(--accent)', margin: '0 28px 0 0', flexShrink: 0,
            }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
