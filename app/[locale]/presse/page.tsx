import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import PressGrid from '@/components/PressGrid';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string }> = {
  fr: {
    label: 'Revue de presse',
    title: 'Ce que la presse en dit.',
    lede: "Deux portraits signés Angèle Ebassa, parus dans DT News 237, revenant sur son parcours académique et sur l'agent conversationnel qu'il a conçu.",
    metaTitle: 'Presse & médias',
    metaDesc: 'Articles et portraits publiés sur Dieudonné Nyoumi Mballa.',
  },
  en: {
    label: 'Press coverage',
    title: 'What the press says.',
    lede: "Two profiles by Angèle Ebassa, published in DT News 237, covering his academic path and the conversational agent he built.",
    metaTitle: 'Press & media',
    metaDesc: 'Articles and profiles published about Dieudonné Nyoumi Mballa.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${c.metaTitle} — ${profile.name}`, description: c.metaDesc };
}

export default async function PressePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  return (
    <Section>
      <PageHeader index="04" label={c.label} title={c.title} lede={c.lede} />
      <Reveal>
        <PressGrid locale={locale} />
      </Reveal>
    </Section>
  );
}
