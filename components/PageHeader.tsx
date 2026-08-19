import Folio from './Folio';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  index: string;
  label: string;
  title: string;
  lede: string;
}

export default function PageHeader({ index, label, title, lede }: PageHeaderProps) {
  return (
    <div className={styles.wrap}>
      <Folio index={index} label={label} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
    </div>
  );
}
