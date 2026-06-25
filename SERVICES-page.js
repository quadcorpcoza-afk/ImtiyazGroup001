import Link from 'next/link';
import { T } from '@/lib/LangContext';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import { getPayloadClient } from '@/lib/payload';

const defaultCapabilities = [
  { n: '01', en: 'Restaurant Development & Operations', ar: 'تطوير المطاعم والتشغيل', den: 'From idea to opening — we develop concepts end-to-end, then standardize systems, training and service to sustain high performance across every location.', dar: 'نطلق المفاهيم من الفكرة إلى الافتتاح، ونوحّد الأنظمة والتدريب والخدمة.' },
  { n: '02', en: 'Hospitality Concepts', ar: 'مفاهيم الضيافة', den: 'We craft brands with distinct identity and story — from fine dining to contemporary cafés — each designed for a specific market and lifestyle.', dar: 'نصمّم علاماتٍ ذات هوية وروايةٍ متمايزة — من المطاعم الراقية إلى المقاهي المعاصرة.' },
  { n: '03', en: 'Cloud Kitchens', ar: 'المطابخ السحابية', den: 'Delivery-first operating models built for efficiency, speed and reach — letting brands scale beyond the limits of traditional footprints.', dar: 'نماذج تشغيلية تركّز على التوصيل أولاً، مبنية للكفاءة والسرعة والوصول.' },
  { n: '04', en: 'Future Expansions', ar: 'التوسّعات المستقبلية', den: 'Food trucks, catering, food manufacturing and more — new channels that extend our brands well beyond the table.', dar: 'عربات الطعام، خدمات الضيافة الخارجية، تصنيع الأغذية والمزيد.' },
];

export default async function ServicesPage() {
  let services = {};
  try {
    const payload = await getPayloadClient();
    services = await payload.findGlobal({ slug: 'services' });
  } catch {}

  const capabilities = services.capabilities?.length
    ? services.capabilities.map(c => ({ n: c.number, en: c.titleEn, ar: c.titleAr, den: c.descEn, dar: c.descAr }))
    : defaultCapabilities;

  const kitchenImageUrl = services.kitchenImage?.url || '/media/services-kitchen.jpg';

  return (
    <div>

      <PageHero
        eyebrow={{ en: 'WHAT WE DO', ar: 'ماذا نقدم' }}
        heading={{ en: services.heroHeading?.en || 'We build, operate, and scale hospitality.', ar: services.heroHeading?.ar || 'نبني ونُشغّل ونوسّع تجارب الضيافة.' }}
        subtext={{ en: services.introText?.en || 'Imtiyaz is the platform behind each brand — from first concept to daily operations and regional expansion.', ar: services.introText?.ar || 'امتياز هي المنصّة التي تقف خلف كل علامة.' }}
        image={kitchenImageUrl}
        height="72vh"
        overlayStart={0.55}
        overlayEnd={0.85}
      />

      {/* Capabilities list */}
      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 12vh, 130px)' }}>
        <Reveal>
          <div className="eyebrow"><T en="CAPABILITIES" ar="قدراتنا" /></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(30px, 3.8vw, 52px)', margin: '14px 0 52px', letterSpacing: '-.01em' }}>
            <T en="End-to-end hospitality expertise." ar="خبرة ضيافة متكاملة من البداية إلى النهاية." />
          </h2>
        </Reveal>
        {capabilities.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.06}>
            <div style={{
              display: 'grid', gridTemplateColumns: '88px 1fr 1fr', gap: 40,
              alignItems: 'start', padding: '40px 0', borderTop: '1px solid var(--hairline)',
            }} className="caps-row">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,38px)', color: 'var(--accent)', lineHeight: 1, fontWeight: 600 }}>{c.n}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(24px,2.6vw,34px)', margin: 0, lineHeight: 1.15 }}>
                <T en={c.en} ar={c.ar} />
              </h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)' }}>
                <T en={c.den} ar={c.dar} />
              </p>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: '1px solid var(--hairline)' }} />
      </section>

      {/* Closing image banner */}
      <section className="wrap" style={{ paddingBottom: 'clamp(72px, 10vh, 110px)' }}>
        <Reveal>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, minHeight: 'clamp(360px,45vw,520px)', display: 'flex', alignItems: 'center', color: '#F4F0E8' }}>
            <img src={kitchenImageUrl} alt="kitchen" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="zoom-hover" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(20,16,12,.92) 35%,rgba(20,16,12,.44) 100%)' }} />
            <div style={{ position: 'relative', padding: 'clamp(44px,6vw,88px)', maxWidth: 680 }}>
              <div className="eyebrow" style={{ color: 'var(--accent-sand)' }}><T en="THE HIERARCHY" ar="الهرمية" /></div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.8vw,52px)', lineHeight: 1.18, margin: '20px 0 0' }}>
                <T
                  en={services.closingQuote?.en || 'Group → Brands → Experiences. It\'s how we think, and how we grow.'}
                  ar={services.closingQuote?.ar || 'مجموعة ← علامات ← تجارب. هكذا نفكّر، وهكذا ننمو.'}
                />
              </p>
              <div style={{ marginTop: 36 }}>
                <Link href="/vision" className="btn btn-sand"><T en="SEE OUR VISION" ar="اطّلع على رؤيتنا" /></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
