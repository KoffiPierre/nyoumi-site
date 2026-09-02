import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Timeline from '@/components/Timeline';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; metaDesc: string }> = {
  fr: {
    label: 'Parcours',
    title: 'Une trajectoire construite pas à pas.',
    lede: "Du Cameroun au Maroc, l'ingénierie de terrain, la recherche doctorale, la formation de cadres et l'enseignement se sont construits en parallèle, jamais l'un au détriment de l'autre.",
    metaTitle: 'Parcours',
    metaDesc: "Le parcours académique et professionnel de Dieudonné Nyoumi Mballa, entre ingénierie énergétique, blockchain, formation de cadres et recherche doctorale.",
  },
  en: {
    label: 'Career',
    title: 'A career built step by step.',
    lede: 'From Cameroon to Morocco, fieldwork engineering, doctoral research, executive training and teaching were built in parallel, never at the expense of one another.',
    metaTitle: 'Career',
    metaDesc: 'The academic and professional path of Dieudonné Nyoumi Mballa, across energy engineering, blockchain, executive training and doctoral research.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${profile.name} | ${c.metaTitle}`, description: c.metaDesc };
}

export default async function ParcoursPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  return (
    <Section>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />
      <Reveal>
        <Timeline locale={locale} />
      </Reveal>
    </Section>
  );
}
