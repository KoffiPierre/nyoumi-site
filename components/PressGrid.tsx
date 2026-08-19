import Image from 'next/image';
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
  const letters = 'AB';

  return (
    <div className={styles.grid}>
      {items.map((entry, i) => (
        <article key={entry.id} className={styles.card}>
          <span className={styles.pj}>
            {dict.press.pj} · {letters[i] ?? i + 1}
          </span>
          <div className={styles.thumb}>
            <Image src={entry.image} alt={entry.title} fill sizes="(max-width: 760px) 100vw, 50vw" className={styles.img} />
          </div>
          <div className={styles.body}>
            <div className={`mono ${styles.id}`}>
              {dict.press.annex} {letters[i] ?? i + 1} — {entry.issue}
            </div>
            <h3 className={styles.title}>{entry.title}</h3>
            <p className={styles.desc}>{entry.description}</p>
            <div className={`mono ${styles.meta}`}>
              <span>{entry.outlet}</span>
              <span>{entry.date}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
