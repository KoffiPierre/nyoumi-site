import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import SocialLinks from '@/components/SocialLinks';
import { getProfile, getSocialLinks } from '@/lib/content';
import { Locale } from '@/types/content';
import styles from './page.module.css';

const copy = {
  fr: {
    label: 'Contact',
    title: 'Discutons de votre projet.',
    lede: 'Formation de cadres ou d’ingénieurs, conférence, accompagnement de projet IA ou blockchain : écrivez directement ou utilisez le formulaire.',
    formTitle: 'Envoyer un message',
    email: 'Email',
    phone: 'Téléphone',
    location: 'Adresse',
    languages: 'Langues',
    social: 'Réseaux',
  },
  en: {
    label: 'Contact',
    title: "Let's discuss your project.",
    lede: 'Executive or engineer training, a talk, support for an AI or blockchain project: write directly or use the form.',
    formTitle: 'Send a message',
    email: 'Email',
    phone: 'Phone',
    location: 'Address',
    languages: 'Languages',
    social: 'Social',
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const profile = getProfile(locale);
  return { title: `${copy[locale].label} | ${profile.name}`, description: copy[locale].lede };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = copy[locale];
  const profile = getProfile(locale);
  const social = getSocialLinks();

  const lines = [
    { label: c.email, value: profile.email, href: `mailto:${profile.email}` },
    { label: c.phone, value: profile.phoneDisplay, href: `tel:${profile.phone}` },
    { label: c.location, value: profile.address },
    { label: c.languages, value: profile.languages },
  ].filter((l) => l.value);

  return (
    <>
      <PageHeader label={c.label} title={c.title} lede={c.lede} />
      <Section>
        <div className={styles.grid}>
          <Reveal>
            <div className={styles.card}>
              <ul className={styles.list}>
                {lines.map((line) => (
                  <li key={line.label}>
                    <span>{line.label}</span>
                    {line.href ? <a href={line.href}>{line.value}</a> : <strong>{line.value}</strong>}
                  </li>
                ))}
              </ul>
              {social.length > 0 && (
                <div className={styles.social}>
                  <span>{c.social}</span>
                  <SocialLinks links={social} />
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={styles.formPanel}>
              <h2 className={styles.formTitle}>{c.formTitle}</h2>
              <ContactForm locale={locale} email={profile.email} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
