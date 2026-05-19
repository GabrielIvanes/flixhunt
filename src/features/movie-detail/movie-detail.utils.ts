import { MovieDetail } from '@/entities/movie/types/movie.types';

export function getReleaseDate(
    movie: MovieDetail,
    countryCode: string
): string | null {
    const releaseDate = movie.releaseDates
        .find((result) => result.iso_3166_1 === countryCode)
        ?.releaseDates?.find(
            (release_date) => release_date.type === 3
        )?.releaseDate;
    return releaseDate
        ? releaseDate.split('-')[0]
        : movie.releaseDate
          ? movie.releaseDate.split('-')[0]
          : null;
}

export function getRuntimeString(runtime: number | null): string | null {
    if (!runtime) return null;

    const hours = Math.floor(runtime / 60);
    const minutes = Math.floor(runtime % 60);

    let duration = '';

    if (hours > 0) duration += `${hours}h`;
    if (minutes > 0) duration += `${minutes}min`;

    return duration;
}

export function getVoteAverage(voteAverage: number | null): number | null {
    if (voteAverage === null) return null;

    return Number(voteAverage.toFixed(1));
}
