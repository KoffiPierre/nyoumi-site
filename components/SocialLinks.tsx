import { SocialLink } from '@/lib/content';
import styles from './SocialLinks.module.css';

/** Icons by network name (the `reseau` field chosen in the admin). */
function Icon({ network }: { network: string }) {
  switch (network) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.9.25-1.5 1.6-1.5H16.5V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 3.9V10.5H8v3h2.3V21h3.2z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.94 8.5H4.06V20h2.88V8.5zM5.5 4a1.67 1.67 0 100 3.34A1.67 1.67 0 005.5 4zM20 13.4c0-3.2-1.7-4.7-4-4.7a3.6 3.6 0 00-3.2 1.8V8.5H9.9V20h2.9v-6.3c0-1.6.3-3.1 2.2-3.1 1.8 0 1.9 1.7 1.9 3.2V20H20v-6.6z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.4" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3L10 15z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.5c0 3.6-2.5 5.9-5.7 5.9a5.6 5.6 0 01-5.6-5.7c0-3.4 2.9-5.9 6.4-5.4v2.8c-1.6-.4-3.4.6-3.4 2.6 0 1.5 1.1 2.7 2.7 2.7 1.6 0 2.7-1.1 2.7-3.1V3h2.9z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5a9.4 9.4 0 00-8.1 14.2L2.6 21.5l4.9-1.3A9.4 9.4 0 1012 2.5zm0 17.1a7.7 7.7 0 01-3.9-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1112 19.6zm4.2-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.3 6.3 0 01-3.1-2.7c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 00-.6.3 2.7 2.7 0 00-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.1 3.7 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
      );
  }
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export default function SocialLinks({ links, className }: SocialLinksProps) {
  if (links.length === 0) return null;
  return (
    <div className={`${styles.row} ${className ?? ''}`}>
      {links.map((link) => (
        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label} className={styles.icon}>
          <Icon network={link.network} />
        </a>
      ))}
    </div>
  );
}
