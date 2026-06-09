import { z } from 'zod';
import { TmdbCrewSchema } from '../crew/crew.schema';
import { TmdbGuestStarSchema } from '../cast/cast.schema';

export const TmdbEpisodeBaseSchema = z.object({
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
    still_path: z.string().nullable(),
});

export const TmdbEpisodeSchema = TmdbEpisodeBaseSchema.extend({
    episode_type: z.string().nullable(),
    show_id: z.number(),
});

export const TmdbEpisodeDetailSchema = TmdbEpisodeBaseSchema.extend({
    crew: z.array(TmdbCrewSchema),
    guest_stars: z.array(TmdbGuestStarSchema),
});

export type TmdbEpisodeBaseDto = z.infer<typeof TmdbEpisodeBaseSchema>;
export type TmdbEpisodeDto = z.infer<typeof TmdbEpisodeSchema>;
export type TmdbEpisodeDetailDto = z.infer<typeof TmdbEpisodeDetailSchema>;
