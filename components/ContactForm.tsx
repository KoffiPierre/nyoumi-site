'use client';

import { useState, FormEvent } from 'react';
import { profileByLocale } from '@/data/profile';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/types/content';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  locale: Locale;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: '', email: '', subject: '', message: '' };

export default function ContactForm({ locale }: ContactFormProps) {
  const profile = profileByLocale[locale];
  const dict = getDictionary(locale);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = dict.contactForm.errorName;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = dict.contactForm.errorEmail;
    if (!form.message.trim()) next.message = dict.contactForm.errorMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(form.subject || `${dict.contactForm.subject} — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className="mono">{dict.contactForm.name}</span>
          <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} />
          {errors.name && <em className={styles.error}>{errors.name}</em>}
        </label>

        <label className={styles.field}>
          <span className="mono">{dict.contactForm.email}</span>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <em className={styles.error}>{errors.email}</em>}
        </label>
      </div>

      <label className={styles.field}>
        <span className="mono">{dict.contactForm.subject}</span>
        <input type="text" value={form.subject} onChange={(e) => update('subject', e.target.value)} />
      </label>

      <label className={styles.field}>
        <span className="mono">{dict.contactForm.message}</span>
        <textarea rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} aria-invalid={!!errors.message} />
        {errors.message && <em className={styles.error}>{errors.message}</em>}
      </label>

      <button type="submit" className="btn btn-primary">
        {sent ? dict.contactForm.sent : dict.contactForm.send}
      </button>
    </form>
  );
}
