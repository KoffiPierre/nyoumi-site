import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import { ideasByLocale } from '@/data/ideas';
import { profileByLocale } from '@/data/profile';
import { getDictionary } from '@/lib/dictionary';
import { locales } from '@/lib/i18n';
import { Locale } from '@/types/content';
import styles from './page.module.css';

export function generateStaticParams() {
  return locales.flatMap((locale) => ideasByLocale[locale].map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const profile = profileByLocale[locale];
  const post = ideasByLocale[locale].find((p) => p.slug === slug);
  if (!post) return { title: profile.name };
  return { title: `${profile.name} | ${post.title}`, description: post.excerpt };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = ideasByLocale[locale].find((p) => p.slug === slug);
  if (!post) notFound();
  const dict = getDictionary(locale);

  return (
    <Section>
      <Link href={`/${locale}/publications`} className={styles.back}>
        {dict.publications.back}
      </Link>

      <article className={styles.article}>
        <span className={styles.date}>
          {dict.publications.publishedOn} {post.date}
        </span>
        <h1 className={styles.title}>{post.title}</h1>
        {post.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </article>
    </Section>
  );
}
