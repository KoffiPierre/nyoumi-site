import { timelineByLocale } from '@/data/timeline';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './Timeline.module.css';

interface TimelineProps {
  locale: Locale;
  limit?: number;
}

const LETTERS = 'ABCDEFGHIJ'.split('');

export default function Timeline({ locale, limit }: TimelineProps) {
  const all = timelineByLocale[locale];
  const items = limit ? all.slice(0, limit) : all;
  const dict = getDictionary(locale);

  return (
    <div className={styles.revlog}>
      <div className={`${styles.row} ${styles.head}`}>
        <div className={styles.cell}>{dict.revlog.rev}</div>
        <div className={styles.cell}>{dict.revlog.period}</div>
        <div className={styles.cell}>{dict.revlog.title}</div>
        <div className={styles.cell}>{dict.revlog.org}</div>
      </div>
      {items.map((entry, i) => (
        <div key={entry.id} className={styles.row}>
          <div className={`${styles.cell} ${styles.letter} mono`}>{LETTERS[i] ?? i + 1}</div>
          <div className={`${styles.cell} ${styles.period} mono`}>{entry.period}</div>
          <div className={styles.cell}>
            <div className={styles.title}>{entry.title}</div>
            <p className={styles.desc}>{entry.description}</p>
          </div>
          <div className={`${styles.cell} ${styles.org}`}>{entry.org}</div>
        </div>
      ))}
    </div>
  );
}
