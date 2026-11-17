import { marked } from 'marked';

/** Renders Markdown written in the admin's rich-text editor. */
export default function Markdown({ text, className }: { text: string; className?: string }) {
  if (!text) return null;
  const html = marked.parse(text, { async: false, gfm: true, breaks: false }) as string;
  return <div className={`prose ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
