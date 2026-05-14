import { z } from 'zod';

export const TmdbTvshowSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_name: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    first_air_date: z.string(),
    name: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
});
