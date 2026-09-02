/* eslint-disable @next/next/no-page-custom-font -- App Router layout is the correct place for shared fonts */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import styles from './layout.module.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { profileByLocale } from '@/data/profile';
import { locales, isLocale } from '@/lib/i18n';
import { Locale } from '@/types/content';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'fr';
  const profile = profileByLocale[locale];
  return {
    title: `${profile.name} | ${profile.title}`,
    description: profile.lede,
    openGraph: {
      title: `${profile.name} | ${profile.title}`,
      description: profile.lede,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    alternates: {
      languages: { fr: '/fr', en: '/en' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader locale={locale} />
        <main className={styles.main}>{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
