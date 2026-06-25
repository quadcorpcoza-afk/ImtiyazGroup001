'use client';
import { createContext, useContext, useState } from 'react';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const isAr = lang === 'ar';

  const toggle = () => setLang(l => l === 'en' ? 'ar' : 'en');

  // Keep <html> lang/dir in sync with selected language
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  }

  return (
    <LangContext.Provider value={{ lang, toggle, isAr }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function T({ en, ar }) {
  const { isAr } = useLang();
  return isAr ? ar : en;
}
