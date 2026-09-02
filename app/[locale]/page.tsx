import Link from 'next/link';
import Hero from '@/components/Hero';
import PillarGrid from '@/components/PillarGrid';
import Timeline from '@/components/Timeline';
import PressGrid from '@/components/PressGrid';
import PullQuote from '@/components/PullQuote';
import Section from '@/components/Section';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { profileByLocale } from '@/data/profile';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const content: Record<Locale, {
  pillarsLabel: string; pillarsTitle: string; pillarsDesc: string;
  parcoursLabel: string; parcoursTitle: string; parcoursDesc: string; parcoursCta: string;
  presseLabel: string; presseTitle: string; presseDesc: string; presseCta: string;
  quote: string;
  ctaKicker: string; ctaTitle: string; ctaLede: string;
}> = {
  fr: {
    pillarsLabel: 'Ce qui structure la pratique',
    pillarsTitle: 'Une double compétence, mise au service des équipes.',
    pillarsDesc: "Recherche, ingénierie et formation, construites entre le Cameroun et le Maroc.",
    parcoursLabel: 'Parcours',
    parcoursTitle: 'Six ans d\'enseignement, un doctorat mention très honorable.',
    parcoursDesc: 'Une trajectoire construite pas à pas.',
    parcoursCta: 'Le parcours complet',
    presseLabel: 'Presse',
    presseTitle: 'Ce que la presse en dit.',
    presseDesc: 'Deux portraits parus dans DT News 237.',
    presseCta: 'Tous les articles',
    quote: "L'Afrique peut adopter les innovations mondiales et produire ses propres solutions technologiques, capables d'accompagner durablement son développement.",
    ctaKicker: 'Disponible pour',
    ctaTitle: 'Discutons de votre projet.',
    ctaLede: "IA appliquée à l'énergie, architecture blockchain, formation de cadres ou intervention pédagogique.",
  },
  en: {
    pillarsLabel: 'What shapes the practice',
    pillarsTitle: 'A dual expertise, put to work for teams.',
    pillarsDesc: 'Research, engineering and training, built between Cameroon and Morocco.',
    parcoursLabel: 'Career',
    parcoursTitle: 'Six years of teaching, a PhD with highest honors.',
    parcoursDesc: 'A career built step by step.',
    parcoursCta: 'Full career',
    presseLabel: 'Press',
    presseTitle: 'What the press says.',
    presseDesc: 'Two profiles published in DT News 237.',
    presseCta: 'All articles',
    quote: 'Africa can adopt global innovations and produce its own technological solutions, capable of sustaining its development over the long run.',
    ctaKicker: 'Available for',
    ctaTitle: "Let's discuss your project.",
    ctaLede: 'AI applied to energy, blockchain architecture, executive training or a speaking engagement.',
  },
};

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const dict = getDictionary(locale);
  const c = content[locale];

  return (
    <>
      <Hero locale={locale} />

      <Section background="alt">
        <Reveal>
          <SectionHead label={c.pillarsLabel} title={c.pillarsTitle} description={c.pillarsDesc} />
        </Reveal>
        <Reveal delay={0.1}>
          <PillarGrid locale={locale} />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            label={c.parcoursLabel}
            title={c.parcoursTitle}
            description={c.parcoursDesc}
            action={
              <Link href={`/${locale}/parcours`} className={`btn btn-outline ${styles.headAction}`}>
                {c.parcoursCta}
              </Link>
            }
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Timeline locale={locale} limit={4} />
        </Reveal>
      </Section>

      <PullQuote text={c.quote} />

      <Section background="alt">
        <Reveal>
          <SectionHead
            label={c.presseLabel}
            title={c.presseTitle}
            description={c.presseDesc}
            action={
              <Link href={`/${locale}/presse`} className={`btn btn-outline ${styles.headAction}`}>
                {c.presseCta}
              </Link>
            }
          />
        </Reveal>
        <Reveal delay={0.1}>
          <PressGrid locale={locale} limit={2} />
        </Reveal>
      </Section>

      <Section background="ink">
        <Reveal>
          <div className={styles.cta}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--accent-soft)' }}>
                {c.ctaKicker}
              </span>
              <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
              <p className={styles.ctaLede}>{c.ctaLede}</p>
            </div>
            <div className={styles.ctaAction}>
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {dict.hero.contactMe}
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
