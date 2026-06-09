import { z } from 'zod';
import { TmdbEpisodeSchema } from '../episode/episode.schema';
import { TmdbCrewSchema } from '../crew/crew.schema';
import { TmdbGuestStarSchema } from '../cast/cast.schema';
import {
    TmdbPersonCastAggregateCreditSchema,
    TmdbPersonCrewAggregateCreditSchema,
} from '../person/person.schema';
import { TmdbWatchProvidersSchema } from '../media/schemas/watch-provider.schema';

export const TmdbSeasonBaseSchema = z.object({
    air_date: z.string().nullable(),
    name: z.string(),
    id: z.number(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    season_number: z.number(),
    vote_average: z.number(),
});

export const TmdbSeasonSchema = TmdbSeasonBaseSchema.extend({
    episode_count: z.number(),
});

export const TmdbSeasonDetailSchema = TmdbSeasonBaseSchema.extend({
    episodes: z.array(
        TmdbEpisodeSchema.extend({
            crew: z.array(TmdbCrewSchema),
            guest_stars: z.array(TmdbGuestStarSchema),
        })
    ),
    networks: z.array(
        z.object({
            id: z.number(),
            logo_path: z.string().nullable(),
            name: z.string(),
            origin_country: z.string(),
        })
    ),
    aggregate_credits: z.object({
        cast: z.array(TmdbPersonCastAggregateCreditSchema),
        crew: z.array(TmdbPersonCrewAggregateCreditSchema),
    }),
    ['watch/providers']: TmdbWatchProvidersSchema,
});

export type TmdbSeasonBaseDto = z.infer<typeof TmdbSeasonBaseSchema>;
export type TmdbSeasonDto = z.infer<typeof TmdbSeasonSchema>;
export type TmdbSeasonDetailDto = z.infer<typeof TmdbSeasonDetailSchema>;
