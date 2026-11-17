'use client';

import { ReactNode, useState } from 'react';
import styles from './ActivityExplorer.module.css';

interface Item {
  key: string;
  category: string;
  node: ReactNode;
}

interface ActivityExplorerProps {
  items: Item[];
  filters: { value: string; label: string; count: number }[];
  allLabel: string;
  emptyLabel: string;
}

/** Category filter chips above the activity grid (cards are rendered on the server). */
export default function ActivityExplorer({ items, filters, allLabel, emptyLabel }: ActivityExplorerProps) {
  const [active, setActive] = useState('all');
  const visible = active === 'all' ? items : items.filter((i) => i.category === active);

  return (
    <>
      {filters.length > 1 && (
        <div className={styles.filters} role="group">
          <button type="button" className={active === 'all' ? styles.on : ''} aria-pressed={active === 'all'} onClick={() => setActive('all')}>
            {allLabel} <span>{items.length}</span>
          </button>
          {filters.map((f) => (
            <button
              type="button"
              key={f.value}
              className={active === f.value ? styles.on : ''}
              aria-pressed={active === f.value}
              onClick={() => setActive(f.value)}
            >
              {f.label} <span>{f.count}</span>
            </button>
          ))}
        </div>
      )}
      {visible.length === 0 ? (
        <p className={styles.empty}>{emptyLabel}</p>
      ) : (
        <div className={styles.grid}>
          {visible.map((i) => (
            <div key={i.key}>{i.node}</div>
          ))}
        </div>
      )}
    </>
  );
}
