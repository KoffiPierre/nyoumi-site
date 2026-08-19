import { Locale } from '@/types/content';

export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
