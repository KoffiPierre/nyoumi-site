import { ReactNode } from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  label: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}

/** Navy title band at the top of every inner page. */
export default function PageHeader({ label, title, lede, children }: PageHeaderProps) {
  return (
    <header className={`${styles.band} on-dark`}>
      <div className={`wrap ${styles.inner}`}>
        <span className="eyebrow">{label}</span>
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {children}
      </div>
    </header>
  );
}
