import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import { profileByLocale } from '@/data/profile';
import { trainingByLocale } from '@/data/training';
import { formationGallery } from '@/data/formationGallery';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string }> = {
  fr: {
    label: 'Formation de cadres',
    title: "Former les cadres à l'IA, à l'échelle du continent.",
    lede: "En parallèle de la recherche et de l'ingénierie, il accompagne des équipes de direction dans l'appropriation de l'intelligence artificielle.",
    metaTitle: 'Formation de cadres',
    metaDesc: "Dieudonné Nyoumi Mballa forme des cadres et équipes de direction venus de huit pays africains à l'intelligence artificielle appliquée à leurs métiers, pour Afrique Compétences.",
  },
  en: {
    label: 'Executive Training',
    title: 'Training executives in AI, continent-wide.',
    lede: 'Alongside research and engineering, he helps management teams put artificial intelligence to work.',
    metaTitle: 'Executive Training',
    metaDesc: 'Dieudonné Nyoumi Mballa trains executives and management teams from eight African countries in applying artificial intelligence to their fields, for Afrique Compétences.',
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
            {formationGallery.map((item) => {
              const country = item.country[locale];
              const caption = item.caption[locale];
              const thumbSrc = item.kind === 'video' ? item.poster! : item.src;

              return (
                <Lightbox
                  key={item.id}
                  src={item.src}
                  alt={caption}
                  width={item.width}
                  height={item.height}
                  kind={item.kind === 'video' ? 'video' : 'image'}
                  closeLabel={dict.press.close}
                  triggerClassName={styles.galleryTrigger}
                >
                  <div className={styles.galleryItem}>
                    <Image src={thumbSrc} alt={caption} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className={styles.galleryImg} />
                    {item.kind === 'video' && (
                      <span className={styles.playBadge} aria-hidden="true">
                        ▶
                      </span>
                    )}
                    <div className={styles.galleryFooter}>
                      <span className={styles.galleryCountry}>{country}</span>
                      <span className={styles.galleryCaption}>{caption}</span>
                    </div>
                  </div>
                </Lightbox>
              );
            })}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
