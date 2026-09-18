import Image from 'next/image';
import Link from 'next/link';
import { pressByLocale } from '@/data/press';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './PressGrid.module.css';

interface PressGridProps {
  locale: Locale;
  limit?: number;
}

export default function PressGrid({ locale, limit }: PressGridProps) {
  const all = pressByLocale[locale];
  const items = limit ? all.slice(0, limit) : all;
  const dict = getDictionary(locale);

  return (
    <div className={styles.grid}>
      {items.map((entry) => (
        <article key={entry.id} className={styles.card}>
          <Link href={`/${locale}/presse/${entry.slug}`} className={styles.thumbTrigger}>
            <div className={styles.thumb}>
              <Image src={entry.image} alt={entry.title} fill sizes="(max-width: 760px) 100vw, 50vw" className={styles.img} />
              <span className={styles.zoomHint}>{dict.press.readFull}</span>
            </div>
          </Link>

          <div className={styles.body}>
            <span className="eyebrow">{entry.tag}</span>
            <h3 className={styles.title}>{entry.title}</h3>
            <p className={styles.desc}>{entry.description}</p>
            <div className={styles.meta}>
              <span>{entry.outlet}, {entry.issue}</span>
              <span>{entry.date}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
