import { cache } from 'react';
import { tmdbFetch } from '@/lib/tmdb/tmdb.fetch';
import { TmdbConfigurationSchema } from '@/lib/tmdb/schema/tmdb.configuration.schema';
import { TmdbConfigurationDto } from '@/lib/tmdb/schema/tmdb.configuration.schema';

export const getTmdbConfiguration = cache(async () => {
    const response: { success: boolean; data: TmdbConfigurationDto } =
        await tmdbFetch('/tmdb/configuration', 86400);

    return TmdbConfigurationSchema.parse(response.data);
});
