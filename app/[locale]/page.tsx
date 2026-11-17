import Image from 'next/image';
import Link from 'next/link';
import ActivityCard from '@/components/ActivityCard';
import PillarGrid from '@/components/PillarGrid';
import Timeline from '@/components/Timeline';
import Section from '@/components/Section';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { getCareer, getHomeActivities, getPress, getProfile, formatDay } from '@/lib/content';
import { publicationsByLocale } from '@/data/publications';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy = {
  fr: {
    referencesLabel: 'Ils lui ont fait confiance',
    activitiesLabel: 'Sur le terrain',
    activitiesTitle: 'Formations, interventions et rencontres récentes.',
    activitiesDesc: 'Ministères, ports, entreprises et universités : un engagement concret pour diffuser l’intelligence artificielle en Afrique.',
    activitiesCta: 'Toutes les activités',
    pillarsLabel: 'Expertise',
    pillarsTitle: 'Quatre domaines qui se nourrissent mutuellement.',
    pillarsCta: 'Le détail des compétences',
    quote: "L'Afrique peut adopter les innovations mondiales et produire ses propres solutions technologiques, capables d'accompagner durablement son développement.",
    careerLabel: 'Parcours',
    careerTitle: 'Une trajectoire construite pas à pas.',
    careerDesc: 'Du Cameroun au Maroc : enseignement, ingénierie blockchain, doctorat et formation de cadres menés de front.',
    careerCta: 'Le parcours complet',
    bookLabel: 'Ouvrage',
    bookCta: 'Découvrir le livre',
    pressLabel: 'Dans la presse',
    pressCta: 'Toute la presse',
    ctaKicker: 'Collaborer',
    ctaTitle: 'Une formation, une conférence, un projet ?',
    ctaLede: "IA appliquée à votre secteur, cybersécurité, blockchain, formation de cadres ou d'ingénieurs : parlons de vos besoins.",
  },
  en: {
    referencesLabel: 'Trusted by',
    activitiesLabel: 'In the field',
    activitiesTitle: 'Recent training, talks and meetings.',
    activitiesDesc: 'Ministries, ports, companies and universities: a hands-on commitment to spreading artificial intelligence across Africa.',
    activitiesCta: 'All activities',
    pillarsLabel: 'Expertise',
    pillarsTitle: 'Four fields that feed into one another.',
    pillarsCta: 'Detailed skills',
    quote: 'Africa can adopt global innovations and produce its own technological solutions, capable of sustaining its development over the long run.',
    careerLabel: 'Career',
    careerTitle: 'A career built step by step.',
    careerDesc: 'From Cameroon to Morocco: teaching, blockchain engineering, a PhD and executive training pursued in parallel.',
    careerCta: 'Full career',
    bookLabel: 'Book',
    bookCta: 'Discover the book',
    pressLabel: 'In the press',
    pressCta: 'All press',
    ctaKicker: 'Work together',
    ctaTitle: 'A training, a talk, a project?',
    ctaLede: 'AI applied to your sector, cybersecurity, blockchain, executive or engineer training: let’s talk about your needs.',
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const dict = getDictionary(locale);
  const profile = getProfile(locale);
  const activities = getHomeActivities(locale, 3);
  const career = getCareer(locale).slice(-4).reverse();
  const press = getPress(locale).slice(0, 2);
  const book = publicationsByLocale[locale][0];

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className={`${styles.hero} on-dark`}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="eyebrow">{profile.title}</span>
            <h1 className={styles.name}>
              <span>{profile.name.split(' ')[0]}</span> {profile.name.split(' ').slice(1).join(' ')}
            </h1>
            <p className={styles.lede}>{profile.lede}</p>
            <div className={styles.actions}>
              <Link href={`/${locale}/activites`} className="btn btn-gold">
                {dict.hero.viewActivities}
              </Link>
              <Link href={`/${locale}/contact`} className="btn btn-ghost">
                {dict.hero.contactMe}
              </Link>
            </div>
            <dl className={styles.meta}>
              <div>
                <dt>{dict.hero.metaLocation}</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>{dict.hero.metaDoctorate}</dt>
                <dd>{profile.doctorate}</dd>
              </div>
              <div>
                <dt>{dict.hero.metaOrigin}</dt>
                <dd>{profile.origin}</dd>
              </div>
            </dl>
          </div>
          <div className={styles.portraitWrap}>
            <div className={styles.portrait}>
              <Image src={profile.portrait} alt={profile.name} fill priority sizes="(max-width: 900px) 90vw, 440px" className={styles.portraitImg} />
            </div>
          </div>
        </div>

        {profile.stats.length > 0 && (
          <div className={`wrap ${styles.stats}`}>
            {profile.stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- References ---------------- */}
      {profile.references.length > 0 && (
        <section className={styles.refs}>
          <div className={`wrap ${styles.refsInner}`}>
            <span className={styles.refsLabel}>{c.referencesLabel}</span>
            <ul>
              {profile.references.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------- Activities ---------------- */}
      {activities.length > 0 && (
        <Section>
          <Reveal>
            <SectionHead
              label={c.activitiesLabel}
              title={c.activitiesTitle}
              description={c.activitiesDesc}
              action={
                <Link href={`/${locale}/activites`} className="link-arrow">
                  {c.activitiesCta} →
                </Link>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className={styles.activityGrid}>
              {activities.map((a, i) => (
                <div key={a.slug} className={i === 0 ? styles.activityLead : ''}>
                  <ActivityCard activity={a} locale={locale} large={i === 0} />
                </div>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* ---------------- Quote ---------------- */}
      <section className={`${styles.quote} on-dark`}>
        <div className="wrap">
          <Reveal>
            <blockquote>
              <p>« {c.quote} »</p>
              <footer>{profile.name}</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Expertise ---------------- */}
      <Section background="alt">
        <Reveal>
          <SectionHead
            label={c.pillarsLabel}
            title={c.pillarsTitle}
            action={
              <Link href={`/${locale}/expertise`} className="link-arrow">
                {c.pillarsCta} →
              </Link>
            }
          />
        </Reveal>
        <Reveal delay={0.1}>
          <PillarGrid locale={locale} />
        </Reveal>
      </Section>

      {/* ---------------- Career ---------------- */}
      <Section>
        <div className={styles.careerGrid}>
          <Reveal>
            <div className={styles.careerIntro}>
              <span className="eyebrow">{c.careerLabel}</span>
              <h2 className={styles.h2}>{c.careerTitle}</h2>
              <p>{c.careerDesc}</p>
              <Link href={`/${locale}/parcours`} className="link-arrow">
                {c.careerCta} →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Timeline steps={career} />
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Book & press ---------------- */}
      <Section background="white">
        <div className={styles.mediaGrid}>
          <Reveal>
            <Link href={`/${locale}/publications#ouvrage`} className={styles.book}>
              <div className={styles.bookCover}>
                <Image src="/images/livre-couverture.jpg" alt={book.title} fill sizes="220px" className={styles.bookImg} />
              </div>
              <div>
                <span className="eyebrow">{c.bookLabel}</span>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <span className="link-arrow">{c.bookCta} →</span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">{c.pressLabel}</span>
              <ul className={styles.pressList}>
                {press.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${locale}/presse/${p.slug}`}>
                      <span className={styles.pressMeta}>
                        {p.outlet}
                        {p.issue && ` · ${p.issue}`} · {formatDay(p.date, locale)}
                      </span>
                      <span className={styles.pressTitle}>{p.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/presse`} className="link-arrow">
                {c.pressCta} →
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <Section background="ink">
        <Reveal>
          <div className={styles.cta}>
            <div>
              <span className="eyebrow">{c.ctaKicker}</span>
              <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
              <p className={styles.ctaLede}>{c.ctaLede}</p>
            </div>
            <div className={styles.ctaActions}>
              <Link href={`/${locale}/contact`} className="btn btn-gold">
                {dict.hero.contactMe}
              </Link>
              <a href={`mailto:${profile.email}`} className={styles.ctaMail}>
                {profile.email}
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
