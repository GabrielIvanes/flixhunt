import { mapTmdbGenres } from '@/entities/genre/genre.mapper';
import { TmdbGenresSchema } from '@/entities/genre/genre.schema';

export async function getGenres(
    mediaType: 'movie' | 'tvshow',
    language?: string
) {
    const url = new URL(`${process.env.API_BASE_URL}/tmdb/genres`);
    url.searchParams.set('media_type', mediaType);
    if (language) url.searchParams.set('language', language);
    const response = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    const parsed = TmdbGenresSchema.parse(json.data);

    return mapTmdbGenres(parsed);
}
