import { mapTmdbMovie } from '@/entities/movie/movie.mapper';
import { TmdbMoviesPaginatedResponseSchema } from '@/lib/tmdb/schema/tmdb.movie.schema';

export async function getPopularMovies(
    language?: string,
    page?: number,
    region?: string
) {
    let url = `${process.env.API_BASE_URL}/movies/popular`;
    if (language) {
        if (url.includes('?')) url += `&language=${language}`;
        else url += `?language=${language}`;
    }
    if (page) {
        if (url.includes('?')) url += `&page=${page}`;
        else url += `?page=${page}`;
    }
    if (region) {
        if (url.includes('?')) url += `&region=${region}`;
        else url += `?region=${region}`;
    }

    const response = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    const parsed = TmdbMoviesPaginatedResponseSchema.parse(json.data);
    const results = await Promise.all(parsed.results.map(mapTmdbMovie));

    return {
        page: parsed.page,
        totalPages: parsed.total_pages,
        totalResults: parsed.total_results,
        results,
    };
}
