import styles from './PullQuote.module.css';

interface PullQuoteProps {
  text: string;
  attribution?: string;
  tag?: string;
}

export default function PullQuote({ text, attribution, tag = 'NOTE' }: PullQuoteProps) {
  return (
    <div className="wrap">
      <div className={styles.box}>
        <span className={`mono ${styles.tag}`}>{tag}</span>
        <p className={styles.text}>{text}</p>
        {attribution && <p className={`mono ${styles.attribution}`}>— {attribution}</p>}
      </div>
    </div>
  );
}
