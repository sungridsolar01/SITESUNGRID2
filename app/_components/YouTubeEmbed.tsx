import type { SiteVideo } from "./videos";

/**
 * Vídeo do YouTube com carregamento leve: mostra só a miniatura e carrega o player
 * (youtube-nocookie.com, modo de privacidade aprimorada) quando o visitante clica.
 * Sem `id` configurado, não renderiza nada.
 */
export function YouTubeEmbed({ video, pathname }: { video: SiteVideo; pathname: string }) {
  if (!video.id) return null;
  const id = encodeURIComponent(video.id);
  const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const schema = video.uploadDate
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: thumbnail,
        uploadDate: video.uploadDate,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
        contentUrl: watchUrl,
        url: `https://sungridsolar.site${pathname}`,
        publisher: { "@id": "https://sungridsolar.site/#organization" },
      }
    : null;

  return (
    <figure className="video-embed">
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <a className="video-embed-frame" href={watchUrl} target="_blank" rel="noreferrer" data-youtube-id={video.id} data-youtube-title={video.title} aria-label={`Assistir ao vídeo: ${video.title}`}>
        <img src={thumbnail} width="480" height="360" loading="lazy" decoding="async" alt="" />
        <span className="video-play" aria-hidden="true">▶</span>
      </a>
      <figcaption>{video.title}</figcaption>
    </figure>
  );
}
