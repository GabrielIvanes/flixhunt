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

export const TmdbProvidersSchema = z.object({
    results: z.array(
        z.object({
            display_priorities: z.record(z.string(), z.number()),
            logo_path: z.string().nullable(),
            provider_id: z.number(),
            provider_name: z.string(),
            display_priority: z.number(),
        })
    ),
});

export type TmdbWatchProvidersDto = z.infer<typeof TmdbWatchProvidersSchema>;
export type TmdbProvidersDto = z.infer<typeof TmdbProvidersSchema>;
