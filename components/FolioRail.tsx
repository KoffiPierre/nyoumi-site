'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './FolioRail.module.css';

export interface FolioSection {
  id: string;
  label: string;
}

interface FolioRailProps {
  sections: FolioSection[];
  title: string;
}

export default function FolioRail({ sections, title }: FolioRailProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sections]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <aside className={styles.rail} aria-hidden="true">
      <div className={`mono ${styles.title}`}>{title}</div>
      <ul className={styles.list}>
        {sections.map((s, i) => (
          <li key={s.id}>
            <button className={`${styles.item} ${active === s.id ? styles.active : ''}`} onClick={() => scrollTo(s.id)}>
              <span className={`mono ${styles.num}`}>
                {String(i + 1).padStart(2, '0')}/{String(sections.length).padStart(2, '0')}
              </span>
              <span className={styles.label}>{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
