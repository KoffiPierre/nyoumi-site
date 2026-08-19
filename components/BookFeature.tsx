import Image from 'next/image';
import { Publication, Locale } from '@/types/content';
import { getDictionary } from '@/lib/dictionary';
import TitleBlock from './TitleBlock';
import styles from './BookFeature.module.css';

interface BookFeatureProps {
  publication: Publication;
  locale: Locale;
}

export default function BookFeature({ publication, locale }: BookFeatureProps) {
  const dict = getDictionary(locale);

  return (
    <div className={styles.doc}>
      <div className={styles.layout}>
        <div className={styles.cover}>
          <Image
            src="/images/livre-couverture.jpg"
            alt={publication.title}
            width={1344}
            height={1520}
            className={styles.coverImg}
          />
        </div>
        <div className={styles.text}>
          <div className={styles.header}>
            <span className={`mono ${styles.kind}`}>{publication.kind.toUpperCase()}</span>
            <h2 className={styles.title}>{publication.title}</h2>
          </div>
          <div className={styles.body}>
            {publication.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <TitleBlock
        className={styles.titleblock}
        fields={[
          { label: dict.book.type, value: publication.kind, span: 2 },
          { label: dict.book.author, value: publication.author },
          { label: dict.book.language, value: dict.book.languageValue },
        ]}
      />
    </div>
  );
}
