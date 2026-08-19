import { pillarsByLocale } from '@/data/pillars';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './PillarGrid.module.css';

interface PillarGridProps {
  locale: Locale;
}

export default function PillarGrid({ locale }: PillarGridProps) {
  const pillars = pillarsByLocale[locale];
  const dict = getDictionary(locale);

  return (
    <div className={styles.spec}>
      <div className={`${styles.row} ${styles.head}`}>
        <div className={styles.cell}>{dict.spec.ref}</div>
        <div className={styles.cell}>{dict.spec.parameter}</div>
        <div className={styles.cell}>{dict.spec.description}</div>
      </div>
      {pillars.map((pillar, i) => (
        <div key={pillar.id} className={styles.row}>
          <div className={`${styles.cell} ${styles.idx} mono`}>§{String(i + 1).padStart(2, '0')}</div>
          <div className={`${styles.cell} ${styles.param}`}>{pillar.title}</div>
          <div className={`${styles.cell} ${styles.desc}`}>{pillar.description}</div>
        </div>
      ))}
    </div>
  );
}
