import Link from 'next/link';
import { T } from '@/lib/LangContext';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import { getPayloadClient } from '@/lib/payload';

export default async function BrandsPage() {
  let brands = {};
  try {
    const payload = await getPayloadClient();
    brands = await payload.findGlobal({ slug: 'brands' });
  } catch {}

  const auriaImg = brands.auriaImage?.url || '/media/brand-auria.jpg';
  const loriaImg = brands.loriaImage?.url || '/media/brand-loria.jpg';
  const cs1Img = brands.comingSoon1Image?.url || '/media/brand-burger.jpg';
  const cs2Img = brands.comingSoon2Image?.url || '/media/brand-sandwich.jpg';

  return (
    <div>

      <PageHero
        eyebrow={{ en: 'THE PORTFOLIO', ar: 'المحفظة' }}
        heading={{ en: brands.heroHeading?.en || 'Distinct brands. One house.', ar: brands.heroHeading?.ar || 'علاماتٌ متمايزة. مظلّةٌ واحدة.' }}
        subtext={{ en: brands.introText?.en || 'Every brand carries its own identity — united by a shared commitment to quality and experience.', ar: brands.introText?.ar || 'تحمل كل علامة هويةً خاصة — يوحّدها التزامٌ مشترك بالجودة والتجربة.' }}
        image={auriaImg}
        height="72vh"
        overlayStart={0.48}
        overlayEnd={0.82}
      />

      {/* AURIA */}
      <section className="wrap" style={{ paddingTop: 'clamp(72px, 10vh, 110px)' }}>
        <Reveal>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            borderRadius: 4, overflow: 'hidden', background: '#3F0808', color: '#FDF2D6',
          }} className="gcol-2">
            <div style={{ position: 'relative', minHeight: 'clamp(340px,45vw,520px)' }}>
              <img src={auriaImg} alt="Auria" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 'clamp(44px,5vw,76px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, letterSpacing: '.2em', background: '#F7CCBA', color: '#3F0808', padding: '5px 12px', borderRadius: 30, fontWeight: 600 }}>
                  <T en="EXISTING" ar="قائمة" />
                </span>
                <span className="eyebrow" style={{ fontSize: 11, color: '#F7CCBA' }}><T en="FINE DINING · BISTRO" ar="مطعم راقٍ" /></span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(52px,7vw,100px)', margin: '20px 0 0', lineHeight: .9 }}>Auria</h2>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(18px,2vw,24px)', margin: '12px 0 0', color: '#F7CCBA' }}>
                <T en={brands.auriaTagline?.en || 'More than a pastry — it\'s an experience.'} ar={brands.auriaTagline?.ar || 'أكثر من حلوى — إنها تجربة.'} />
              </p>
              <p style={{ margin: '24px 0 0', fontSize: 16, lineHeight: 1.78, color: '#E9D6C8' }}>
                <T en={brands.auriaBody?.en || 'Where pastry meets artistry. Every creation is crafted with precision, elegance, and a deep respect for the craft. A brand of minimal sophistication — refined, modern, timeless.'} ar={brands.auriaBody?.ar || 'حيث تلتقي الحلويات بالفن. كل إبداعٍ مصنوعٌ بدقّةٍ وأناقة.'} />
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
                {['#FDF2D6','#F7CCBA','#FFB3A4','#C4C0A4'].map(c => (
                  <span key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />
                ))}
                <span className="eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', color: '#C9A99B', marginInlineStart: 10 }}>EST. 2025 · RIYADH</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* LORIA */}
      <section className="wrap" style={{ paddingTop: 24 }}>
        <Reveal delay={0.04}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            borderRadius: 4, overflow: 'hidden', background: '#21302B', color: '#E7EFE9',
          }} className="gcol-2">
            <div style={{ padding: 'clamp(44px,5vw,76px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, letterSpacing: '.2em', background: '#B6C9B2', color: '#21302B', padding: '5px 12px', borderRadius: 30, fontWeight: 600 }}>
                  <T en="EXISTING" ar="قائمة" />
                </span>
                <span className="eyebrow" style={{ fontSize: 11, color: '#B6C9B2' }}><T en="CLOUD KITCHEN" ar="مطبخ سحابي" /></span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(52px,7vw,100px)', margin: '20px 0 0', lineHeight: .9 }}>Loria</h2>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(18px,2vw,24px)', margin: '12px 0 0', color: '#B6C9B2' }}>
                <T en={brands.loriaTagline?.en || 'Crafted to be savored, wherever you are.'} ar={brands.loriaTagline?.ar || 'صُنعت لتُتذوّق أينما كنت.'} />
              </p>
              <p style={{ margin: '24px 0 0', fontSize: 16, lineHeight: 1.78, color: '#C9D6CD' }}>
                <T en={brands.loriaBody?.en || 'A delivery-first cloud kitchen serving premium pastries and light bites with the precision and elegance of fine craft — engineered for speed and reach without compromise on quality.'} ar={brands.loriaBody?.ar || 'مطبخٌ سحابي يركّز على التوصيل أولاً، يقدّم حلويات راقية بنفس دقّة وأناقة الطهي الفاخر.'} />
              </p>
            </div>
            <div style={{ position: 'relative', minHeight: 'clamp(340px,45vw,520px)' }}>
              <img src={loriaImg} alt="Loria" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Coming Soon */}
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 'clamp(64px, 10vh, 100px)' }}>
        <Reveal>
          <div className="eyebrow"><T en="COMING SOON" ar="قريباً" /></div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(28px, 3.6vw, 48px)', margin: '14px 0 40px', letterSpacing: '-.01em' }}>
            <T en="The portfolio is expanding." ar="المحفظة في توسّع." />
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="gcol-2">
          {[
            { img: cs1Img, en: 'Burger Concept', ar: 'مفهوم البرغر', den: 'Modern, crafted burgers — bold, precise, and distinctly Imtiyaz.', dar: 'برغر معاصر مصنوع بحِرفية.' },
            { img: cs2Img, en: 'Sandwich Concept', ar: 'مفهوم السندويتش', den: 'Elevated sandwiches that reimagine the everyday with curated ingredients.', dar: 'سندويتشات راقية تعيد تعريف المألوف بمكوّناتٍ مختارة.' },
          ].map((b, i) => (
            <Reveal key={b.en} delay={i * 0.08}>
              <div style={{ position: 'relative', aspectRatio: '16/11', overflow: 'hidden', borderRadius: 4 }}>
                <img src={b.img} alt={b.en} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.9)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.08),rgba(20,16,12,.85))' }} />
                <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#F4F0E8' }}>
                  <span style={{ alignSelf: 'flex-start', fontSize: 10, letterSpacing: '.2em', border: '1px solid rgba(244,240,232,.5)', padding: '5px 12px', borderRadius: 30, marginBottom: 14 }}>
                    <T en="COMING SOON" ar="قريباً" />
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(28px,3.2vw,42px)', margin: '0 0 6px', lineHeight: 1 }}>
                    <T en={b.en} ar={b.ar} />
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, color: '#D9D1C4', maxWidth: '36ch' }}>
                    <T en={b.den} ar={b.dar} />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 72, borderTop: '1px solid var(--hairline)', paddingTop: 48, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,38px)', lineHeight: 1.3, margin: '0 auto', maxWidth: '26ch' }}>
              <T en="Each new brand carries the unmistakable mark of Imtiyaz." ar="كل علامةٍ جديدة تحمل علامة امتياز." />
            </p>
            <div style={{ marginTop: 28 }}>
              <Link href="/vision" className="link-arrow"><T en="SEE OUR FUTURE VISION →" ar="اطّلع على رؤيتنا المستقبلية →" /></Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
