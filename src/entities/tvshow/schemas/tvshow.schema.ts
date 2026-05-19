import { z } from 'zod';

export const TmdbTvshowBaseSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    id: z.number(),
    name: z.string(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_name: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    first_air_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const TmdbTvshowSchema = TmdbTvshowBaseSchema.extend({
    genre_ids: z.array(z.number()),
});

export type TmdbTvshowBaseDto = z.infer<typeof TmdbTvshowBaseSchema>;
export type TmdbTvshowDto = z.infer<typeof TmdbTvshowSchema>;
