import { z } from 'zod';

export const TmdbProviderSchema = z.object({
    display_priority: z.number().optional(),
    logo_path: z.string().nullable(),
    provider_id: z.number(),
    provider_name: z.string(),
});

export type TmdbProviderDto = z.infer<typeof TmdbProviderSchema>;
