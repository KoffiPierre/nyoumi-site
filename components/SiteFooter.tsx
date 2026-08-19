import Link from 'next/link';
import { getNavLinks } from '@/lib/nav';
import { getDictionary } from '@/lib/dictionary';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';
import TitleBlock from './TitleBlock';
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
        <TitleBlock
          dark
          className={styles.titleblock}
          fields={[
            { label: dict.titleblock.contact, value: profile.email, href: `mailto:${profile.email}`, span: 2 },
            { label: dict.titleblock.phone, value: profile.phoneDisplay, href: `tel:${profile.phone}` },
            { label: dict.titleblock.location, value: profile.location },
            { label: dict.titleblock.languages, value: profile.languages.join(' · ') },
          ]}
        />

        <div className={styles.sitemap}>
          {navLinks.map((link, i) => (
            <Link key={link.href} href={`/${locale}${link.href}`}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span> {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{dict.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
