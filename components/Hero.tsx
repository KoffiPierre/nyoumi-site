import Image from 'next/image';
import Link from 'next/link';
import { profileByLocale } from '@/data/profile';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './Hero.module.css';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const profile = profileByLocale[locale];
  const dict = getDictionary(locale);
  const h = dict.hero;

  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="eyebrow">{profile.title}</span>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.lede}>{profile.lede}</p>

          <div className={styles.actions}>
            <Link href={`/${locale}/parcours`} className="btn btn-outline">
              {h.viewCareer}
            </Link>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {h.contactMe}
            </Link>
          </div>

          <div className={styles.meta}>
            <div>
              <span>{h.metaLocation}</span>
              <strong>{profile.location}</strong>
            </div>
            <div>
              <span>{h.metaDoctorate}</span>
              <strong>{profile.doctorate}</strong>
            </div>
            <div>
              <span>{h.metaOrigin}</span>
              <strong>{profile.origin}</strong>
            </div>
          </div>
        </div>

        <div className={styles.portrait}>
          <Image
            src="/images/portrait.jpg"
            alt={profile.name}
            width={730}
            height={807}
            priority
            className={styles.portraitImg}
          />
        </div>
      </div>
    </section>
  );
}
