import { getTmdbConfiguration } from '@/lib/tmdb/tmdb.configuration';

export async function buildUrl(path: string | null, size = 'w500') {
    if (!path) return null;

    const configuration = await getTmdbConfiguration();

    return `${configuration.images.secure_base_url}${size}${path}`;
}
