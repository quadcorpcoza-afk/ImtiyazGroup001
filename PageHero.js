'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { T } from '@/lib/LangContext';

// Resolve a prop that can be either a string/JSX or { en, ar } object
function Txt({ v }) {
  if (!v) return null;
  if (typeof v === 'object' && v !== null && ('en' in v || 'ar' in v)) {
    return <T en={v.en || ''} ar={v.ar || ''} />;
  }
  return v;
}

/**
 * Cinematic full-bleed page hero — 21st.dev-inspired.
 * Used on all inner pages (About, Brands, Vision, Services, Contact).
 */
export default function PageHero({
  eyebrow,
  heading,
  subtext,
  image,
  height = '72vh',
  overlayStart = 0.45,
  overlayEnd   = 0.78,
  align = 'left',   // 'left' | 'center'
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const textOp  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const isCenter = align === 'center';

  return (
    <section
      ref={ref}
      style={{ position: 'relative', height, minHeight: 480, overflow: 'hidden' }}
    >
      {/* Parallax background */}
      <motion.div
        aria-hidden
        style={{ position: 'absolute', top: '-12%', bottom: '-12%', left: 0, right: 0, y: imageY, willChange: 'transform' }}
      >
        <img
          src={image}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>

      {/* Cinematic gradient overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg,
            rgba(20,16,12,${overlayStart}) 0%,
            rgba(20,16,12,${overlayStart * 0.5}) 30%,
            rgba(20,16,12,${overlayEnd * 0.85}) 65%,
            rgba(20,16,12,${overlayEnd}) 100%)`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          ...(isCenter && { alignItems: 'center', justifyContent: 'center', textAlign: 'center' }),
          y: textY, opacity: textOp,
        }}
      >
        <div
          className="wrap"
          style={{
            paddingBottom: isCenter ? 0 : 'clamp(52px, 9vh, 88px)',
            color: '#F4F0E8',
            width: '100%',
          }}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 0.74, 0.18, 1] }}
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '.34em',
                color: '#E7B98C', marginBottom: 18, textTransform: 'uppercase',
              }}
            >
              <Txt v={eyebrow} />
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 0.74, 0.18, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(36px, 5.5vw, 88px)',
              lineHeight: 1.02,
              maxWidth: isCenter ? '18ch' : '15ch',
              letterSpacing: '-.015em',
              color: '#F4F0E8',
              margin: isCenter ? '0 auto' : 0,
            }}
          >
            <Txt v={heading} />
          </motion.h1>

          {subtext && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 0.74, 0.18, 1] }}
              style={{
                maxWidth: '52ch',
                margin: '20px 0 0',
                ...(isCenter && { margin: '20px auto 0' }),
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 1.72,
                color: '#E4DCCF',
              }}
            >
              <Txt v={subtext} />
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Bottom fade to page bg */}
      <div
        aria-hidden
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
