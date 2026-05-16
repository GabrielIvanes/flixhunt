import { Video } from '../video/video.types';

export function getTrailer(videos: Video[]): Video | null {
    const ytbTrailers = videos.filter(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (ytbTrailers.length === 0) return null;

    const firstYtbTrailer = ytbTrailers[0];

    if (ytbTrailers.length === 1) return firstYtbTrailer;

    const ytbOfficialTrailers = ytbTrailers.filter(
        (video) => video.official === true
    );

    if (ytbOfficialTrailers.length === 0) return firstYtbTrailer;

    const firstYtbOfficialTrailer = ytbOfficialTrailers[0];
    if (ytbOfficialTrailers.length === 1) return firstYtbOfficialTrailer;

    const finalTrailers = ytbOfficialTrailers.filter((video) => {
        const name = video.name.toLocaleLowerCase();
        return (
            name.includes('official trailer') ||
            name.includes('main trailer') ||
            name.includes('final trailer') ||
            name.includes('trailer')
        );
    });

    if (finalTrailers.length === 0) return firstYtbOfficialTrailer;
    else return finalTrailers[0];
}
