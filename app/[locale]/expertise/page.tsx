import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import SkillGrid from '@/components/SkillGrid';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy: Record<Locale, {
  label: string; title: string; lede: string; metaTitle: string; metaDesc: string;
  mvpLabel: string; mvpTitle: string; mvpP1: string; mvpP2: string; caption: string;
}> = {
  fr: {
    label: 'Compétences',
    title: 'De la recherche à la mise en production.',
    lede: 'Une pratique qui va du modèle mathématique à l\'implémentation — quatre domaines qui se nourrissent mutuellement plutôt qu\'ils ne se succèdent.',
    metaTitle: 'Expertise',
    metaDesc: "IA, systèmes énergétiques, blockchain & Web3, développement fullstack — le détail des compétences techniques de Dieudonné Nyoumi Mballa.",
    mvpLabel: 'MVP opérationnel',
    mvpTitle: 'De la thèse au produit',
    mvpP1: "L'agent conversationnel développé pour MarocVente s'appuie sur un modèle fonctionnel avancé, doté d'un MVP déjà opérationnel et personnalisable selon les besoins de chaque structure.",
    mvpP2: "Pensé pour la santé, l'éducation, le sport, la finance et les services, il vise à réduire les barrières linguistiques et à intégrer, à terme, plusieurs langues locales africaines — une IA construite pour ses contextes d'usage, aux standards internationaux.",
    caption: 'Fig. 02 — En développement',
  },
  en: {
    label: 'Skills',
    title: 'From research to production.',
    lede: 'A practice that runs from the mathematical model to the implementation — four fields that feed into one another rather than follow in sequence.',
    metaTitle: 'Expertise',
    metaDesc: 'AI, energy systems, blockchain & Web3, fullstack development — a detailed look at the technical skills of Dieudonné Nyoumi Mballa.',
    mvpLabel: 'Working MVP',
    mvpTitle: 'From thesis to product',
    mvpP1: "The conversational agent built for MarocVente runs on an advanced functional model, with a working MVP already deployed and customizable to each organization's needs.",
    mvpP2: 'Built for healthcare, education, sports, finance and services, it aims to reduce language barriers and, in time, support several local African languages — AI built for its context of use, to international standards.',
    caption: 'Fig. 02 — In development',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${c.metaTitle} — ${profile.name}`, description: c.metaDesc };
}

export default async function ExpertisePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  return (
    <>
      <Section>
        <PageHeader index="02" label={c.label} title={c.title} lede={c.lede} />
        <Reveal>
          <SkillGrid locale={locale} />
        </Reveal>
      </Section>

      <Section background="dim">
        <div className={styles.split}>
          <Reveal>
            <div className={styles.image}>
              <Image src="/images/atelier.jpg" alt={c.mvpTitle} width={765} height={567} />
              <span className={`mono ${styles.caption}`}>{c.caption}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="folio">{c.mvpLabel}</span>
              <h2 className={styles.heading}>{c.mvpTitle}</h2>
              <p>{c.mvpP1}</p>
              <p>{c.mvpP2}</p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
