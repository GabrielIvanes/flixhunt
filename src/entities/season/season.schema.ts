import { z } from 'zod';

export const TmdbSeasonSchema = z.object({
    air_date: z.string().nullable(),
    episode_count: z.number(),
    id: z.number(),
    name: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    season_number: z.number(),
    vote_average: z.number(),
});

export type TmdbSeasonDto = z.infer<typeof TmdbSeasonSchema>;
