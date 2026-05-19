import { z } from 'zod';

export const TmdbEpisodeSchema = z.object({
    id: z.number(),
    name: z.string(),
    overview: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    air_date: z.string(),
    episode_number: z.number(),
    production_code: z.string(),
    runtime: z.number(),
    season_number: z.number(),
    show_id: z.number(),
    still_path: z.string().nullable(),
});

export type TmdbEpisodeDto = z.infer<typeof TmdbEpisodeSchema>;
