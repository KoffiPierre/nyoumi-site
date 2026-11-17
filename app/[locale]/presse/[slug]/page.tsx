import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import { formatDay, getPress, getProfile } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { locales } from '@/lib/i18n';
import { Locale } from '@/types/content';
import styles from './page.module.css';

export function generateStaticParams() {
  return locales.flatMap((locale) => getPress(locale).map((p) => ({ locale, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const name = getProfile(locale).name;
  const entry = getPress(locale).find((e) => e.slug === slug);
  if (!entry) return { title: name };
  return { title: `${entry.title} | ${name}`, description: entry.summary };
}

export default async function PressArticlePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const entry = getPress(locale).find((e) => e.slug === slug);
  if (!entry) notFound();
  const dict = getDictionary(locale);

  return (
    <Section>
      <Link href={`/${locale}/presse`} className={styles.back}>
        {dict.press.back}
      </Link>

      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          {entry.image && (
            <a href={entry.image} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element -- full newspaper scan, natural size */}
              <img src={entry.image} alt={entry.title} className={styles.image} />
            </a>
          )}
        </div>

        <div className={styles.body}>
          {entry.tag && <span className="eyebrow">{entry.tag}</span>}
          <h1 className={styles.title}>{entry.title}</h1>
          <p className={styles.desc}>{entry.summary}</p>
          <dl className={styles.meta}>
            <div>
              <dt>{locale === 'fr' ? 'Publication' : 'Outlet'}</dt>
              <dd>
                {entry.outlet}
                {entry.issue && `, ${entry.issue}`}
              </dd>
            </div>
            {entry.date && (
              <div>
                <dt>Date</dt>
                <dd>{formatDay(entry.date, locale)}</dd>
              </div>
            )}
          </dl>
          {entry.link && (
            <a href={entry.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {dict.press.original} ↗
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
