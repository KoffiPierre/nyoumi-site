import { ReactNode } from 'react';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  label: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}

export default function SectionHead({ label, title, description, action }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <div>
        <span className="eyebrow">{label}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.right}>
        {description && <p className={styles.desc}>{description}</p>}
        {action}
      </div>
    </div>
  );
}
