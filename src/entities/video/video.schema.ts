import { z } from 'zod';

export const TmdbVideoSchema = z.object({
    id: z.string(),
    iso_639_1: z.string(),
    iso_3166_1: z.string(),
    key: z.string(),
    name: z.string(),
    site: z.string(),
    size: z.number(),
    type: z.string(),
    official: z.boolean(),
    published_at: z.string(),
});

export const TmdbVideosSchema = z.object({
    results: z.array(TmdbVideoSchema),
});

export type TmdbVideoDto = z.infer<typeof TmdbVideoSchema>;
export type TmdbVideosDto = z.infer<typeof TmdbVideosSchema>;
