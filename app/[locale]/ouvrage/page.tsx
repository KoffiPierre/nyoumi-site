import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import BookFeature from '@/components/BookFeature';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { publicationsByLocale } from '@/data/publications';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string }> = {
  fr: {
    label: 'Écrits',
    title: "Penser l'IA depuis l'Afrique.",
    lede: "Mathématicien, physicien et informaticien de formation — l'écriture comme prolongement de la recherche et de l'enseignement.",
    metaTitle: 'Ouvrage & publications',
    metaDesc: "L'ouvrage de Dieudonné Nyoumi Mballa sur l'intelligence artificielle, et ses articles techniques.",
  },
  en: {
    label: 'Writing',
    title: 'Thinking AI from Africa.',
    lede: 'A mathematician, physicist and computer scientist by training — writing as an extension of research and teaching.',
    metaTitle: 'Book & publications',
    metaDesc: "Dieudonné Nyoumi Mballa's book on artificial intelligence, and his technical articles.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${c.metaTitle} — ${profile.name}`, description: c.metaDesc };
}

export default async function OuvragePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const publications = publicationsByLocale[locale];

  return (
    <>
      <Section>
        <PageHeader index="05" label={c.label} title={c.title} lede={c.lede} />
      </Section>

      {publications.map((pub, i) => (
        <Section key={pub.id} background={i % 2 === 0 ? 'paper' : 'dim'}>
          <Reveal>
            {i === 0 ? (
              <BookFeature publication={pub} locale={locale} />
            ) : (
              <div className={styles.articleCard}>
                <span className="folio">{pub.kind}</span>
                <h2 className={styles.articleTitle}>{pub.title}</h2>
                {pub.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className={styles.articleBody}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </Reveal>
        </Section>
      ))}
    </>
  );
}
