import { buildUrl } from '@/lib/tmdb/tmdb.image';
import {
    TmdbSeasonBaseDto,
    TmdbSeasonDetailDto,
    TmdbSeasonDto,
} from '@/entities/season/season.schema';
import {
    Season,
    SeasonBase,
    SeasonDetail,
} from '@/entities/season/season.types';
import { mapTmdbEpisode } from '../episode/episode.mapper';
import {
    mapTmdbPersonCastAggregateCredit,
    mapTmdbPersonCrewAggregateCredit,
} from '@/entities/person/person.mapper';
import { mapTmdbCrew } from '@/entities/crew/crew.mapper';
import { mapWatchProviders } from '../media/mappers/watch-provider.mapper';
import { mapTmdbGuestStar } from '../cast/cast.mapper';

export async function mapTmdbSeasonBase(
    dto: TmdbSeasonBaseDto
): Promise<SeasonBase> {
    return {
        airDate: dto.air_date,
        id: dto.id,
        name: dto.name,
        overview: dto.overview,
        posterUrl: await buildUrl(dto.poster_path, 'w500'),
        seasonNumber: dto.season_number,
        voteAverage: dto.vote_average,
    };
}

export async function mapTmdbSeason(
    dto: TmdbSeasonDto,
    tvshowId: number
): Promise<Season> {
    return {
        ...(await mapTmdbSeasonBase(dto)),
        episodeCount: dto.episode_count,
        tvshowId: tvshowId,
    };
}

export async function mapTmdbSeasonDetail(
    dto: TmdbSeasonDetailDto,
    tvshowId: number,
    seasonNumber: number
): Promise<SeasonDetail> {
    return {
        ...(await mapTmdbSeasonBase(dto)),
        episodes: await Promise.all(
            dto.episodes.map(async (episode) => ({
                ...(await mapTmdbEpisode(episode)),
                crew: await Promise.all(episode.crew.map(mapTmdbCrew)),
                guestStars: await Promise.all(
                    episode.guest_stars.map(mapTmdbGuestStar)
                ),
                tvshowId: tvshowId,
                seasonNumber: seasonNumber,
            }))
        ),
        networks: await Promise.all(
            dto.networks.map(async (network) => ({
                id: network.id,

                logoUrl: await buildUrl(network.logo_path, 'w500'),

                name: network.name,

                originCountry: network.origin_country,
            }))
        ),
        aggregateCredits: {
            cast: await Promise.all(
                dto.aggregate_credits.cast.map(mapTmdbPersonCastAggregateCredit)
            ),

            crew: await Promise.all(
                dto.aggregate_credits.crew.map(mapTmdbPersonCrewAggregateCredit)
            ),
        },

        watchProviders: await mapWatchProviders(dto['watch/providers']),
    };
}
