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
  name: string;
}

export default function SiteHeader({ locale, name }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = getNavLinks(locale);
  const dict = getDictionary(locale);
  const localPath = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  const isActive = (href: string) => (href === '/' ? localPath === '/' : localPath === href || localPath.startsWith(`${href}/`));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const [first, ...rest] = name.split(' ');

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <div className={`wrap ${styles.bar}`}>
        <Link href={`/${locale}`} className={styles.brand} aria-label={name}>
          <span className={styles.monogram} aria-hidden="true">
            DN
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandFirst}>{first}</span>
            <span className={styles.brandLast}>{rest.join(' ')}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navigation">
          <ul>
            {navLinks.slice(1, -1).map((link) => (
              <li key={link.href}>
                <Link href={`/${locale}${link.href}`} className={isActive(link.href) ? styles.active : ''}>
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
          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? dict.menu.close : dict.menu.open}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.bun} ${open ? styles.bunOpen : ''}`} />
          </button>
        </div>
      </div>

      <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ''}`} hidden={!open}>
        <nav className="wrap" aria-label="Navigation mobile">
          {navLinks.map((link) => (
            <Link key={link.href} href={`/${locale}${link.href}`} className={isActive(link.href) ? styles.active : ''}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
