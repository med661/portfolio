// contexts/translationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface TranslationContextType {
  t: (key: string) => string;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => void;
  };
  changeLanguage: (lang: string) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    const { pathname, asPath, query } = router;
    const [pathWithoutHash] = asPath.split('#');
    router.push(
      { pathname, query },
      pathWithoutHash,
      { locale: lang }
    );
  };

  const value = {
    t,
    i18n,
    changeLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};

