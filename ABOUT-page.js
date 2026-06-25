import Link from 'next/link';
import { T } from '@/lib/LangContext';
import Reveal from '@/components/Reveal';
import WordReveal from '@/components/WordReveal';
import PageHero from '@/components/PageHero';
import { getPayloadClient } from '@/lib/payload';

export default async function AboutPage() {
  let about = {};
  try {
    const payload = await getPayloadClient();
    about = await payload.findGlobal({ slug: 'about' });
  } catch {}

  const teamPhotoUrl = about.teamPhoto?.url || '/media/about-team.jpg';

  return (
    <div>

      <PageHero
        eyebrow={{ en: 'ABOUT IMTIYAZ', ar: 'عن امتياز' }}
        heading={{ en: 'More than a group. A philosophy.', ar: 'أكثر من مجموعة. فلسفة.' }}
        subtext={{ en: 'Built from a belief that hospitality is not a business — it\'s a calling.', ar: 'بُنيت من إيمانٍ بأن الضيافة ليست تجارة — إنها رسالة.' }}
        image={teamPhotoUrl}
        height="72vh"
        overlayStart={0.52}
        overlayEnd={0.82}
      />

      {/* Intro — two column */}
      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 12vh, 130px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 80, alignItems: 'start' }} className="gcol-2">
          <div>
            <Reveal>
              <div className="eyebrow"><T en="OUR STORY" ar="قصتنا" /></div>
            </Reveal>
            <Reveal delay={0.06}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.2vw, 46px)', lineHeight: 1.28, margin: '18px 0 0', letterSpacing: '-.01em' }}>
                <T
                  en={about.missionStatement?.en || 'To build a portfolio of distinct, high-performing brands that redefine the dining and lifestyle experience across the Kingdom and beyond.'}
                  ar={about.missionStatement?.ar || 'بناء محفظة من العلامات المتمايزة ذات الأداء العالي التي تُعيد تعريف تجربة الطعام ونمط الحياة في المملكة وخارجها.'}
                />
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.08}>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--text-muted)', margin: 0 }}>
                <T
                  en={about.storyBody?.en || 'Imtiyaz was founded in Riyadh in 2025 with a clear belief: the region deserves a world-class hospitality group — one that builds, manages, and scales restaurant brands with the discipline of an investment firm and the passion of a chef. From day one, we have approached each concept as a brand builder, not just an operator. Every decision — from the name of a dish to the lighting of a dining room — is made in service of an experience worth returning to.'}
                  ar={about.storyBody?.ar || 'تأسّست امتياز في الرياض عام ٢٠٢٥ بقناعةٍ واضحة: تستحق المنطقة مجموعة ضيافة عالمية المستوى — تبني علامات مطاعم وتديرها وتوسّعها بانضباط شركة استثمار وشغف طاهٍ محترف.'}
                />
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--text-muted)', margin: '20px 0 0' }}>
                <T
                  en={about.storyBody2?.en || 'We are a group — not a single restaurant. That distinction is everything. It means we think in systems, in portfolios, in long-term brand equity. It means we build culture, instill excellence, and create pathways for talent to grow.'}
                  ar={about.storyBody2?.ar || 'نحن مجموعةٌ — لا مطعمٌ واحد. هذا الفرق هو كل شيء. نفكّر في أنظمة، في محافظ، في قيمةٍ علامية طويلة الأمد.'}
                />
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team photo full-bleed */}
      <Reveal>
        <div style={{ position: 'relative', aspectRatio: '21/9', overflow: 'hidden' }} className="full-bleed-wrap">
          <img src={teamPhotoUrl} alt="Imtiyaz Team" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(20,16,12,0) 40%,rgba(20,16,12,.7) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 'clamp(24px,4vw,48px)', left: 'clamp(24px,6vw,88px)' }}>
            <div className="eyebrow" style={{ color: 'var(--accent-sand)' }}>EST. 2025 · RIYADH</div>
          </div>
        </div>
      </Reveal>

      {/* Mission / Vision dark */}
      <section style={{ background: 'var(--ink-dark)', color: 'var(--text-on-dark)', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingBlock: 'clamp(80px, 12vh, 120px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }} className="gcol-2">
            {[
              { label: { en: 'MISSION', ar: 'المهمة' }, body: { en: about.missionStatement?.en || 'To build an exceptional hospitality group that elevates dining experiences, empowers people, and creates brands that stand the test of time.', ar: about.missionStatement?.ar || 'بناء مجموعة ضيافة استثنائية ترفع من مستوى تجارب الطعام وتُمكّن الناس وتبني علاماتٍ تصمد أمام اختبار الزمن.' }, delay: 0 },
              { label: { en: 'VISION', ar: 'الرؤية' }, body: { en: about.visionStatement?.en || 'To become the leading multi-brand hospitality group in the Kingdom — known for innovation, consistency, and a portfolio of experiences people love.', ar: about.visionStatement?.ar || 'أن نصبح مجموعة الضيافة متعددة العلامات الرائدة في المملكة، معروفةً بالابتكار والاتساق ومحفظةٍ من التجارب التي يحبّها الناس.' }, delay: 0.08 },
            ].map(s => (
              <Reveal key={s.label.en} delay={s.delay}>
                <div>
                  <div style={{ width: 40, height: 2, background: 'var(--accent)', marginBottom: 24 }} />
                  <div className="eyebrow" style={{ color: 'var(--accent-sand)', marginBottom: 18 }}><T en={s.label.en} ar={s.label.ar} /></div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.4vw, 34px)', lineHeight: 1.35, margin: 0 }}>
                    <T en={s.body.en} ar={s.body.ar} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 12vh, 130px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 52 }}>
          <Reveal>
            <div className="eyebrow"><T en="CORE VALUES" ar="القيم الجوهرية" /></div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(30px, 3.8vw, 52px)', margin: '14px 0 0', letterSpacing: '-.01em' }}>
              <T en="What we live by." ar="ما نعيش عليه." />
            </h2>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--hairline)', border: '1px solid var(--hairline)', borderRadius: 3, overflow: 'hidden' }} className="gcol-3">
          {[
            { en: 'Excellence', ar: 'التميّز', den: 'We set the standard and then exceed it — every day, in every detail.', dar: 'نضع المعيار ثم نتجاوزه — كل يوم وفي كل تفصيلة.' },
            { en: 'Integrity', ar: 'النزاهة', den: 'We do what we say. Honesty and accountability are non-negotiable.', dar: 'نفعل ما نقوله. الصدق والمساءلة غير قابلَين للتفاوض.' },
            { en: 'Innovation', ar: 'الابتكار', den: 'We challenge the status quo and embrace creative thinking at every level.', dar: 'نتحدى الوضع الراهن ونتبنّى التفكير الإبداعي على كل المستويات.' },
            { en: 'Hospitality', ar: 'الضيافة', den: 'Warmth and care for every guest is the heart of everything we do.', dar: 'الدفء والاهتمام بكل ضيف هو قلب كل ما نقوم به.' },
            { en: 'Leadership', ar: 'القيادة', den: 'We lead our industry with vision, discipline and purpose.', dar: 'نقود صناعتنا برؤية وانضباط وغاية.' },
            { en: 'Growth', ar: 'النمو', den: 'We invest in our people and our brands because growth compounds.', dar: 'نستثمر في أفراد علامتنا لأن النمو يتراكم.' },
          ].map((v, i) => (
            <Reveal key={v.en} delay={(i % 3) * 0.07}>
              <div style={{ background: 'var(--bg)', padding: 'clamp(30px, 3.5vw, 46px)', height: '100%' }}>
                <div style={{ width: 28, height: 1, background: 'var(--accent)', marginBottom: 20 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(22px, 2.2vw, 28px)', margin: '0 0 12px' }}>
                  <T en={v.en} ar={v.ar} />
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  <T en={v.den} ar={v.dar} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* IMTIYAZ acronym */}
      <section style={{ background: 'var(--ink-dark)', color: 'var(--text-on-dark)' }}>
        <div className="wrap" style={{ paddingBlock: 'clamp(72px, 10vh, 110px)' }}>
          <Reveal>
            <div className="eyebrow" style={{ color: 'var(--accent-sand)', marginBottom: 40 }}><T en="THE NAME" ar="الاسم" /></div>
          </Reveal>
          <div style={{ display: 'grid', gap: 0 }}>
            {[
              { letter: 'I', en: 'Innovation', ar: 'ابتكار' },
              { letter: 'M', en: 'Mastery', ar: 'إتقان' },
              { letter: 'T', en: 'Tradition', ar: 'تراث' },
              { letter: 'I', en: 'Integrity', ar: 'نزاهة' },
              { letter: 'Y', en: 'Yield', ar: 'عطاء' },
              { letter: 'A', en: 'Authenticity', ar: 'أصالة' },
              { letter: 'Z', en: 'Zenith', ar: 'ذُروة' },
            ].map((row, i) => (
              <Reveal key={i} delay={i * 0.045}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr 1fr',
                  padding: '22px 0', borderTop: '1px solid rgba(255,255,255,.08)',
                  gap: 24, alignItems: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(44px,5.5vw,72px)', color: 'var(--accent)', lineHeight: 1 }}>
                    {row.letter}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(22px, 2.4vw, 32px)' }}>
                    <T en={row.en} ar={row.ar} />
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,.08)' }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap" style={{ paddingBlock: 'clamp(64px, 10vh, 100px)', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.28, margin: '0 auto', maxWidth: '24ch' }}>
            <T en="Interested in what we're building? Let's connect." ar="هل تهتم بما نبنيه؟ لنتواصل." />
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary"><T en="GET IN TOUCH" ar="تواصل معنا" /></Link>
            <Link href="/vision" className="btn btn-ghost"><T en="OUR VISION →" ar="رؤيتنا →" /></Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
