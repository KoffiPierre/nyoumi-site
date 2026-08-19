import Image from 'next/image';
import Link from 'next/link';
import { profileByLocale } from '@/data/profile';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import TitleBlock from './TitleBlock';
import styles from './Hero.module.css';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const profile = profileByLocale[locale];
  const dict = getDictionary(locale);
  const h = dict.hero;

  const callouts = [
    { num: '1', label: h.calloutPhd, detail: h.calloutPhdDetail },
    { num: '2', label: h.calloutEngineer, detail: h.calloutEngineerDetail },
    { num: '3', label: h.calloutBlockchain, detail: h.calloutBlockchainDetail },
    { num: '4', label: h.calloutTrainer, detail: h.calloutTrainerDetail },
  ];

  return (
    <section className={styles.hero} id="profil">
      <span className="reg tl" />
      <span className="reg tr" />
      <div className="wrap">
        <div className={styles.top}>
          <span className={`mono ${styles.tag}`}>{h.tag}</span>
          <span className={`mono ${styles.tag}`}>
            <b>{h.rev}</b> 2026.06 &middot; {profile.location}
          </span>
        </div>

        <div className={styles.grid}>
          <div>
            <h1 className={styles.name}>
              {profile.firstName}
              <br />
              <span className={styles.last}>{profile.lastName}</span>
            </h1>
            <p className={styles.role}>{profile.title.toUpperCase()}</p>
            <p className={styles.lede}>{profile.lede}</p>
            <div className={styles.actions}>
              <Link href={`/${locale}/parcours`} className="btn btn-outline">
                {h.viewCareer}
              </Link>
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {h.contactMe}
              </Link>
            </div>
          </div>

          <div className={styles.figure}>
            <div className={styles.frame}>
              <Image
                src="/images/portrait.jpg"
                alt={`Portrait — ${profile.name}`}
                width={730}
                height={807}
                priority
                className={styles.img}
              />
            </div>
            <div className={styles.cap}>
              <span>{h.figCaption}</span>
              <span className={styles.capRed}>{h.scale}</span>
            </div>
            <div className={styles.callouts}>
              {callouts.map((c) => (
                <div key={c.num} className={styles.callout}>
                  <span className={styles.num}>{c.num}</span>
                  <span className={styles.txt}>
                    <b>{c.label}</b> — {c.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TitleBlock
          className={styles.titleblock}
          fields={[
            { label: h.tbProject, value: h.tbProjectValue, span: 2 },
            { label: h.tbDrawnBy, value: profile.name },
            { label: h.tbDate, value: '2026' },
            { label: h.tbScale, value: '1:1' },
            { label: h.tbSheet, value: '1 / 1' },
          ]}
        />
      </div>
    </section>
  );
}
