import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import ActivityCard from '@/components/ActivityCard';
import ActivityExplorer from '@/components/ActivityExplorer';
import { activityCategories, categoryLabels, getActivities, getProfile } from '@/lib/content';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';

const copy = {
  fr: {
    label: 'Activités',
    title: 'Formations, conférences et rencontres.',
    lede: "Ministères, ports, entreprises et universités : retour en images sur les interventions du Dr Dieudonné Nyoumi Mballa à travers l'Afrique.",
    metaDesc: "Formations de cadres et d'ingénieurs, conférences, rencontres et distinctions du Dr Dieudonné Nyoumi Mballa, en photos et en vidéos.",
  },
  en: {
    label: 'Activities',
    title: 'Training, talks and meetings.',
    lede: "Ministries, ports, companies and universities: Dr Dieudonné Nyoumi Mballa's engagements across Africa, in pictures.",
    metaDesc: 'Executive and engineer training, talks, meetings and distinctions of Dr Dieudonné Nyoumi Mballa, in photos and videos.',
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: `${copy[locale].label} | ${getProfile(locale).name}`, description: copy[locale].metaDesc };
}

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const dict = getDictionary(locale).activities;
  const activities = getActivities(locale);

  const filters = activityCategories
    .map((cat) => ({ value: cat, label: categoryLabels[locale][cat], count: activities.filter((a) => a.category === cat).length }))
    .filter((f) => f.count > 0);

  return (
    <>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />
      <Section>
        <ActivityExplorer
          allLabel={dict.all}
          emptyLabel={dict.empty}
          filters={filters}
          items={activities.map((a, i) => ({
            key: a.slug,
            category: a.category,
            node: <ActivityCard activity={a} locale={locale} priority={i < 3} />,
          }))}
        />
      </Section>
    </>
  );
}
