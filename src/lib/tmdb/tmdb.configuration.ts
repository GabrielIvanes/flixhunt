import { cache } from 'react';
import { tmdbFetch } from '@/lib/tmdb/tmdb.fetch';
import { TmdbConfigurationSchema } from '@/lib/tmdb/schema/tmdb.configuration.schema';
import { TmdbConfigurationDTO } from './types/tmdb.types';

export const getTmdbConfiguration = cache(async () => {
    const response: { success: boolean; data: TmdbConfigurationDTO } =
        await tmdbFetch('/tmdb/configuration', 86400);

    return TmdbConfigurationSchema.parse(response.data);
});
