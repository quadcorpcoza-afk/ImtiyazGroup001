import Link from 'next/link';
import { T } from '@/lib/LangContext';
import Reveal from '@/components/Reveal';
import VisionHero from '@/components/VisionHero';
import CountUp from '@/components/CountUp';
import { getPayloadClient } from '@/lib/payload';

const defaultProjects = [
  { n: '01', en: 'Gelato Franchise', ar: 'امتياز الجيلاتو', den: 'Authentic Italian gelato — artisanal production, seasonal flavors and elegant branding through a franchising model.', dar: 'جيلاتو إيطالي أصيل بإنتاجٍ حِرفي ونكهاتٍ موسمية.' },
  { n: '02', en: 'Global Street Food', ar: 'مفهوم الطعام العالمي', den: 'A casual brand celebrating global flavors reimagined with high-end presentation — social, shareable, dynamic.', dar: 'علامة كاجوال تحتفي بالنكهات العالمية بعرضٍ راقٍ.' },
  { n: '03', en: 'Fine Dining Concept', ar: 'مفهوم المطعم الراقي', den: 'A signature destination bringing world-class chefs and locally inspired ingredients to immersive experiences.', dar: 'وجهة فاخرة تجمع طهاةً عالميين بمكوّنات محلية.' },
  { n: '04', en: 'Catering & Food Manufacturing', ar: 'التموين والتصنيع الغذائي', den: 'High-quality ready and semi-prepared products for restaurants, hotels and catering — new wholesale revenue channels.', dar: 'منتجات جاهزة وشبه جاهزة للمطاعم والفنادق والتموين.' },
  { n: '05', en: 'Travel Agency', ar: 'وكالة السفر', den: 'A travel & lifestyle agency offering curated experiences and bespoke itineraries — a journey of taste and discovery.', dar: 'وكالة سفر ونمط حياة تقدّم تجارب مختارة ورحلاتٍ مخصّصة.' },
  { n: '06', en: 'Hotels & Lodging', ar: 'الفنادق والإقامة', den: 'Boutique hotels translating our hospitality DNA into immersive stays — comfort, design, and gastronomy as one.', dar: 'فنادق بوتيك تترجم حمضنا النووي في الضيافة إلى إقاماتٍ غامرة.' },
];

export default async function VisionPage() {
  let vision = {};
  try {
    const payload = await getPayloadClient();
    vision = await payload.findGlobal({ slug: 'vision' });
  } catch {}

  const heroImageUrl = vision.heroImage?.url || '/media/vision-hero.jpg';
  const projects = vision.projects?.length
    ? vision.projects.map(p => ({ n: p.number, en: p.titleEn, ar: p.titleAr, den: p.descEn, dar: p.descAr }))
    : defaultProjects;

  return (
    <div>

      <VisionHero
        image={heroImageUrl}
        heading={vision.heroHeading}
        body={vision.heroBody}
      />

      {/* Vision intro strip */}
      <section style={{ background: 'var(--ink-dark)', color: 'var(--text-on-dark)', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingBlock: 'clamp(64px, 10vh, 90px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }} className="gcol-3">
            {[
              { to: 10, suffix: '+', label: { en: 'BRANDS PLANNED', ar: 'علامات مخطّطة' }, delay: 0 },
              { to: 5, suffix: ' YRS', label: { en: 'HORIZON', ar: 'أفق التنفيذ' }, delay: 0.1 },
              { to: 3, suffix: '', label: { en: 'SECTORS', ar: 'قطاعات' }, delay: 0.2 },
            ].map((s, i) => (
              <Reveal key={i} delay={s.delay}>
                <div style={{
                  textAlign: 'center', padding: 'clamp(32px, 4vw, 52px) 24px',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,.1)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(48px,6.5vw,88px)', lineHeight: 1, color: '#E7B98C' }}>
                    <CountUp to={s.to} suffix={s.suffix} delay={s.delay + 0.3} duration={2} />
                  </div>
                  <div className="eyebrow" style={{ fontSize: 10, letterSpacing: '.22em', color: 'rgba(237,231,220,.44)', marginTop: 12 }}>
                    <T en={s.label.en} ar={s.label.ar} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 12vh, 130px)' }}>
        <Reveal>
          <div className="eyebrow"><T en="THE ROADMAP" ar="خارطة الطريق" /></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(30px, 3.8vw, 52px)', margin: '14px 0 48px', letterSpacing: '-.01em' }}>
            <T en="What's coming next." ar="ما هو قادم." />
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="gcol-3">
          {projects.map((p, i) => (
            <Reveal key={p.n} delay={(i % 3) * 0.07}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(33,28,23,.1)', borderRadius: 4, padding: 'clamp(32px,3.5vw,44px)', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 16, right: 20,
                  fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700,
                  color: 'rgba(158,91,45,.08)', lineHeight: 1,
                }}>{p.n}</div>
                <div style={{ width: 32, height: 1, background: 'var(--accent)', marginBottom: 20 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(22px,2.2vw,28px)', margin: '0 0 12px', lineHeight: 1.15 }}>
                  <T en={p.en} ar={p.ar} />
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.72, color: 'var(--text-muted)' }}>
                  <T en={p.den} ar={p.dar} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section style={{ background: 'var(--ink-dark)', color: 'var(--text-on-dark)', overflow: 'hidden', position: 'relative' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: `url(/media/vision-hero.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 60%', opacity: 0.12 }} />
        <div className="wrap" style={{ position: 'relative', paddingBlock: 'clamp(72px,10vh,110px)', textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(24px,3.4vw,50px)', lineHeight: 1.28, margin: '0 auto', maxWidth: '24ch' }}>
              <T
                en={vision.closingStatement?.en || 'Our strategy is guided by innovation, scalability, and a deep respect for culture and quality.'}
                ar={vision.closingStatement?.ar || 'استراتيجيتنا يقودها الابتكار والقابلية للتوسّع واحترامٌ عميق للثقافة والجودة.'}
              />
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ marginTop: 40 }}>
              <Link href="/contact" className="btn btn-primary"><T en="PARTNER WITH US" ar="كن شريكنا" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
