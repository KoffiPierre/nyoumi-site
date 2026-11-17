import Image from 'next/image';
import Link from 'next/link';
import { Activity, categoryLabels, formatMonth } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './ActivityCard.module.css';

interface ActivityCardProps {
  activity: Activity;
  locale: Locale;
  large?: boolean;
  priority?: boolean;
}

export default function ActivityCard({ activity: a, locale, large, priority }: ActivityCardProps) {
  const dict = getDictionary(locale).activities;
  const when = a.period || formatMonth(a.date, locale);
  const counts = [
    a.photos.length ? `${a.photos.length} ${a.photos.length > 1 ? dict.photos : dict.photo}` : '',
    a.videos.length ? `${a.videos.length} ${a.videos.length > 1 ? dict.videos : dict.video}` : '',
  ].filter(Boolean);

  return (
    <Link href={`/${locale}/activites/${a.slug}`} className={`${styles.card} ${large ? styles.large : ''}`}>
      <div className={styles.media}>
        {a.cover && (
          <Image
            src={a.cover}
            alt={a.title}
            fill
            priority={priority}
            sizes={large ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw'}
            className={styles.img}
            style={{ objectPosition: a.coverPosition }}
          />
        )}
        <span className={styles.badge}>{categoryLabels[locale][a.category]}</span>
        {counts.length > 0 && <span className={styles.counts}>{counts.join(' · ')}</span>}
      </div>
      <div className={styles.body}>
        <span className={styles.meta}>
          {when}
          {a.location && ` · ${a.location}`}
        </span>
        <h3 className={styles.title}>{a.title}</h3>
        {a.summary && <p className={styles.summary}>{a.summary}</p>}
        <span className={styles.more}>{dict.see} →</span>
      </div>
    </Link>
  );
}
