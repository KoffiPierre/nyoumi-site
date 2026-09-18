/**
 * Social media links shown in the footer.
 *
 * HOW TO EDIT:
 * - To change a URL, edit the `url` value below.
 * - To add Instagram (or any other network), copy one entry, change
 *   `id`, `label`, `url`, and add a matching icon in
 *   components/SocialLinks.tsx (see the comment there).
 * - To remove a network, delete its entry from this array.
 */

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'facebook-1',
    label: 'Facebook',
    url: 'https://www.facebook.com/share/1D4stm2bSh/',
  },
  {
    id: 'facebook-2',
    label: 'Facebook',
    url: 'https://www.facebook.com/share/187P7A1Ydi/',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dieudonn%C3%A9-nyoumi-mballa-33b127267/',
  },
  // Instagram: add the URL here once available, e.g.
  // { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/...' },
];
