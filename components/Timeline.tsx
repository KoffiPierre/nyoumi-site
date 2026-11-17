import { CareerStep } from '@/lib/content';
import styles from './Timeline.module.css';

export default function Timeline({ steps }: { steps: CareerStep[] }) {
  return (
    <ol className={styles.timeline}>
      {steps.map((entry) => (
        <li key={entry.id} className={styles.item}>
          <div className={styles.period}>
            <span>{entry.period}</span>
            {entry.tag && <em className={styles.tag}>{entry.tag}</em>}
          </div>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.dot} />
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>{entry.title}</h3>
            <div className={styles.org}>{entry.org}</div>
            <p className={styles.desc}>{entry.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
