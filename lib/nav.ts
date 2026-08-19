import { Locale } from '@/types/content';
import { getDictionary } from './dictionary';

export interface NavLink {
  href: string;
  label: string;
}

// Paths are locale-agnostic; components prefix them with /{locale}.
export function getNavLinks(locale: Locale): NavLink[] {
  const dict = getDictionary(locale);
  return [
    { href: '/', label: dict.nav.home },
    { href: '/parcours', label: dict.nav.parcours },
    { href: '/expertise', label: dict.nav.expertise },
    { href: '/formation', label: dict.nav.formation },
    { href: '/presse', label: dict.nav.presse },
    { href: '/ouvrage', label: dict.nav.ouvrage },
    { href: '/contact', label: dict.nav.contact },
  ];
}
