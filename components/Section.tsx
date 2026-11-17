import { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  background?: 'paper' | 'alt' | 'ink' | 'white';
  id?: string;
  tight?: boolean;
}

export default function Section({ children, background = 'paper', id, tight }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${styles[background]} ${tight ? styles.tight : ''} ${background === 'ink' ? 'on-dark' : ''}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
