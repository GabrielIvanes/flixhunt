import { mapTmdbMovie } from '@/entities/movie/mappers/movie.mapper';
import { TmdbMoviesPaginatedResponseSchema } from '@/lib/tmdb/schema/tmdb.schema';
import { MoviesPageParams } from '../types/params.types';

export async function getTopRatedMovies(
    moviesPageParams: MoviesPageParams,
    language?: string
) {
    const url = new URL(`${process.env.API_BASE_URL}/movies/top-rated`);

    if (language) url.searchParams.set('language', language);
    url.searchParams.set('page', moviesPageParams.page.toString());
    if (moviesPageParams.withGenres.length > 0)
        url.searchParams.set(
            'with_genres',
            moviesPageParams.withGenres.join(',')
        );
    if (moviesPageParams.decade !== null)
        url.searchParams.set('decade', moviesPageParams.decade.toString());
    if (moviesPageParams.year !== null)
        url.searchParams.set('year', moviesPageParams.year.toString());
    url.searchParams.set('rate_gte', moviesPageParams.rateGte.toString());
    url.searchParams.set('rate_lte', moviesPageParams.rateLte.toString());
    url.searchParams.set('vote_gte', moviesPageParams.voteGte.toString());
    if (moviesPageParams.withProviders.length > 0)
        url.searchParams.set(
            'with_providers',
            moviesPageParams.withProviders.join('|')
        );

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
