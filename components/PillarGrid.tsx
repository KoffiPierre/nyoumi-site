import { pillarsByLocale } from '@/data/pillars';
import { Locale } from '@/types/content';
import styles from './PillarGrid.module.css';

export default function PillarGrid({ locale }: { locale: Locale }) {
  const pillars = pillarsByLocale[locale];
  return (
    <div className={styles.grid}>
      {pillars.map((pillar, i) => (
        <article key={pillar.id} className={styles.card}>
          <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
          <span className={styles.eyebrow}>{pillar.eyebrow}</span>
          <h3 className={styles.title}>{pillar.title}</h3>
          <p className={styles.desc}>{pillar.description}</p>
        </article>
      ))}
    </div>
  );
}
