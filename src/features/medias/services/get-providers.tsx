import { mapTmdbProviders } from '@/entities/media/mappers/watch-provider.mapper';
import { TmdbProvidersSchema } from '@/entities/media/schemas/watch-provider.schema';

export async function getProviders(
    mediaType: 'movie' | 'tvshow',
    language?: string,
    region?: string
) {
    const url = new URL(`${process.env.API_BASE_URL}/tmdb/providers`);
    url.searchParams.set('media_type', mediaType);
    if (language) url.searchParams.set('language', language);

    if (region) url.searchParams.set('region', region);
    const response = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    const parsed = TmdbProvidersSchema.parse(json.data);
    const providers = await mapTmdbProviders(parsed);

    return providers;
}
