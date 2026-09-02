import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import { profileByLocale } from '@/data/profile';
import { trainingByLocale } from '@/data/training';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const galleryImages = [
  { src: '/images/formation-session.jpg', width: 1080, height: 1069 },
  { src: '/images/formation-groupe.jpg', width: 1536, height: 1409 },
  { src: '/images/formation-flipchart.jpg', width: 1599, height: 1599 },
  { src: '/images/formation-presentation.jpg', width: 1920, height: 1920 },
];

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string; galleryLabel: string; captions: string[] }> = {
  fr: {
    label: 'Formation de cadres',
    title: "Former les cadres à l'IA, à l'échelle du continent.",
    lede: "En parallèle de la recherche et de l'ingénierie, il accompagne des équipes de direction dans l'appropriation de l'intelligence artificielle.",
    metaTitle: 'Formation de cadres',
    metaDesc: "Dieudonné Nyoumi Mballa forme des cadres et équipes de direction venus de huit pays africains à l'intelligence artificielle appliquée à leurs métiers, pour Afrique Compétences.",
    galleryLabel: 'En session',
    captions: ['En session, Afrique Compétences', 'Avec les cadres formés', 'Animation au paperboard', 'Restitution des ateliers'],
  },
  en: {
    label: 'Executive Training',
    title: 'Training executives in AI, continent-wide.',
    lede: 'Alongside research and engineering, he helps management teams put artificial intelligence to work.',
    metaTitle: 'Executive Training',
    metaDesc: 'Dieudonné Nyoumi Mballa trains executives and management teams from eight African countries in applying artificial intelligence to their fields, for Afrique Compétences.',
    galleryLabel: 'In session',
    captions: ['In session, Afrique Compétences', 'With the trained executives', 'Facilitating at the flipchart', 'Workshop debrief'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${profile.name} | ${c.metaTitle}`, description: c.metaDesc };
}

export default async function FormationPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const training = trainingByLocale[locale];
  const dict = getDictionary(locale);

  return (
    <>
      <Section>
        <PageHeader label={c.label} title={c.title} lede={c.lede} />

        <Reveal>
          <div className={styles.intro}>
            {training.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className={styles.infoRow}>
            <div>
              <span className={styles.infoLabel}>{dict.formation.client}</span>
              <strong>{training.client}</strong>
            </div>
            <div>
              <span className={styles.infoLabel}>{dict.formation.program}</span>
              <strong>{training.programTitle}</strong>
            </div>
            <div>
              <span className={styles.infoLabel}>{dict.formation.dates}</span>
              <strong>{training.programDates}</strong>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.countries}>
            <span className={styles.countriesLabel}>{dict.formation.countriesLabel}</span>
            <div className={styles.chips}>
              {training.countries.map((country) => (
                <span key={country} className={styles.chip}>
                  {country}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section background="alt">
        <Reveal>
          <div className={styles.gallery}>
            {galleryImages.map((img, i) => (
              <Lightbox
                key={img.src}
                src={img.src}
                alt={c.captions[i] ?? c.galleryLabel}
                width={img.width}
                height={img.height}
                closeLabel={dict.press.close}
                triggerClassName={styles.galleryTrigger}
              >
                <div className={styles.galleryItem}>
                  <Image src={img.src} alt={c.captions[i] ?? c.galleryLabel} fill sizes="(max-width: 700px) 100vw, 50vw" className={styles.galleryImg} />
                  <span className={styles.galleryCaption}>{c.captions[i]}</span>
                </div>
              </Lightbox>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
