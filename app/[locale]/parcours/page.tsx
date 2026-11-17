import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Timeline from '@/components/Timeline';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { getCareer, getProfile } from '@/lib/content';
import { Locale } from '@/types/content';

const copy = {
  fr: {
    label: 'Parcours',
    title: 'Une trajectoire construite pas à pas.',
    lede: "Du Cameroun au Maroc, l'ingénierie de terrain, la recherche doctorale, la formation de cadres et l'enseignement se sont construits en parallèle, jamais l'un au détriment de l'autre.",
    metaDesc: "Le parcours académique et professionnel de Dieudonné Nyoumi Mballa, entre ingénierie énergétique, blockchain, formation de cadres et recherche doctorale.",
  },
  en: {
    label: 'Career',
    title: 'A career built step by step.',
    lede: 'From Cameroon to Morocco, fieldwork engineering, doctoral research, executive training and teaching were built in parallel, never at the expense of one another.',
    metaDesc: 'The academic and professional path of Dieudonné Nyoumi Mballa, across energy engineering, blockchain, executive training and doctoral research.',
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: `${copy[locale].label} | ${getProfile(locale).name}`, description: copy[locale].metaDesc };
}

export default async function ParcoursPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  return (
    <>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />
      <Section>
        <Reveal>
          <Timeline steps={getCareer(locale)} />
        </Reveal>
      </Section>
    </>
  );
}
