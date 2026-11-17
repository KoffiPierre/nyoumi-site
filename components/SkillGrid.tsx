import { skillGroupsByLocale } from '@/data/skills';
import { Locale } from '@/types/content';
import styles from './SkillGrid.module.css';

export default function SkillGrid({ locale }: { locale: Locale }) {
  const skillGroups = skillGroupsByLocale[locale];
  return (
    <div className={styles.grid}>
      {skillGroups.map((group) => (
        <div key={group.id} className={styles.card}>
          <span className={styles.eyebrow}>{group.eyebrow}</span>
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
