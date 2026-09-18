import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { ideasByLocale } from '@/data/ideas';
import { profileByLocale } from '@/data/profile';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string }> = {
  fr: {
    label: 'Publications',
    title: 'Idées et réflexions.',
    lede: "Des textes courts, publiés au fil de la recherche, de l'ingénierie et des formations.",
    metaTitle: 'Publications',
    metaDesc: "Réflexions et idées de Dieudonné Nyoumi Mballa sur l'intelligence artificielle, les systèmes énergétiques et la formation.",
  },
  en: {
    label: 'Publications',
    title: 'Ideas and reflections.',
    lede: 'Short pieces, published as research, engineering and training work progresses.',
    metaTitle: 'Publications',
    metaDesc: "Reflections and ideas from Dieudonné Nyoumi Mballa on artificial intelligence, energy systems and executive training.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${profile.name} | ${c.metaTitle}`, description: c.metaDesc };
}

export default async function PublicationsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const posts = ideasByLocale[locale];
  const dict = getDictionary(locale);

  return (
    <Section>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />

      <div className={styles.list}>
        {posts.map((post) => (
          <Reveal key={post.id}>
            <Link href={`/${locale}/publications/${post.slug}`} className={styles.card}>
              <span className={styles.date}>{post.date}</span>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <span className={styles.readMore}>{dict.publications.readMore} →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
