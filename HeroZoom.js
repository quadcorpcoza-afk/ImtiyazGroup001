'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { T, useLang } from '@/lib/LangContext';

export default function HeroZoom({ content = {} }) {
  const sectionRef = useRef(null);
  const { isAr } = useLang();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: background moves up at 28% of scroll — creates depth
  const imageY      = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  // Overlay deepens as user scrolls down
  const overlayOp   = useTransform(scrollYProgress, [0, 0.7], [0.5, 0.82]);
  // Content lifts and fades as the hero scrolls away
  const contentY    = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const contentOp   = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  // Scroll cue vanishes as soon as user starts scrolling
  const scrollCueOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: 560,
        overflow: 'hidden',
      }}
    >
      {/* ── Parallax background image ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          /* extend ±15% so parallax shift never exposes background colour */
          top: '-15%',
          bottom: '-15%',
          left: 0,
          right: 0,
          y: imageY,
          willChange: 'transform',
        }}
      >
        <img
          src={content.heroImage?.url || '/media/hero-home.jpg'}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>

      {/* ── Cinematic gradient vignette ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg,' +
            'rgba(20,16,12,0.26) 0%,' +
            'rgba(20,16,12,0.04) 34%,' +
            'rgba(20,16,12,0.82) 72%,' +
            'rgba(20,16,12,1.00) 100%)',
          opacity: overlayOp,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          y: contentY,
          opacity: contentOp,
        }}
      >
        <div
          className="wrap"
          style={{ paddingBottom: 'clamp(52px, 10vh, 96px)', color: '#F4F0E8', width: '100%' }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 0.74, 0.18, 1] }}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.34em',
              color: '#E7B98C',
              marginBottom: 18,
              textTransform: 'uppercase',
            }}
          >
            <T en="HOSPITALITY GROUP · RIYADH" ar="مجموعة ضيافة · الرياض" />
          </motion.div>

          {/* Main heading — animate directly (whileInView fails inside overflow:hidden) */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.28, ease: [0.16, 0.74, 0.18, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(38px, 6.5vw, 104px)',
              lineHeight: 0.98,
              maxWidth: '14ch',
              letterSpacing: '-.01em',
              color: '#F4F0E8',
              margin: 0,
            }}
          >
            {isAr
              ? (content.heroHeading?.ar || 'بيتٌ من العلامات يُعيد تعريف الضيافة.')
              : (content.heroHeading?.en || 'A house of brands redefining hospitality.')}
          </motion.h1>

          {/* Subtext — hidden on smallest screens to avoid crowding */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 0.74, 0.18, 1] }}
            style={{
              maxWidth: '52ch',
              margin: '22px 0 0',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              lineHeight: 1.72,
              color: '#E4DCCF',
            }}
          >
            {isAr
              ? (content.heroSubtext?.ar ||
                  'تبني امتياز وتدير محفظة من المفاهيم المطعمية المميزة.')
              : (content.heroSubtext?.en ||
                  'Imtiyaz builds and operates a portfolio of distinctive restaurant concepts — united by excellence, design, and an obsession with experience.')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 0.74, 0.18, 1] }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}
          >
            <Link href="/brands" className="btn btn-light" style={{ cursor: 'pointer' }}>
              <T en="EXPLORE THE BRANDS" ar="استكشف العلامات" />
            </Link>
            <Link href="/about" className="btn btn-outline-light" style={{ cursor: 'pointer' }}>
              <T en="OUR STORY" ar="قصة المجموعة" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          x: '-50%',
          opacity: scrollCueOp,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(244,240,232,0.55)',
          fontSize: 9,
          letterSpacing: '.22em',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>
          <T en="Scroll" ar="مرر" />
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 34, background: 'rgba(244,240,232,0.35)' }}
        />
      </motion.div>
    </section>
  );
}
