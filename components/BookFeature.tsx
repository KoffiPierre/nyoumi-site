import Image from 'next/image';
import { Publication, Locale } from '@/types/content';
import styles from './BookFeature.module.css';

interface BookFeatureProps {
  publication: Publication;
  locale: Locale;
}

export default function BookFeature({ publication }: BookFeatureProps) {
  return (
    <div className={styles.grid}>
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
        <span className="eyebrow">{publication.kind}</span>
        <h2 className={styles.title}>{publication.title}</h2>
        {publication.description.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
