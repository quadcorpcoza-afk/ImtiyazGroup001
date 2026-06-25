import Link from 'next/link';
import { T } from '@/lib/LangContext';
import HeroZoom from '@/components/HeroZoom';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Marquee from '@/components/Marquee';
import { getPayloadClient } from '@/lib/payload';

const MARQUEE_ITEMS = [
  'Excellence', 'Innovation', 'Leadership', 'Authenticity',
  'Integrity', 'Hospitality', 'Vision', 'Craftsmanship',
];

export default async function HomePage() {
  let home = {};
  try {
    const payload = await getPayloadClient();
    home = await payload.findGlobal({ slug: 'home' });
  } catch {}

  const auriaImageUrl = home.auriaImage?.url || '/media/brand-auria.jpg';
  const loriaImageUrl = home.loriaImage?.url || '/media/brand-loria.jpg';

  return (
    <div>

      {/* ── 1. Cinematic parallax hero ── */}
      <HeroZoom content={home} />

      {/* ── 2. Stats strip ── */}
      <section style={{ background: '#1C1814', color: '#EDE7DC', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingBlock: 'clamp(52px, 8vh, 80px)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }} className="gcol-3">
            {[
              { to: 4, suffix: '+', label: { en: 'BRANDS IN MOTION', ar: 'علامات قيد البناء' }, delay: 0 },
              { to: 2025,  suffix: '', label: { en: 'EST. RIYADH', ar: 'تأسيس · الرياض' }, delay: 0.12 },
              { to: 100, suffix: '%', label: { en: 'HOSPITALITY FIRST', ar: 'الضيافة أولاً' }, delay: 0.24 },
            ].map((s, i) => (
              <Reveal key={i} delay={s.delay}>
                <div style={{
                  textAlign: 'center', padding: 'clamp(32px, 4vw, 56px) 24px',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,.10)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(52px, 7vw, 100px)', lineHeight: 1,
                    color: '#E7B98C', letterSpacing: '-.02em',
                  }}>
                    <CountUp to={s.to} suffix={s.suffix} delay={s.delay + 0.3} duration={2.2} />
                  </div>
                  <div className="eyebrow" style={{
                    fontSize: 10, letterSpacing: '.22em', color: 'rgba(237,231,220,.48)', marginTop: 14,
                  }}>
                    <T en={s.label.en} ar={s.label.ar} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Intro statement ── */}
      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 12vh, 140px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '.75fr 1.25fr', gap: 72, alignItems: 'start' }} className="gcol-2">
          <div>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 24 }}><T en="THE GROUP" ar="من نحن" /></div>
            </Reveal>
            <Reveal delay={0.06}>
              <div style={{ width: 48, height: 2, background: 'var(--accent)', marginBottom: 32 }} />
            </Reveal>
            <Reveal delay={0.12}>
              <Link href="/about" className="link-arrow" style={{ display: 'inline-flex' }}>
                <T en="OUR STORY →" ar="قصتنا →" />
              </Link>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 44px)',
                lineHeight: 1.3, margin: 0, letterSpacing: '-.01em',
              }}>
                <T
                  en={home.introStatement?.en || 'Imtiyaz is a visionary hospitality group dedicated to building a portfolio of innovative, high-performing restaurant brands. A group — not a single restaurant.'}
                  ar={home.introStatement?.ar || 'امتياز مجموعة ضيافة ذات رؤية، مكرّسة لبناء وإدارة محفظة من العلامات المطعمية المبتكرة — مجموعةٌ لا مطعماً واحداً.'}
                />
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ margin: '28px 0 0', fontSize: 17, lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: '58ch' }}>
                <T
                  en={home.introBody?.en || 'From refined fine dining to modern street food and delivery-first virtual kitchens, every brand under the Imtiyaz umbrella carries a distinct identity — united by a shared dedication to authenticity, elevated service, and operational excellence.'}
                  ar={home.introBody?.ar || 'من المطاعم الراقية إلى مفاهيم الطعام السريع الحديثة، تحمل كل علامة تحت مظلّة امتياز هوية مميّزة، يوحّدها التزامٌ مشترك بالأصالة ومعايير الخدمة الرفيعة والتميّز التشغيلي.'}
                />
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Brand values marquee ── */}
      <div style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', overflow: 'hidden' }}>
        <Marquee
          items={MARQUEE_ITEMS}
          speed={36}
          style={{
            paddingBlock: 18,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.6vw, 20px)',
            color: 'var(--text-muted)',
            letterSpacing: '.01em',
          }}
        />
      </div>

      {/* ── 5. Pillars — full-width dark with image bleed ── */}
      <section style={{ position: 'relative', background: 'var(--ink-dark)', color: 'var(--text-on-dark)', overflow: 'hidden' }}>
        {/* subtle background texture image at low opacity */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/media/vision-hero.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          opacity: 0.07,
        }} />
        <div className="wrap" style={{ position: 'relative', paddingBlock: 'clamp(80px, 12vh, 130px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'end', marginBottom: 64 }} className="gcol-2">
            <Reveal>
              <div className="eyebrow" style={{ color: 'var(--accent-sand)' }}>
                <T en="WHAT GUIDES US" ar="ما يوجّهنا" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.05, margin: '16px 0 0', letterSpacing: '-.01em' }}>
                <T en="Three principles. One direction." ar="ثلاثة مبادئ. اتجاهٌ واحد." />
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-on-dark-body)', margin: 0, maxWidth: '52ch' }}>
                <T
                  en="Every decision, every brand, every experience we create flows from the same foundational beliefs — built once, held always."
                  ar="كل قرار وكل علامة وكل تجربة نبنيها تنبثق من نفس المعتقدات التأسيسية."
                />
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 2, overflow: 'hidden' }} className="gcol-3">
            {[
              { n: '01', en: 'Excellence', ar: 'التميّز', den: 'The highest standards in everything we do — from food and service to leadership and innovation.', dar: 'أعلى المعايير في كل ما نقدّمه.' },
              { n: '02', en: 'Leadership by Example', ar: 'القيادة بالقدوة', den: 'We lead the industry with vision, discipline and purpose — setting benchmarks for others to follow.', dar: 'نقود الصناعة برؤية وانضباط وغاية.' },
              { n: '03', en: 'Innovation', ar: 'الابتكار', den: 'We embrace creativity, adapt to change and constantly evolve our concepts to stay ahead.', dar: 'نحتضن الإبداع ونتطوّر باستمرار.' },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <div style={{
                  background: 'rgba(28,24,20,0.9)', padding: 'clamp(36px, 4vw, 56px)',
                  height: '100%', position: 'relative', cursor: 'default',
                  transition: 'background 0.3s ease',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 5.5vw, 72px)',
                    fontWeight: 700, color: 'rgba(231,185,140,0.18)', lineHeight: 1,
                    position: 'absolute', top: 24, right: 28,
                  }}>{p.n}</div>
                  <div style={{ width: 36, height: 1, background: 'var(--accent)', marginBottom: 28 }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(22px, 2.2vw, 30px)', margin: '0 0 14px', lineHeight: 1.15 }}>
                    <T en={p.en} ar={p.ar} />
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-on-dark-body)', fontSize: 15, lineHeight: 1.75 }}>
                    <T en={p.den} ar={p.dar} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Brand snapshot — full-width cards ── */}
      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 12vh, 130px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
          <div>
            <Reveal><div className="eyebrow"><T en="THE PORTFOLIO" ar="المحفظة" /></div></Reveal>
            <Reveal delay={0.06}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(32px, 4.2vw, 58px)', margin: '14px 0 0', letterSpacing: '-.01em' }}>
                <T
                  en={home.brandsSectionHeading?.en || 'Brands under one house'}
                  ar={home.brandsSectionHeading?.ar || 'علاماتٌ تحت مظلّة واحدة'}
                />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/brands" className="link-arrow"><T en="VIEW ALL BRANDS →" ar="عرض كل العلامات →" /></Link>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="gcol-2">
          {[
            { img: auriaImageUrl, tag: 'EXISTING · FINE DINING', name: 'Auria', desc: { en: 'Where pastry meets artistry.', ar: 'حيث تلتقي الحلويات بالفن.' } },
            { img: loriaImageUrl, tag: 'EXISTING · CLOUD KITCHEN', name: 'Loria', desc: { en: 'Crafted to be savored, wherever you are.', ar: 'صُنعت لتُتذوّق أينما كنت.' } },
          ].map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1}>
              <div
                className="imgwrap"
                style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}
              >
                <img src={b.img} alt={b.name} className="zoom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(20,16,12,0) 30%,rgba(20,16,12,.88) 100%)' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(24px, 3vw, 40px)', color: '#F4F0E8' }}>
                  <div style={{ fontSize: 9, letterSpacing: '.22em', color: '#E7B98C', marginBottom: 8 }}>{b.tag}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, lineHeight: 1 }}>{b.name}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, marginTop: 8, color: '#D4C9BA' }}>
                    <T en={b.desc.en} ar={b.desc.ar} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 7. Pull quote strip ── */}
      <section style={{ background: 'var(--ink-dark)', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingBlock: 'clamp(64px, 10vh, 100px)', textAlign: 'center' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(22px, 3.2vw, 46px)', lineHeight: 1.3,
              color: '#EDE7DC', maxWidth: '22ch', margin: '0 auto',
              letterSpacing: '-.01em',
            }}>
              <T
                en='"We do not build restaurants — we build legacies."'
                ar='"نحن لا نبني مطاعم — نبني إرثاً."'
              />
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="eyebrow" style={{ color: 'var(--accent-sand)', marginTop: 28 }}>
              <T en="IMTIYAZ HOSPITALITY GROUP" ar="مجموعة امتياز للضيافة" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. CTA band ── */}
      <section className="wrap" style={{ paddingBlock: 'clamp(64px, 10vh, 110px)' }}>
        <Reveal>
          <div style={{
            background: 'var(--accent)', color: '#F7EFE4',
            borderRadius: 4, padding: 'clamp(48px, 7vw, 96px)', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* subtle grain */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0, opacity: 0.06,
              backgroundImage: 'url(/media/about-team.jpg)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              mixBlendMode: 'luminosity',
            }} />
            <div style={{ position: 'relative' }}>
              <div className="eyebrow" style={{ color: '#F2D9BF' }}><T en="BUILDING WHAT'S NEXT" ar="نبني المستقبل" /></div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(30px, 4.4vw, 58px)', lineHeight: 1.1,
                margin: '18px auto 0', maxWidth: '18ch',
              }}>
                <T
                  en={home.ctaHeading?.en || "Let's build the next chapter of hospitality together."}
                  ar={home.ctaHeading?.ar || 'لنبنِ الفصل القادم من الضيافة معاً.'}
                />
              </h2>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 38 }}>
                <Link href="/contact" className="btn btn-dark" style={{ cursor: 'pointer' }}>
                  <T en="GET IN TOUCH" ar="تواصل معنا" />
                </Link>
                <Link href="/vision" className="btn btn-outline-on-dark" style={{ cursor: 'pointer' }}>
                  <T en="OUR FUTURE VISION" ar="رؤيتنا المستقبلية" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
