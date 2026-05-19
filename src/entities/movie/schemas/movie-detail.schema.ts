import { z } from 'zod';

import { TmdbCastSchema } from '@/entities/cast/cast.schema';
import { TmdbCrewSchema } from '@/entities/crew/crew.schema';
import { CreateTmdbPaginatedResponseSchema } from '@/lib/tmdb/schema/tmdb.schema';
import { TmdbWatchProvidersSchema } from '@/entities/media/watch-provider.schema';
import {
    TmdbMovieBaseSchema,
    TmdbMovieSchema,
} from '@/entities/movie/schemas/movie.schema';
import { TmdbVideosSchema } from '@/entities/video/video.schema';

export const TmdbMovieDetailSchema = TmdbMovieBaseSchema.extend({
    belongs_to_collection: z
        .object({
            id: z.number(),
            name: z.string(),
            poster_path: z.string().nullable(),
            backdrop_path: z.string().nullable(),
        })
        .nullable(),

    budget: z.number(),

    genres: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ),

    homepage: z.string(),
    imdb_id: z.string().nullable(),
    origin_country: z.array(z.string()).optional(),
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
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(
        z.object({
            english_name: z.string(),
            iso_639_1: z.string(),
            name: z.string(),
        })
    ),
    status: z.string(),
    tagline: z.string(),

    credits: z.object({
        cast: z.array(TmdbCastSchema),
        crew: z.array(TmdbCrewSchema),
    }),

    videos: TmdbVideosSchema,

    similar: CreateTmdbPaginatedResponseSchema(TmdbMovieSchema),

    recommendations: CreateTmdbPaginatedResponseSchema(TmdbMovieSchema),

    release_dates: z.object({
        results: z.array(
            z.object({
                iso_3166_1: z.string(),
                release_dates: z.array(
                    z.object({
                        certification: z.string(),
                        descriptors: z.array(z.string()).optional(),
                        iso_639_1: z.string().optional(),
                        note: z.string().optional(),
                        release_date: z.string(),
                        type: z.number(),
                    })
                ),
            })
        ),
    }),

    ['watch/providers']: TmdbWatchProvidersSchema,
});

export type TmdbMovieDetailDto = z.infer<typeof TmdbMovieDetailSchema>;
