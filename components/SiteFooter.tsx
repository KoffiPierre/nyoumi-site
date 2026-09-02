import Link from 'next/link';
import { getNavLinks } from '@/lib/nav';
import { getDictionary } from '@/lib/dictionary';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';
import styles from './SiteFooter.module.css';

interface SiteFooterProps {
  locale: Locale;
}

export default function SiteFooter({ locale }: SiteFooterProps) {
  const profile = profileByLocale[locale];
  const dict = getDictionary(locale);
  const navLinks = getNavLinks(locale);

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>{profile.name}</div>
            <p className={styles.tagline}>{profile.role}</p>
          </div>

          <nav className={styles.sitemap} aria-label="Sitemap">
            {navLinks.map((link) => (
              <Link key={link.href} href={`/${locale}${link.href}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.reach}>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phoneDisplay}</a>
            <span>{profile.location}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {profile.name}. {dict.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
