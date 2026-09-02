import styles from './PageHeader.module.css';

interface PageHeaderProps {
  label: string;
  title: string;
  lede: string;
}

export default function PageHeader({ label, title, lede }: PageHeaderProps) {
  return (
    <div className={styles.wrap}>
      <span className="eyebrow">{label}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
    </div>
  );
}
