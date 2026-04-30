import { Genre, Providers } from '@/types/global-interfaces';
import { Configuration } from '@/types/tmdb-interfaces';

export async function getConfiguration() {
    const url = `${process.env.API_BASE_URL}/tmdb/configuration`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const configuration: Configuration = json.data;
        return configuration;
    } else {
        throw new Error(json.error);
    }
}

export async function getProviders(
    mediaType: 'movie' | 'tv',
    language?: string,
    region?: string
) {
    const url = new URL(`${process.env.API_BASE_URL}/tmdb/providers`);
    url.searchParams.set('media_type', mediaType);
    if (language) url.searchParams.set('language', language);

    if (region) url.searchParams.set('region', region);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const providers: Providers = json.data;
        return providers;
    } else {
        throw new Error(json.error);
    }
}

export async function getGenres(mediaType: 'movie' | 'tv', language?: string) {
    const url = new URL(`${process.env.API_BASE_URL}/tmdb/genres`);
    url.searchParams.set('media_type', mediaType);
    if (language) url.searchParams.set('language', language);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = await response.json();

    if (json.success) {
        const genres: Genre[] = json.data.genres;
        return genres;
    } else {
        throw new Error(json.error);
    }
}
