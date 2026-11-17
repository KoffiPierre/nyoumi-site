import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import PressGrid from '@/components/PressGrid';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { getPress, getProfile } from '@/lib/content';
import { Locale } from '@/types/content';

const copy = {
  fr: {
    label: 'Presse',
    title: 'Ce que la presse en dit.',
    lede: "Portraits et articles consacrés à son parcours académique et à ses innovations dans l'intelligence artificielle.",
    metaDesc: 'Articles et portraits publiés sur Dieudonné Nyoumi Mballa.',
  },
  en: {
    label: 'Press',
    title: 'What the press says.',
    lede: 'Profiles and articles covering his academic path and his innovations in artificial intelligence.',
    metaDesc: 'Articles and profiles published about Dieudonné Nyoumi Mballa.',
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: `${copy[locale].label} | ${getProfile(locale).name}`, description: copy[locale].metaDesc };
}

export default async function PressePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  return (
    <>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />
      <Section>
        <Reveal>
          <PressGrid articles={getPress(locale)} locale={locale} />
        </Reveal>
      </Section>
    </>
  );
}
