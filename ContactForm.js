'use client';
import { useState } from 'react';
import { T, useLang } from '@/lib/LangContext';

const fieldStyle = {
  width: '100%', marginTop: 8, padding: '14px 0',
  background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(33,28,23,.25)',
  fontSize: 16, fontFamily: 'inherit', color: 'var(--ink)', outline: 'none',
};

export default function ContactForm({ content = {} }) {
  const [sent, setSent] = useState(false);
  const { isAr } = useLang();

  if (sent) {
    return (
      <div style={{ background: 'var(--ink-dark)', color: 'var(--text-on-dark)', borderRadius: 4, padding: 'clamp(40px,5vw,64px)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--accent-sand)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 36, margin: '14px 0 10px' }}>
          <T en="Thank you for reaching out." ar="شكراً لتواصلك." />
        </h2>
        <p style={{ margin: 0, color: 'var(--text-on-dark-body)', fontSize: 16, lineHeight: 1.7 }}>
          <T en="Your message has been received. The Imtiyaz team will be in touch shortly." ar="تم استلام رسالتك. سيعود إليك فريق امتياز قريباً." />
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="gcol-2">
        <label style={{ display: 'block' }}>
          <span style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--text-muted)', fontWeight: 600 }}><T en="NAME" ar="الاسم" /></span>
          <input type="text" required style={fieldStyle} />
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--text-muted)', fontWeight: 600 }}><T en="EMAIL" ar="البريد الإلكتروني" /></span>
          <input type="email" required style={fieldStyle} />
        </label>
      </div>
      <label style={{ display: 'block', marginTop: 28 }}>
        <span style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--text-muted)', fontWeight: 600 }}><T en="ORGANIZATION" ar="الجهة / الشركة" /></span>
        <input type="text" style={fieldStyle} />
      </label>
      <label style={{ display: 'block', marginTop: 28 }}>
        <span style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--text-muted)', fontWeight: 600 }}><T en="INQUIRY" ar="نوع الاستفسار" /></span>
        <select style={{ ...fieldStyle, cursor: 'pointer' }}>
          <option>{isAr ? 'استثمار / شراكة' : 'Investment / Partnership'}</option>
          <option>{isAr ? 'إعلام وصحافة' : 'Media & Press'}</option>
          <option>{isAr ? 'وظائف ومواهب' : 'Careers & Talent'}</option>
          <option>{isAr ? 'استفسار عام' : 'General Enquiry'}</option>
        </select>
      </label>
      <label style={{ display: 'block', marginTop: 28 }}>
        <span style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--text-muted)', fontWeight: 600 }}><T en="MESSAGE" ar="رسالتك" /></span>
        <textarea rows={4} style={{ ...fieldStyle, resize: 'vertical' }} />
      </label>
      <button type="submit" className="btn btn-dark" style={{ marginTop: 36 }}>
        <T en="SEND MESSAGE" ar="إرسال الرسالة" />
      </button>
    </form>
  );
}
