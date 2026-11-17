import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import Markdown from '@/components/Markdown';
import PhotoGallery from '@/components/PhotoGallery';
import VideoList from '@/components/VideoList';
import ActivityCard from '@/components/ActivityCard';
import { categoryLabels, formatMonth, getActivities, getActivity, getProfile } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { locales } from '@/lib/i18n';
import { Locale } from '@/types/content';
import styles from './page.module.css';

export function generateStaticParams() {
  return locales.flatMap((locale) => getActivities(locale).map((a) => ({ locale, slug: a.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = getActivity(slug, locale);
  const name = getProfile(locale).name;
  if (!a) return { title: name };
  return {
    title: `${a.title} | ${name}`,
    description: a.summary,
    openGraph: { title: a.title, description: a.summary, images: a.cover ? [{ url: a.cover }] : undefined },
  };
}

export default async function ActivityPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const a = getActivity(slug, locale);
  if (!a) notFound();
  const dict = getDictionary(locale);
  const d = dict.activities;
  const others = getActivities(locale)
    .filter((o) => o.slug !== a.slug)
    .slice(0, 3);
  const when = a.period || formatMonth(a.date, locale);

  return (
    <>
      <header className={`${styles.hero} ${a.cover && a.coverInBanner ? '' : styles.plain} on-dark`}>
        {a.cover && a.coverInBanner && <Image src={a.cover} alt="" fill priority sizes="100vw" className={styles.heroImg} style={{ objectPosition: a.coverPosition }} />}
        {a.cover && a.coverInBanner && <div className={styles.heroShade} />}
        <div className={`wrap ${styles.heroInner}`}>
          <Link href={`/${locale}/activites`} className={styles.back}>
            {d.back}
          </Link>
          <span className={styles.badge}>{categoryLabels[locale][a.category]}</span>
          <h1 className={styles.title}>{a.title}</h1>
          <dl className={styles.facts}>
            {when && (
              <div>
                <dt>{d.date}</dt>
                <dd>{when}</dd>
              </div>
            )}
            {a.location && (
              <div>
                <dt>{d.place}</dt>
                <dd>{a.location}</dd>
              </div>
            )}
            {a.partner && (
              <div>
                <dt>{d.partner}</dt>
                <dd>{a.partner}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      {(a.summary || a.body) && (
        <Section tight>
          <div className={styles.text}>
            {a.summary && <p className={styles.summary}>{a.summary}</p>}
            {a.body && a.body !== a.summary && <Markdown text={a.body} />}
          </div>
        </Section>
      )}

      {a.photos.length > 0 && (
        <Section background="alt" tight>
          <span className="eyebrow">
            {d.gallery} · {a.photos.length}
          </span>
          <PhotoGallery photos={a.photos} labels={dict.lightbox} />
        </Section>
      )}

      {a.videos.length > 0 && (
        <Section tight>
          <span className="eyebrow">{d.videoSection}</span>
          <VideoList videos={a.videos} />
        </Section>
      )}

      {others.length > 0 && (
        <Section background="white" tight>
          <h2 className={styles.othersTitle}>{d.other}</h2>
          <div className={styles.others}>
            {others.map((o) => (
              <ActivityCard key={o.slug} activity={o} locale={locale} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
