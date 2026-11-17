import { MediaVideo } from '@/lib/content';
import styles from './VideoList.module.css';

export default function VideoList({ videos }: { videos: MediaVideo[] }) {
  if (videos.length === 0) return null;
  return (
    <div className={`${styles.grid} ${videos.length === 1 ? styles.single : ''}`}>
      {videos.map((v) => (
        <figure key={v.src || v.youtubeId} className={styles.item}>
          <div className={styles.frame}>
            {v.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                title={v.caption || 'Vidéo'}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/media-has-caption -- event footage without dialogue transcripts
              <video src={v.src} poster={v.poster || undefined} controls playsInline preload="none" />
            )}
          </div>
          {v.caption && <figcaption>{v.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
