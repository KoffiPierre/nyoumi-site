import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import TitleBlock from '@/components/TitleBlock';
import { profileByLocale } from '@/data/profile';
import { trainingByLocale } from '@/data/training';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string; galleryLabel: string }> = {
  fr: {
    label: 'Afrique Compétences',
    title: 'Former les cadres à l\'IA, à l\'échelle du continent.',
    lede: "En parallèle de la recherche et de l'ingénierie, il accompagne des équipes de direction dans l'appropriation de l'intelligence artificielle.",
    metaTitle: 'Formation de cadres',
    metaDesc: "Dieudonné Nyoumi Mballa forme des cadres et équipes de direction venus de huit pays africains à l'intelligence artificielle appliquée à leurs métiers, pour Afrique Compétences.",
    galleryLabel: 'En session',
  },
  en: {
    label: 'Afrique Compétences',
    title: 'Training executives in AI, continent-wide.',
    lede: 'Alongside research and engineering, he helps management teams put artificial intelligence to work.',
    metaTitle: 'Executive Training',
    metaDesc: 'Dieudonné Nyoumi Mballa trains executives and management teams from eight African countries in applying artificial intelligence to their fields, for Afrique Compétences.',
    galleryLabel: 'In session',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${c.metaTitle} — ${profile.name}`, description: c.metaDesc };
}

export default async function FormationPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const training = trainingByLocale[locale];
  const dict = getDictionary(locale);

  return (
    <>
      <Section>
        <PageHeader index="03" label={c.label} title={c.title} lede={c.lede} />

        <Reveal>
          <div className={styles.intro}>
            {training.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <TitleBlock
            className={styles.titleblock}
            fields={[
              { label: dict.formation.client, value: training.client },
              { label: dict.formation.program, value: training.programTitle, span: 3 },
              { label: dict.formation.dates, value: training.programDates },
            ]}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.countries}>
            <span className={`mono ${styles.countriesLabel}`}>{dict.formation.countriesLabel}</span>
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

      <Section background="dim">
        <Reveal>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              <Image src="/images/formation-session.jpg" alt={c.galleryLabel} width={1080} height={1069} />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/images/formation-groupe.jpg" alt={c.galleryLabel} width={1536} height={1409} />
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
