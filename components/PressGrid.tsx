import Image from 'next/image';
import Link from 'next/link';
import { PressArticle, formatDay } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './PressGrid.module.css';

export default function PressGrid({ articles, locale }: { articles: PressArticle[]; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className={styles.grid}>
      {articles.map((a) => (
        <Link key={a.slug} href={`/${locale}/presse/${a.slug}`} className={styles.card}>
          <div className={styles.thumb}>
            {a.image && <Image src={a.image} alt={a.title} fill sizes="(max-width: 760px) 100vw, 260px" className={styles.img} />}
          </div>
          <div className={styles.body}>
            <span className={styles.meta}>
              {a.outlet}
              {a.issue && ` · ${a.issue}`}
              {a.date && ` · ${formatDay(a.date, locale)}`}
            </span>
            {a.tag && <span className={styles.tag}>{a.tag}</span>}
            <h3 className={styles.title}>{a.title}</h3>
            <p className={styles.desc}>{a.summary}</p>
            <span className={styles.read}>{dict.press.read} →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
