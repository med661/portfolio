// pages/_app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { TranslationProvider } from '@/contexts/translationContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfolio of Salah Sfar - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View projects, experience, and skills." />
      </Head>
      <TranslationProvider>
        <Component {...pageProps} />
      </TranslationProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
