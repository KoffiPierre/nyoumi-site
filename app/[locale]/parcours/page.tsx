import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Timeline from '@/components/Timeline';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string }> = {
  fr: {
    label: 'Chronologie',
    title: 'Une trajectoire construite pas à pas.',
    lede: "Du Cameroun au Maroc — ingénierie de terrain, recherche doctorale, formation de cadres et enseignement se sont construits en parallèle, jamais en substitution les uns des autres.",
    metaTitle: 'Parcours',
    metaDesc: "Du Cameroun au Maroc — trajectoire académique et professionnelle de Dieudonné Nyoumi Mballa, entre ingénierie énergétique, blockchain, formation de cadres et recherche doctorale.",
  },
  en: {
    label: 'Timeline',
    title: 'A career built step by step.',
    lede: 'From Cameroon to Morocco — fieldwork engineering, doctoral research, executive training and teaching, built in parallel rather than in succession.',
    metaTitle: 'Career',
    metaDesc: 'From Cameroon to Morocco — the academic and professional path of Dieudonné Nyoumi Mballa, across energy engineering, blockchain, executive training and doctoral research.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${c.metaTitle} — ${profile.name}`, description: c.metaDesc };
}

export default async function ParcoursPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  return (
    <Section>
      <PageHeader index="01" label={c.label} title={c.title} lede={c.lede} />
      <Reveal>
        <Timeline locale={locale} />
      </Reveal>
    </Section>
  );
}
