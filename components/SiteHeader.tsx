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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const localPath = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  const activeIndex = Math.max(navLinks.findIndex((l) => l.href === localPath), 0);
  const sheetNumber = String(activeIndex + 1).padStart(3, '0');

  return (
    <>
      <header className={styles.header}>
        <div className={`wrap ${styles.bar}`}>
          <Link href={`/${locale}`} className={styles.plate}>
            <span className={`mono ${styles.id}`}>PLAN N&deg;{sheetNumber}</span>
            <span className={styles.name}>Nyoumi&nbsp;Mballa</span>
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
            aria-label={open ? 'Close' : 'Open'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="mono">{open ? '×' : 'MENU'}</span>
          </button>
        </div>
      </header>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}>
        <div className={`wrap ${styles.overlayInner}`}>
          <nav aria-label="Sitemap">
            {navLinks.map((link, i) => {
              const active = localPath === link.href;
              return (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className={`${styles.overlayLink} ${active ? styles.active : ''}`}
                >
                  <span className={`mono ${styles.overlayIndex}`}>PL. {String(i + 1).padStart(3, '0')}</span>
                  <span className={styles.overlayLabel}>{link.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className={styles.overlayLang}>
            <LocaleSwitcher locale={locale} dark />
          </div>
        </div>
      </div>
    </>
  );
}
