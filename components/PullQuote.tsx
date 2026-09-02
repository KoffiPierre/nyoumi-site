import styles from './PullQuote.module.css';

interface PullQuoteProps {
  text: string;
  attribution?: string;
}

export default function PullQuote({ text, attribution }: PullQuoteProps) {
  return (
    <div className="wrap">
      <blockquote className={styles.quote}>
        <p className={styles.text}>{text}</p>
        {attribution && <cite className={styles.attribution}>{attribution}</cite>}
      </blockquote>
    </div>
  );
}
