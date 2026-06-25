'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, T } from '@/lib/LangContext';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [barScale, setBarScale] = useState(0);
  const { toggle, isAr } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 18);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setBarScale(h > 0 ? Math.min(1, y / h) : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setNavOpen(false); }, [pathname]);

  const links = [
    { href: '/about', en: 'About', ar: 'من نحن' },
    { href: '/services', en: 'What We Do', ar: 'ماذا نقدم' },
    { href: '/brands', en: 'Brands', ar: 'علاماتنا' },
    { href: '/vision', en: 'Vision', ar: 'رؤيتنا' },
    { href: '/contact', en: 'Contact', ar: 'تواصل' },
  ];

  // When not scrolled the nav floats over a dark hero image — use light colours.
  // Once scrolled, the frosted-beige background appears and we switch to dark ink.
  const onHero = !scrolled;
  const logoColor   = onHero ? '#F4F0E8' : 'var(--ink)';
  const subColor    = onHero ? '#E7B98C' : 'var(--accent)';
  const linkColor   = onHero ? 'rgba(244,240,232,0.88)' : 'var(--ink)';
  const dividerClr  = onHero ? 'rgba(244,240,232,0.28)' : 'rgba(33,28,23,0.2)';
  const langColor   = onHero ? '#E7B98C' : 'var(--accent)';
  const burgerClr   = onHero ? 'rgba(244,240,232,0.6)' : 'rgba(33,28,23,0.25)';
  const burgerIcon  = onHero ? '#F4F0E8' : 'var(--ink)';

  return (
    <>
      {/* Scroll progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2,
        background: 'var(--accent)', transformOrigin: '0 50%',
        transform: `scaleX(${barScale})`, zIndex: 60,
        transition: 'transform 0.12s linear', pointerEvents: 'none'
      }} />

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(242,238,230,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(140%) blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(33,28,23,0.10)' : '1px solid transparent',
        transition: 'background 0.45s ease, border-color 0.45s ease',
      }}>
        {/* Top scrim — ensures nav is always readable over hero images */}
        {onHero && (
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 110,
            background: 'linear-gradient(180deg, rgba(10,8,6,0.52) 0%, transparent 100%)',
            pointerEvents: 'none', zIndex: -1,
          }} />
        )}

        <div className="wrap" style={{ height: 'var(--nav-h)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26,
              letterSpacing: '.01em', color: logoColor,
              transition: 'color 0.4s ease',
            }}>Imtiyaz</span>
            <span className="eyebrow" style={{
              fontSize: 9, letterSpacing: '.34em', marginTop: 3,
              color: subColor, fontWeight: 600,
              transition: 'color 0.4s ease',
            }}>
              <T en="HOSPITALITY GROUP" ar="مجموعة الضيافة" />
            </span>
          </Link>

          {/* Desktop links */}
          <div className="desk-only" style={{ display: 'flex', alignItems: 'center', gap: 38 }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} className="navlink" style={{
                fontSize: 13, letterSpacing: '.06em', cursor: 'pointer',
                color: linkColor, transition: 'color 0.4s ease',
              }}>
                {isAr ? l.ar : l.en}
              </Link>
            ))}
            <span style={{ width: 1, height: 18, background: dividerClr, transition: 'background 0.4s ease' }} />
            <button onClick={toggle} style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontSize: 12, letterSpacing: '.12em', fontWeight: 600,
              color: langColor, fontFamily: 'var(--font-body)',
              transition: 'color 0.4s ease',
            }}>
              {isAr ? 'EN' : 'العربية'}
            </button>
          </div>

          {/* Burger */}
          <button onClick={() => setNavOpen(o => !o)} className="mob-show" style={{
            display: 'none', width: 42, height: 42, alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${burgerClr}`, borderRadius: '50%',
            background: 'none', cursor: 'pointer',
            fontSize: 18, color: burgerIcon,
            transition: 'border-color 0.4s ease, color 0.4s ease',
          }}>≡</button>
        </div>

        {/* Mobile panel */}
        {navOpen && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 18, padding: '18px 32px 36px',
            background: 'rgba(242,238,230,0.98)', backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(33,28,23,0.1)'
          }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font-display)', fontSize: 30, cursor: 'pointer' }}>
                {isAr ? l.ar : l.en}
              </Link>
            ))}
            <button onClick={toggle} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 13, letterSpacing: '.14em', fontWeight: 600, color: 'var(--accent)', textAlign: 'start', fontFamily: 'var(--font-body)', marginTop: 8 }}>
              {isAr ? 'EN' : 'العربية'}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
