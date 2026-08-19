'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import { defaultLocale } from '@/lib/i18n';
import styles from './not-found.module.css';

export default function NotFound() {
  const pathname = usePathname();
  const seg = pathname.split('/')[1];
  const locale: Locale = seg === 'en' ? 'en' : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <section className={styles.wrap}>
      <div className={`wrap ${styles.content}`}>
        <span className={`mono ${styles.kicker}`}>{dict.notFound.kicker}</span>
        <h1 className={styles.title}>{dict.notFound.title}</h1>
        <p className={styles.lede}>{dict.notFound.lede}</p>
        <Link href={`/${locale}`} className="btn btn-primary">
          {dict.notFound.back}
        </Link>
      </div>
    </section>
  );
}
