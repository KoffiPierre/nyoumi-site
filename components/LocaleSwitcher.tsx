'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types/content';
import { locales } from '@/lib/i18n';
import styles from './LocaleSwitcher.module.css';

interface LocaleSwitcherProps {
  locale: Locale;
  dark?: boolean;
}

export default function LocaleSwitcher({ locale, dark }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const rest = pathname.replace(new RegExp(`^/${locale}`), '') || '';

  return (
    <div className={`${styles.switch} ${dark ? styles.dark : ''}`} aria-label="Language">
      {locales.map((l, i) => (
        <span key={l} className={styles.item}>
          {i > 0 && <span className={styles.sep}>/</span>}
          <Link href={`/${l}${rest}`} className={l === locale ? styles.active : styles.inactive}>
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
