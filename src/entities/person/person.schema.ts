import { z } from 'zod';

export const TmdbPersonBaseSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
});

const TmdbPersonMovieCastCreditSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
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
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
    media_type: z.literal('movie'),
});

const TmdbPersonTvCastCreditSchema = z.object({
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
    character: z.string(),
    credit_id: z.string(),
    episode_count: z.number(),
    media_type: z.literal('tv'),
});

const TmdbPersonMovieCrewCreditSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
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
    credit_id: z.string(),
    department: z.string(),
    job: z.string(),
    media_type: z.literal('movie'),
});

const TmdbPersonTvCrewCreditSchema = z.object({
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
    credit_id: z.string(),
    department: z.string(),
    episode_count: z.number(),
    job: z.string(),
    media_type: z.literal('tv'),
});

export const TmdbPersonCombinedCastCreditSchema = z.discriminatedUnion(
    'media_type',
    [TmdbPersonMovieCastCreditSchema, TmdbPersonTvCastCreditSchema]
);

export const TmdbPersonCombinedCrewCreditSchema = z.discriminatedUnion(
    'media_type',
    [TmdbPersonMovieCrewCreditSchema, TmdbPersonTvCrewCreditSchema]
);

export const TmdbPersonDetailSchema = TmdbPersonBaseSchema.extend({
    also_known_as: z.array(z.string()),
    biography: z.string(),
    birthday: z.string().nullable(),
    deathday: z.string().nullable(),
    homepage: z.string().nullable(),
    imdb_id: z.string().nullable(),
    place_of_birth: z.string().nullable(),
    combined_credits: z.object({
        cast: z.array(TmdbPersonCombinedCastCreditSchema),
        crew: z.array(TmdbPersonCombinedCrewCreditSchema),
    }),
});

export type TmdbPersonDetailDto = z.infer<typeof TmdbPersonDetailSchema>;
export type TmdbPersonCombinedCastCreditDto = z.infer<
    typeof TmdbPersonCombinedCastCreditSchema
>;
export type TmdbPersonCombinedCrewCreditDto = z.infer<
    typeof TmdbPersonCombinedCrewCreditSchema
>;
