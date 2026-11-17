import Link from 'next/link';
import { getNavLinks } from '@/lib/nav';
import { getDictionary } from '@/lib/dictionary';
import { getProfile, getSocialLinks } from '@/lib/content';
import { Locale } from '@/types/content';
import SocialLinks from './SocialLinks';
import LocaleSwitcher from './LocaleSwitcher';
import styles from './SiteFooter.module.css';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const profile = getProfile(locale);
  const dict = getDictionary(locale);
  const navLinks = getNavLinks(locale);
  const social = getSocialLinks();

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.top}>
          <div className={styles.identity}>
            <div className={styles.name}>{profile.name}</div>
            <p className={styles.tagline}>{profile.title}</p>
            <SocialLinks links={social} className={styles.social} />
          </div>

          <nav className={styles.sitemap} aria-label="Plan du site">
            {navLinks.map((link) => (
              <Link key={link.href} href={`/${locale}${link.href}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.reach}>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phoneDisplay}</a>
            <span>{profile.address}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
          </span>
          <div className={styles.bottomRight}>
            <LocaleSwitcher locale={locale} dark />
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static admin app, full page load wanted */}
            <a href="/admin/index.html" className={styles.admin} rel="nofollow">
              {dict.footer.admin}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
