'use client';

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

interface LightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: ReactNode;
  triggerClassName?: string;
  closeLabel?: string;
}

export default function Lightbox({ src, alt, width, height, children, triggerClassName, closeLabel = 'Close' }: LightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" className={`${styles.trigger} ${triggerClassName ?? ''}`} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <button type="button" className={styles.close} aria-label={closeLabel} onClick={() => setOpen(false)}>
            ×
          </button>
          <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
            <Image src={src} alt={alt} width={width} height={height} className={styles.image} sizes="90vw" />
          </div>
        </div>
      )}
    </>
  );
}
