import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { formatDay, getPosts, getProfile } from '@/lib/content';
import { publicationsByLocale } from '@/data/publications';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy = {
  fr: {
    label: 'Publications',
    title: "Penser l'IA depuis l'Afrique.",
    lede: "Un ouvrage, des articles techniques et des réflexions : l'écriture comme prolongement de la recherche, de l'enseignement et de la formation.",
    metaDesc: "L'ouvrage de Dieudonné Nyoumi Mballa sur l'intelligence artificielle, ses articles techniques et ses réflexions.",
    postsLabel: 'Articles & réflexions',
  },
  en: {
    label: 'Publications',
    title: 'Thinking AI from Africa.',
    lede: 'A book, technical articles and reflections: writing as an extension of research, teaching and training.',
    metaDesc: "Dieudonné Nyoumi Mballa's book on artificial intelligence, his technical articles and reflections.",
    postsLabel: 'Articles & reflections',
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: `${copy[locale].label} | ${getProfile(locale).name}`, description: copy[locale].metaDesc };
}

export default async function PublicationsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const dict = getDictionary(locale);
  const [book, ...articles] = publicationsByLocale[locale];
  const posts = getPosts(locale);

  return (
    <>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />

      <Section id="ouvrage">
        <div className={styles.book}>
          <Reveal>
            <div className={styles.cover}>
              <Image src="/images/livre-couverture.jpg" alt={book.title} width={1344} height={1520} sizes="(max-width: 860px) 80vw, 420px" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">{book.kind}</span>
              <h2 className={styles.bookTitle}>{book.title}</h2>
              <dl className={styles.bookMeta}>
                <div>
                  <dt>{dict.book.author}</dt>
                  <dd>{book.author}</dd>
                </div>
                <div>
                  <dt>{dict.book.language}</dt>
                  <dd>{dict.book.languageValue}</dd>
                </div>
              </dl>
              {book.description.map((p) => (
                <p key={p.slice(0, 24)} className={styles.para}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {(articles.length > 0 || posts.length > 0) && (
        <Section background="alt">
          <span className="eyebrow">{c.postsLabel}</span>
          <div className={styles.list}>
            {posts.map((post) => (
              <Reveal key={post.slug}>
                <Link href={`/${locale}/publications/${post.slug}`} className={styles.card}>
                  {post.image && (
                    <div className={styles.cardImg}>
                      <Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 280px" />
                    </div>
                  )}
                  <div>
                    <span className={styles.kind}>{formatDay(post.date, locale)}</span>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    {post.summary && <p className={styles.cardText}>{post.summary}</p>}
                    <span className={styles.more}>{dict.publications.readMore} →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
            {articles.map((a) => (
              <Reveal key={a.id}>
                <article className={styles.card}>
                  <div>
                    <span className={styles.kind}>{a.kind}</span>
                    <h3 className={styles.cardTitle}>{a.title}</h3>
                    {a.description.map((p) => (
                      <p key={p.slice(0, 24)} className={styles.cardText}>
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
