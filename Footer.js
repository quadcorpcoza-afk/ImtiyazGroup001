'use client';
import Link from 'next/link';
import { useLang, T } from '@/lib/LangContext';

export default function Footer() {
  const { isAr } = useLang();
  return (
    <footer style={{ background: 'var(--ink-dark)', color: 'var(--text-on-dark)', padding: '84px 0 40px' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48, alignItems: 'start' }} className="gcol-3">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600 }}>Imtiyaz</div>
            <div className="eyebrow" style={{ fontSize: 10, letterSpacing: '.34em', color: 'var(--accent)', fontWeight: 600, marginTop: 4 }}>
              <T en="HOSPITALITY GROUP" ar="مجموعة الضيافة" />
            </div>
            <p style={{ maxWidth: 340, margin: '22px 0 0', color: 'var(--text-on-dark-body)', fontSize: 15, lineHeight: 1.7 }}>
              <T
                en="A Saudi hospitality group building and managing a portfolio of innovative, high-performing restaurant brands."
                ar="مجموعة ضيافة سعودية تبني وتدير محفظة من العلامات المطعمية المبتكرة عالية الأداء."
              />
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ fontSize: 11, letterSpacing: '.2em', color: 'var(--text-on-dark-body)', marginBottom: 18 }}>
              <T en="EXPLORE" ar="استكشف" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#D9D1C4' }}>
              {[
                { href: '/about', en: 'About Us', ar: 'من نحن' },
                { href: '/services', en: 'What We Do', ar: 'ماذا نقدم' },
                { href: '/brands', en: 'Brands', ar: 'علاماتنا' },
                { href: '/vision', en: 'Future Vision', ar: 'رؤيتنا' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ cursor: 'pointer' }}>{isAr ? l.ar : l.en}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ fontSize: 11, letterSpacing: '.2em', color: 'var(--text-on-dark-body)', marginBottom: 18 }}>
              <T en="CONTACT" ar="تواصل" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#D9D1C4' }}>
              <span>h.wehbe@imtiyazfoods.com</span>
              <span dir="ltr">+966 55 422 2655</span>
              <span>
                <T en="Takhassusi Street, An Nakheel, Riyadh" ar="شارع التخصصي، حي النخيل، الرياض" />
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, color: '#7E7569', fontSize: 12, letterSpacing: '.04em' }}>
          <span><T en="© 2026 Imtiyaz Hospitality Group. All rights reserved." ar="© ٢٠٢٦ مجموعة امتياز للضيافة. جميع الحقوق محفوظة." /></span>
          <span><T en="Riyadh, Kingdom of Saudi Arabia" ar="الرياض، المملكة العربية السعودية" /></span>
        </div>
      </div>
    </footer>
  );
}
