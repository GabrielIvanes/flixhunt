import { MovieSummary } from '@/types/movie-interfaces';
import { PersonSummary } from '@/types/person-interfaces';
import { TMDBResponse } from '@/types/tmdb-interfaces';
import { TvshowSummary } from '@/types/tvshow-interfaces';

export function searchMedia(
    query: string,
    media: 'movies'
): Promise<TMDBResponse<MovieSummary>>;

export function searchMedia(
    query: string,
    media: 'tvs'
): Promise<TMDBResponse<TvshowSummary>>;

export function searchMedia(
    query: string,
    media: 'persons'
): Promise<TMDBResponse<PersonSummary>>;

export function searchMedia(
    query: string,
    media: 'multi'
): Promise<
    TMDBResponse<
        | (MovieSummary & { media_type: 'movie' })
        | (TvshowSummary & { media_type: 'tv' })
        | (PersonSummary & { media_type: 'person' })
    >
>;

export async function searchMedia(
    query: string,
    media: 'movies' | 'tvs' | 'persons' | 'multi',
    language?: string,
    page?: number
) {
    const url = new URL(`${process.env.API_BASE_URL}/search/${media}`);
    url.searchParams.set('query', query);
    if (language) url.searchParams.set('language', language);
    if (page) url.searchParams.set('page', page.toString());
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        return json.data;
    } else {
        throw new Error(json.error);
    }
}
