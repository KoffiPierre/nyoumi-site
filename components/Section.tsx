import { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  background?: 'paper' | 'dim' | 'ink' | 'red';
  id?: string;
  tight?: boolean;
}

export default function Section({ children, background = 'paper', id, tight }: SectionProps) {
  const bgClass = styles[background];

  return (
    <section id={id} className={`${styles.section} ${bgClass} ${tight ? styles.tight : ''}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
