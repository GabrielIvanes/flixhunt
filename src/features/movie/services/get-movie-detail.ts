import { mapTmdbMovieDetail } from '@/entities/movie/mappers/movie.mapper';
import { TmdbMovieDetailSchema } from '@/entities/movie/schemas/movie-detail.schema';
import { MovieDetail } from '@/entities/movie/types/movie.types';

export async function getMovieDetail(
    movieId: number,
    language?: string
): Promise<MovieDetail> {
    let url = `${process.env.API_BASE_URL}/movies/${movieId}`;

    if (language) url += `?language=${language}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (!json.success)
        throw new Error(json.error ?? 'Failed to fetch movie detail');

    const parsed = TmdbMovieDetailSchema.parse(json.data);

    return mapTmdbMovieDetail(parsed);
}
