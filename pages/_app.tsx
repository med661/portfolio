// pages/_app.tsx
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { TranslationProvider } from '@/contexts/translationContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider>
      <Component {...pageProps} />
    </TranslationProvider>
  );
}

export default appWithTranslation(MyApp);
