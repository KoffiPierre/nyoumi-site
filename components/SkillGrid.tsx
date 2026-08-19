import { skillGroupsByLocale } from '@/data/skills';
import { Locale } from '@/types/content';
import styles from './SkillGrid.module.css';

interface SkillGridProps {
  locale: Locale;
}

export default function SkillGrid({ locale }: SkillGridProps) {
  const skillGroups = skillGroupsByLocale[locale];

  return (
    <div className={styles.grid}>
      {skillGroups.map((group, i) => (
        <div key={group.id} className={styles.col}>
          <span className={`mono ${styles.idx}`}>§{String(i + 1).padStart(2, '0')}</span>
          <h3 className={styles.title}>{group.title}</h3>
          <ul className={styles.list}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
