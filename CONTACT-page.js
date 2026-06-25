import { T } from '@/lib/LangContext';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { getPayloadClient } from '@/lib/payload';

export default async function ContactPage() {
  let contact = {};
  try {
    const payload = await getPayloadClient();
    contact = await payload.findGlobal({ slug: 'contact' });
  } catch {}

  const officeImageUrl = contact.officeImage?.url || '/media/contact-city.jpg';

  return (
    <div>

      <PageHero
        eyebrow={{ en: 'CONTACT', ar: 'تواصل معنا' }}
        heading={{ en: contact.heroHeading?.en || "Let's start a conversation.", ar: contact.heroHeading?.ar || 'لنبدأ حواراً.' }}
        subtext={{ en: 'Whether you\'re a partner, investor, or brand builder — we want to hear from you.', ar: 'سواء كنت شريكاً أو مستثمراً أو بانياً لعلامة — نريد أن نسمع منك.' }}
        image={officeImageUrl}
        height="65vh"
        overlayStart={0.5}
        overlayEnd={0.82}
        align="center"
      />

      <section className="wrap" style={{ paddingBlock: 'clamp(72px, 10vh, 110px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 72, alignItems: 'start' }} className="gcol-2">

          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 28 }}><T en="SEND A MESSAGE" ar="أرسل رسالة" /></div>
            <ContactForm />
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <div style={{ background: 'var(--ink-dark)', color: 'var(--text-on-dark)', borderRadius: 4, padding: 'clamp(36px,4vw,52px)', marginBottom: 24 }}>
                {[
                  { label: { en: 'EMAIL', ar: 'البريد الإلكتروني' }, value: contact.email || 'h.wehbe@imtiyazfoods.com' },
                  { label: { en: 'PHONE', ar: 'الهاتف' }, value: contact.phone || '+966 55 422 2655', ltr: true },
                  { label: { en: 'HEADQUARTERS', ar: 'المقر الرئيسي' }, value: null },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? 32 : 0 }}>
                    <div className="eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', color: 'var(--accent-sand)', marginBottom: 8 }}>
                      <T en={item.label.en} ar={item.label.ar} />
                    </div>
                    {item.value ? (
                      <div dir={item.ltr ? 'ltr' : undefined} style={{ fontSize: 16, lineHeight: 1.6, color: '#EDE7DC' }}>{item.value}</div>
                    ) : (
                      <div style={{ fontSize: 16, lineHeight: 1.65, color: '#EDE7DC' }}>
                        <T
                          en={contact.address?.en || 'Takhassusi Street, An Nakheel District, Riyadh, Kingdom of Saudi Arabia 12381'}
                          ar={contact.address?.ar || 'شارع التخصصي، حي النخيل، الرياض، المملكة العربية السعودية ١٢٣٨١'}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: 4 }}>
                <img src={officeImageUrl} alt="Riyadh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

    </div>
  );
}
