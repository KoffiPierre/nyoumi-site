'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getNavLinks } from '@/lib/nav';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import LocaleSwitcher from './LocaleSwitcher';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  locale: Locale;
}

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navLinks = getNavLinks(locale);
  const dict = getDictionary(locale);
  const localPath = pathname.replace(new RegExp(`^/${locale}`), '') || '/';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <Link href={`/${locale}`} className={styles.brand}>
          Dieudonné Nyoumi Mballa
        </Link>

        <nav className={styles.nav}>
          <ul>
            {navLinks.slice(0, -1).map((link) => (
              <li key={link.href}>
                <Link href={`/${locale}${link.href}`} className={localPath === link.href ? styles.active : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <LocaleSwitcher locale={locale} />
          <Link href={`/${locale}/contact`} className={`btn btn-primary ${styles.cta}`}>
            {dict.nav.contact}
          </Link>
        </div>

        <button
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.bun} ${open ? styles.bunOpen : ''}`} />
        </button>
      </div>

      <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.href} href={`/${locale}${link.href}`} className={localPath === link.href ? styles.active : ''}>
            {link.label}
          </Link>
        ))}
        <div className={styles.mobileLang}>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
