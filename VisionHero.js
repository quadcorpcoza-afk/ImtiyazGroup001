'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { T } from '@/lib/LangContext';

export default function VisionHero({ image, heading, body }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY   = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const lineW   = useTransform(scrollYProgress, [0, 0.4], ['0%', '100%']);

  return (
    <section
      ref={ref}
      style={{ position: 'relative', height: '100svh', minHeight: 680, overflow: 'hidden' }}
    >
      {/* Parallax image */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-14%', bottom: '-14%', left: 0, right: 0,
          y: imageY, scale: imageScale,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <img
          src={image}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
        />
      </motion.div>

      {/* Multi-stop cinematic overlay — strong dark at top for nav legibility, heavy at bottom for text */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(
            180deg,
            rgba(10,8,6,0.72) 0%,
            rgba(10,8,6,0.30) 32%,
            rgba(10,8,6,0.18) 52%,
            rgba(10,8,6,0.74) 72%,
            rgba(10,8,6,0.96) 100%
          )
        `,
      }} />

      {/* Left-side vignette so text always reads clean */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(10,8,6,0.55) 0%, transparent 55%)',
      }} />

      {/* Radial vignette edges */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(10,8,6,0.48) 100%)',
      }} />

      {/* Content — anchored bottom-left */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          y: contentY, opacity: contentOp,
        }}
      >
        <div className="wrap" style={{ paddingBottom: 'clamp(56px, 9vh, 96px)', color: '#F4F0E8' }}>

          {/* Eyebrow + animated rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, overflow: 'hidden' }}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 0.74, 0.18, 1] }}
              style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '.32em',
                color: '#E7B98C', textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}
            >
              <T en="FUTURE VISION" ar="رؤيتنا المستقبلية" />
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 0.74, 0.18, 1] }}
              style={{ height: 1, background: 'rgba(231,185,140,0.55)', flex: 1, transformOrigin: 'left' }}
            />
          </div>

          {/* Heading — shorter display size, italic elegance */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.3, ease: [0.16, 0.74, 0.18, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(30px, 3.8vw, 62px)',
              lineHeight: 1.1,
              maxWidth: '22ch',
              letterSpacing: '-.018em',
              color: '#F4F0E8',
              margin: 0,
            }}
          >
            <T
              en={heading?.en || 'From restaurants to a complete hospitality & lifestyle ecosystem.'}
              ar={heading?.ar   || 'من مطاعم إلى منظومةٍ متكاملة للضيافة ونمط الحياة.'}
            />
          </motion.h1>

          {/* Thin gold rule under heading */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 0.74, 0.18, 1] }}
            style={{
              width: 64, height: 2, background: 'var(--accent)',
              margin: '24px 0', transformOrigin: 'left',
            }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 0.74, 0.18, 1] }}
            style={{
              fontSize: 'clamp(15px, 1.35vw, 18px)',
              lineHeight: 1.76,
              color: '#C8BFB3',
              maxWidth: '54ch',
              margin: 0,
            }}
          >
            <T
              en={body?.en || 'Our vision extends far beyond operating restaurants — toward a complete ecosystem built around hospitality, travel, and experiences.'}
              ar={body?.ar   || 'رؤيتنا تمتد إلى ما هو أبعد من تشغيل المطاعم — نحو منظومةٍ كاملة مبنية حول الضيافة والسفر والتجارب.'}
            />
          </motion.p>

          {/* Year badge — decorative luxury detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginTop: 36, color: 'rgba(231,185,140,0.7)',
            }}
          >
            <div style={{ width: 20, height: 1, background: 'currentColor' }} />
            <span style={{ fontSize: 11, letterSpacing: '.25em', fontWeight: 500 }}>EST. 2025</span>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{
          position: 'absolute', bottom: 'clamp(28px, 4vh, 44px)',
          right: 'clamp(24px, 5vw, 64px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(244,240,232,0.4)',
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '.28em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'currentColor' }} />
      </motion.div>

      {/* Bottom page-bg fade */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(to bottom, transparent, var(--bg))',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
