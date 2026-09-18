import { socialLinks } from '@/data/social';
import styles from './SocialLinks.module.css';

/**
 * Icon lookup by link id prefix. To add a new network (e.g. Instagram),
 * add its SVG here and give the matching entry in data/social.ts an id
 * that starts with the same prefix (e.g. 'instagram').
 */
function Icon({ id }: { id: string }) {
  if (id.startsWith('facebook')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.9.25-1.5 1.6-1.5H16.5V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 3.9V10.5H8v3h2.3V21h3.2z" />
      </svg>
    );
  }
  if (id.startsWith('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H4.06V20h2.88V8.5zM5.5 4a1.67 1.67 0 100 3.34A1.67 1.67 0 005.5 4zM20 13.4c0-3.2-1.7-4.7-4-4.7a3.6 3.6 0 00-3.2 1.8V8.5H9.9V20h2.9v-6.3c0-1.6.3-3.1 2.2-3.1 1.8 0 1.9 1.7 1.9 3.2V20H20v-6.6z" />
      </svg>
    );
  }
  if (id.startsWith('instagram')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.4" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return null;
}

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className }: SocialLinksProps) {
  if (socialLinks.length === 0) return null;

  return (
    <div className={`${styles.row} ${className ?? ''}`}>
      {socialLinks.map((link) => (
        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className={styles.icon}>
          <Icon id={link.id} />
        </a>
      ))}
    </div>
  );
}
