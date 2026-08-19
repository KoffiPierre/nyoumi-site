import styles from './TitleBlock.module.css';

export interface TitleBlockField {
  label: string;
  value: string;
  span?: number;
  href?: string;
}

interface TitleBlockProps {
  fields: TitleBlockField[];
  dark?: boolean;
  className?: string;
}

export default function TitleBlock({ fields, dark, className }: TitleBlockProps) {
  return (
    <div className={`${styles.block} ${dark ? styles.dark : ''} ${className ?? ''}`}>
      <div className={styles.row}>
        {fields.map((field) => (
          <div key={field.label} className={styles.cell} style={field.span ? { gridColumn: `span ${field.span}` } : undefined}>
            <span className={`mono ${styles.label}`}>{field.label}</span>
            {field.href ? (
              <a href={field.href} className={`mono ${styles.value}`}>
                {field.value}
              </a>
            ) : (
              <span className={`mono ${styles.value}`}>{field.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
