import { pillarsByLocale } from '@/data/pillars';
import { Locale } from '@/types/content';
import styles from './PillarGrid.module.css';

interface PillarGridProps {
  locale: Locale;
}

export default function PillarGrid({ locale }: PillarGridProps) {
  const pillars = pillarsByLocale[locale];

  return (
    <div className={styles.grid}>
      {pillars.map((pillar) => (
        <article key={pillar.id} className={styles.card}>
          <span className="eyebrow">{pillar.eyebrow}</span>
          <h3 className={styles.title}>{pillar.title}</h3>
          <p className={styles.desc}>{pillar.description}</p>
        </article>
      ))}
    </div>
  );
}
