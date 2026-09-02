import { timelineByLocale } from '@/data/timeline';
import { Locale } from '@/types/content';
import styles from './Timeline.module.css';

interface TimelineProps {
  locale: Locale;
  limit?: number;
}

export default function Timeline({ locale, limit }: TimelineProps) {
  const all = timelineByLocale[locale];
  const items = limit ? all.slice(0, limit) : all;

  return (
    <div className={styles.timeline}>
      {items.map((entry) => (
        <div key={entry.id} className={styles.item}>
          <div className={styles.rail}>
            <span className={styles.dot} />
          </div>
          <div className={styles.body}>
            <span className={styles.period}>{entry.period}</span>
            <h4 className={styles.title}>{entry.title}</h4>
            <div className={styles.org}>{entry.org}</div>
            <p className={styles.desc}>{entry.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
