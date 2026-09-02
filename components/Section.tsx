import { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  background?: 'paper' | 'alt' | 'ink';
  id?: string;
}

export default function Section({ children, background = 'paper', id }: SectionProps) {
  const bgClass = styles[background];

  return (
    <section id={id} className={`${styles.section} ${bgClass}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}
