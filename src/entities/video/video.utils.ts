import { Video } from './video.types';

export function getYoutubeEmbedUrl(video: Video) {
    return `https://www.youtube.com/embed/${video.key}?autoplay=1`;
}
