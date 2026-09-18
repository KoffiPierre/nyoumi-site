import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import { pressByLocale } from '@/data/press';
import { profileByLocale } from '@/data/profile';
import { locales } from '@/lib/i18n';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const backLabel: Record<Locale, string> = {
  fr: '← Retour à la presse',
  en: '← Back to press',
};

export function generateStaticParams() {
  return locales.flatMap((locale) => pressByLocale[locale].map((entry) => ({ locale, slug: entry.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const profile = profileByLocale[locale];
  const entry = pressByLocale[locale].find((e) => e.slug === slug);
  if (!entry) return { title: profile.name };
  return { title: `${profile.name} | ${entry.title}`, description: entry.description };
}

export default async function PressArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const entry = pressByLocale[locale].find((e) => e.slug === slug);
  if (!entry) notFound();

  return (
    <Section>
      <Link href={`/${locale}/presse`} className={styles.back}>
        {backLabel[locale]}
      </Link>

      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            src={entry.image}
            alt={entry.title}
            width={entry.imageWidth}
            height={entry.imageHeight}
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.body}>
          <span className="eyebrow">{entry.tag}</span>
          <h1 className={styles.title}>{entry.title}</h1>
          <p className={styles.desc}>{entry.description}</p>
          <div className={styles.meta}>
            <span>{entry.outlet}, {entry.issue}</span>
            <span>{entry.date}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
