import { z } from 'zod';

export const TmdbMovieBaseSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const TmdbMovieSchema = TmdbMovieBaseSchema.extend({
    genre_ids: z.array(z.number()),
});

export type TmdbMovieBaseDto = z.infer<typeof TmdbMovieBaseSchema>;
export type TmdbMovieDto = z.infer<typeof TmdbMovieSchema>;
