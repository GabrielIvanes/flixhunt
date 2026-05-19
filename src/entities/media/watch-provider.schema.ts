import { z } from 'zod';
import { TmdbProviderSchema } from '@/entities/provider/provider.schema';

const TmdbWatchProviderOptionsSchema = z.object({
    link: z.string(),
    flatrate: z.array(TmdbProviderSchema).optional(),
    rent: z.array(TmdbProviderSchema).optional(),
    buy: z.array(TmdbProviderSchema).optional(),
    ads: z.array(TmdbProviderSchema).optional(),
    free: z.array(TmdbProviderSchema).optional(),
});

export const TmdbWatchProvidersSchema = z.object({
    results: z.record(z.string(), TmdbWatchProviderOptionsSchema),
});

export type TmdbWatchProvidersDto = z.infer<typeof TmdbWatchProvidersSchema>;
