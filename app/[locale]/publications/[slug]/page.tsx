import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import Markdown from '@/components/Markdown';
import { formatDay, getPosts, getProfile } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { locales } from '@/lib/i18n';
import { Locale } from '@/types/content';
import styles from './page.module.css';

export function generateStaticParams() {
  const params = locales.flatMap((locale) => getPosts(locale).map((p) => ({ locale, slug: p.slug })));
  // Next needs at least one param for a static export of this route.
  return params.length ? params : [{ locale: 'fr', slug: '_' }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const name = getProfile(locale).name;
  const post = getPosts(locale).find((p) => p.slug === slug);
  if (!post) return { title: name };
  return { title: `${post.title} | ${name}`, description: post.summary };
}

export default async function PostPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPosts(locale).find((p) => p.slug === slug);
  if (!post) notFound();
  const dict = getDictionary(locale);

  return (
    <Section>
      <article className={styles.article}>
        <Link href={`/${locale}/publications`} className={styles.back}>
          {dict.publications.back}
        </Link>
        <span className={styles.date}>{formatDay(post.date, locale)}</span>
        <h1 className={styles.title}>{post.title}</h1>
        {post.summary && <p className={styles.summary}>{post.summary}</p>}
        {post.image && (
          <div className={styles.image}>
            <Image src={post.image} alt="" width={1400} height={900} sizes="(max-width: 800px) 100vw, 760px" />
          </div>
        )}
        <Markdown text={post.body} />
      </article>
    </Section>
  );
}
