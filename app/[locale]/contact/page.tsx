import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { profileByLocale } from '@/data/profile';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy: Record<Locale, { label: string; title: string; lede: string; metaTitle: string; formTitle: string }> = {
  fr: {
    label: 'Contact',
    title: 'Discutons de votre projet.',
    lede: 'Pour une collaboration, une intervention ou une prise de parole, écrivez directement ou utilisez le formulaire ci-dessous.',
    metaTitle: 'Contact',
    formTitle: 'Envoyer un message',
  },
  en: {
    label: 'Contact',
    title: "Let's discuss your project.",
    lede: 'For a collaboration, a speaking engagement or a talk, write directly or use the form below.',
    metaTitle: 'Contact',
    formTitle: 'Send a message',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = profileByLocale[locale];
  const c = copy[locale];
  return { title: `${profile.name} | ${c.metaTitle}`, description: `${c.metaTitle}, ${profile.name}, ${profile.location}.` };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const profile = profileByLocale[locale];

  const contactLines = [
    { label: locale === 'fr' ? 'Email' : 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: locale === 'fr' ? 'Téléphone' : 'Phone', value: profile.phoneDisplay, href: `tel:${profile.phone}` },
    { label: locale === 'fr' ? 'Localisation' : 'Location', value: profile.address },
    { label: locale === 'fr' ? 'Langues' : 'Languages', value: profile.languages.join(' · ') },
  ];

  return (
    <Section>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />

      <div className={styles.grid}>
        <Reveal>
          <ul className={styles.list}>
            {contactLines.map((line) => (
              <li key={line.label}>
                <span>{line.label}</span>
                {line.href ? <a href={line.href}>{line.value}</a> : <span className={styles.value}>{line.value}</span>}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.formPanel}>
            <h3 className={styles.formTitle}>{c.formTitle}</h3>
            <ContactForm locale={locale} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
