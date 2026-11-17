'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PhotoGallery.module.css';

interface Photo {
  src: string;
  caption: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  labels: { close: string; prev: string; next: string; of: string };
}

export default function PhotoGallery({ photos, labels }: PhotoGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open, go]);

  if (photos.length === 0) return null;
  const current = index !== null ? photos[index] : null;

  return (
    <>
      <div className={styles.grid}>
        {photos.map((p, i) => (
          <button key={`${p.src}-${i}`} type="button" className={styles.item} onClick={() => setIndex(i)}>
            <Image
              src={p.src}
              alt={p.caption || ''}
              width={1200}
              height={900}
              sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
              className={styles.thumb}
            />
            {p.caption && <span className={styles.caption}>{p.caption}</span>}
          </button>
        ))}
      </div>

      {current && index !== null && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setIndex(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button ref={closeRef} type="button" className={styles.close} aria-label={labels.close} onClick={() => setIndex(null)}>
            ×
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                aria-label={labels.prev}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                aria-label={labels.next}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                ›
              </button>
            </>
          )}
          <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
            <div className={styles.stage}>
              <Image key={current.src} src={current.src} alt={current.caption || ''} fill sizes="100vw" className={styles.full} />
            </div>
            <figcaption className={styles.figcaption}>
              <span className={styles.counter}>
                {index + 1} {labels.of} {photos.length}
              </span>
              {current.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
