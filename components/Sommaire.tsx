import Link from 'next/link';
import { sommaireByLocale } from '@/data/sommaire';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './Sommaire.module.css';

interface SommaireProps {
  locale: Locale;
}

export default function Sommaire({ locale }: SommaireProps) {
  const entries = sommaireByLocale[locale];
  const dict = getDictionary(locale);

  return (
    <div className={styles.wrap}>
      <div className={`${styles.row} ${styles.head}`}>
        <div className={styles.cell}>{dict.sommaire.num}</div>
        <div className={styles.cell}>{dict.sommaire.sheet}</div>
        <div className={styles.cell}>{dict.sommaire.description}</div>
        <div className={styles.cell} />
      </div>
      {entries.map((entry) => (
        <Link key={entry.href} href={`/${locale}${entry.href}`} className={styles.row}>
          <div className={`${styles.cell} ${styles.idx} mono`}>{entry.index}</div>
          <div className={`${styles.cell} ${styles.title}`}>{entry.title}</div>
          <div className={`${styles.cell} ${styles.teaser}`}>{entry.teaser}</div>
          <div className={`${styles.cell} ${styles.arrow}`} aria-hidden="true">→</div>
        </Link>
      ))}
    </div>
  );
}
