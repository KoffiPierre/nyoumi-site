/**
 * Shared types. Editable content (profile, career, activities, press,
 * articles, social links) lives as JSON in /content and is read through
 * lib/content.ts. Rarely-changing copy (expertise pillars, skills, book)
 * stays typed in /data.
 */

export type Locale = 'fr' | 'en';


export interface Pillar {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}


export interface SkillGroup {
  id: string;
  eyebrow: string;
  title: string;
  items: string[];
}


export interface Publication {
  id: string;
  kind: string;
  title: string;
  author: string;
  description: string[];
}



