import Link from 'next/link';
import Hero from '@/components/Hero';
import Sommaire from '@/components/Sommaire';
import PillarGrid from '@/components/PillarGrid';
import Timeline from '@/components/Timeline';
import PressGrid from '@/components/PressGrid';
import PullQuote from '@/components/PullQuote';
import Section from '@/components/Section';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import FolioRail from '@/components/FolioRail';
import { profileByLocale } from '@/data/profile';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const content: Record<Locale, {
  railTitle: string;
  rail: { id: string; label: string }[];
  pillarsLabel: string; pillarsTitle: string; pillarsDesc: string;
  parcoursLabel: string; parcoursTitle: string; parcoursDesc: string; parcoursCta: string;
  presseLabel: string; presseTitle: string; presseDesc: string; presseCta: string;
  ctaKicker: string; ctaTitle: string; ctaLede: string;
}> = {
  fr: {
    railTitle: 'Nyoumi Mballa',
    rail: [
      { id: 'profil', label: 'Profil' },
      { id: 'sommaire', label: 'Sommaire' },
      { id: 'axes', label: 'Fiche technique' },
      { id: 'parcours-apercu', label: 'Parcours' },
      { id: 'presse-apercu', label: 'Presse' },
      { id: 'cta', label: 'Contact' },
    ],
    pillarsLabel: 'Domaines', pillarsTitle: 'Fiche technique', pillarsDesc: "Recherche, ingénierie, formation de cadres et transmission — une pratique construite entre le Cameroun et le Maroc.",
    parcoursLabel: 'Historique', parcoursTitle: 'Journal des révisions', parcoursDesc: 'Le parcours, lu comme un historique de révisions de plan technique.', parcoursCta: 'Le parcours complet',
    presseLabel: 'Pièces jointes', presseTitle: 'Annexes de presse', presseDesc: 'DT News 237 — portraits signés Angèle Ebassa.', presseCta: 'Tous les articles',
    ctaKicker: 'Disponible pour', ctaTitle: 'Discutons de votre projet.', ctaLede: "IA appliquée à l'énergie, architecture blockchain, formation de cadres ou intervention pédagogique.",
  },
  en: {
    railTitle: 'Nyoumi Mballa',
    rail: [
      { id: 'profil', label: 'Profile' },
      { id: 'sommaire', label: 'Contents' },
      { id: 'axes', label: 'Spec sheet' },
      { id: 'parcours-apercu', label: 'Career' },
      { id: 'presse-apercu', label: 'Press' },
      { id: 'cta', label: 'Contact' },
    ],
    pillarsLabel: 'Fields', pillarsTitle: 'Spec sheet', pillarsDesc: 'Research, engineering, executive training and knowledge transfer — a practice built between Cameroon and Morocco.',
    parcoursLabel: 'History', parcoursTitle: 'Revision log', parcoursDesc: 'A career, read as the revision history of a technical drawing.', parcoursCta: 'Full career',
    presseLabel: 'Attachments', presseTitle: 'Press annex', presseDesc: 'DT News 237 — profiles by Angèle Ebassa.', presseCta: 'All articles',
    ctaKicker: 'Available for', ctaTitle: "Let's discuss your project.", ctaLede: 'AI applied to energy, blockchain architecture, executive training or a speaking engagement.',
  },
};

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const dict = getDictionary(locale);
  const c = content[locale];

  return (
    <>
      <FolioRail sections={c.rail} title={c.railTitle} />

      <Hero locale={locale} />

      <Section id="sommaire">
        <Reveal>
          <Sommaire locale={locale} />
        </Reveal>
      </Section>

      <Section background="dim" id="axes">
        <Reveal>
          <SectionHead index="01" label={c.pillarsLabel} title={c.pillarsTitle} description={c.pillarsDesc} />
        </Reveal>
        <Reveal delay={0.1}>
          <PillarGrid locale={locale} />
        </Reveal>
      </Section>

      <PullQuote text={dict.note.quote} tag={dict.note.tag} />

      <Section id="parcours-apercu">
        <Reveal>
          <SectionHead
            index="02"
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

      <Section background="dim" id="presse-apercu">
        <Reveal>
          <SectionHead
            index="03"
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

      <Section background="ink" id="cta">
        <Reveal>
          <div className={styles.cta}>
            <div>
              <span className="mono" style={{ color: 'var(--red-soft)' }}>
                {c.ctaKicker}
              </span>
              <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
              <p className={styles.ctaLede}>{c.ctaLede}</p>
            </div>
            <div className={styles.ctaAction}>
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {dict.hero.contactMe} — {profile.firstName}
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
