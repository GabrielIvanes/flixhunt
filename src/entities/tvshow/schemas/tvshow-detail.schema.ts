import { z } from 'zod';

import { TmdbTvshowBaseSchema, TmdbTvshowSchema } from './tvshow.schema';

import { TmdbGenreSchema } from '@/entities/genre/genre.schema';

import { TmdbEpisodeSchema } from '@/entities/episode/episode.schema';

import { TmdbSeasonSchema } from '@/entities/season/season.schema';

import { TmdbVideosSchema } from '@/entities/video/video.schema';

import { CreateTmdbPaginatedResponseSchema } from '@/lib/tmdb/schema/tmdb.schema';

import { TmdbWatchProvidersSchema } from '@/entities/media/watch-provider.schema';
import {
    TmdbPersonCastAggregateCreditSchema,
    TmdbPersonCrewAggregateCreditSchema,
} from '@/entities/person/person.schema';

const TmdbContentRatingSchema = z.object({
    results: z.array(
        z.object({
            descriptors: z.array(z.string()).default([]),
            iso_3166_1: z.string(),
            rating: z.string(),
        })
    ),
});

export const TmdbTvshowDetailSchema = TmdbTvshowBaseSchema.extend({
    created_by: z.array(
        z.object({
            id: z.number(),
            credit_id: z.string(),
            name: z.string(),
            gender: z.number().nullable(),
            profile_path: z.string().nullable(),
        })
    ),

    episode_run_time: z.array(z.number()),

    genres: z.array(TmdbGenreSchema),

    homepage: z.string(),

    in_production: z.boolean(),

    languages: z.array(z.string()),

    last_air_date: z.string(),

    last_episode_to_air: TmdbEpisodeSchema.nullable(),

    next_episode_to_air: TmdbEpisodeSchema.nullable(),

    networks: z.array(
        z.object({
            id: z.number(),
            logo_path: z.string().nullable(),
            name: z.string(),
            origin_country: z.string(),
        })
    ),

    number_of_episodes: z.number(),

    number_of_seasons: z.number(),

    production_companies: z.array(
        z.object({
            id: z.number(),
            logo_path: z.string().nullable(),
            name: z.string(),
            origin_country: z.string(),
        })
    ),

    production_countries: z.array(
        z.object({
            iso_3166_1: z.string(),
            name: z.string(),
        })
    ),

    seasons: z.array(TmdbSeasonSchema),

    spoken_languages: z.array(
        z.object({
            english_name: z.string(),
            iso_639_1: z.string(),
            name: z.string(),
        })
    ),

    status: z.string(),

    tagline: z.string(),

    type: z.string(),

    aggregate_credits: z.object({
        cast: z.array(TmdbPersonCastAggregateCreditSchema),
        crew: z.array(TmdbPersonCrewAggregateCreditSchema),
    }),

    recommendations: CreateTmdbPaginatedResponseSchema(TmdbTvshowSchema),

    similar: CreateTmdbPaginatedResponseSchema(TmdbTvshowSchema),

    videos: TmdbVideosSchema,

    content_ratings: TmdbContentRatingSchema,

    ['watch/providers']: TmdbWatchProvidersSchema,
});

export type TmdbTvshowDetailDto = z.infer<typeof TmdbTvshowDetailSchema>;
