'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function CountUp({ to, suffix = '', prefix = '', duration = 2.0, delay = 0, decimals = 0 }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [val, setVal]   = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const timer = setTimeout(() => {
      let start = null;
      const tick = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setVal(parseFloat((eased * to).toFixed(decimals)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [inView, to, duration, delay, decimals]);

  return <span ref={ref}>{prefix}{decimals ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}
