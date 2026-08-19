import { ReactNode } from 'react';
import Folio from './Folio';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  index?: string;
  label: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}

export default function SectionHead({ index, label, title, description, action }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <div>
        <Folio index={index} label={label} />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.right}>
        {description && <p className={styles.desc}>{description}</p>}
        {action}
      </div>
    </div>
  );
}
