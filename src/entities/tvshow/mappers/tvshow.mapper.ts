import { buildUrl } from '@/lib/tmdb/tmdb.image';

import { mapTmdbGenre } from '@/entities/genre/genre.mapper';

import { mapTmdbEpisode } from '@/entities/episode/episode.mapper';

import { mapTmdbSeason } from '@/entities/season/season.mapper';

import { mapTmdbVideo } from '@/entities/video/video.mapper';

import {
    mapTmdbPersonCastAggregateCredit,
    mapTmdbPersonCrewAggregateCredit,
} from '@/entities/person/person.mapper';
import { TmdbTvshowBaseDto, TmdbTvshowDto } from '../schemas/tvshow.schema';
import { Tvshow, TvshowBase, TvshowDetail } from '../types/tvshow.types';
import { TmdbTvshowDetailDto } from '../schemas/tvshow-detail.schema';
import { mapWatchProviders } from '@/entities/media/mappers/watch-provider.mapper';

export async function mapTmdbTvshowBase(
    dto: TmdbTvshowBaseDto
): Promise<TvshowBase> {
    return {
        adult: dto.adult,

        backdropUrl: await buildUrl(dto.backdrop_path, 'w1280'),

        id: dto.id,

        name: dto.name,

        originCountry: dto.origin_country,

        originalLanguage: dto.original_language,

        originalName: dto.original_name,

        overview: dto.overview,

        posterUrl: await buildUrl(dto.poster_path, 'w500'),

        popularity: dto.popularity,

        firstAirDate: dto.first_air_date,

        voteAverage: dto.vote_average,

        voteCount: dto.vote_count,
    };
}

export async function mapTmdbTvshow(dto: TmdbTvshowDto): Promise<Tvshow> {
    return {
        ...(await mapTmdbTvshowBase(dto)),

        genreIds: dto.genre_ids,
    };
}

export async function mapTmdbTvshowDetail(
    dto: TmdbTvshowDetailDto
): Promise<TvshowDetail> {
    const base = await mapTmdbTvshowBase(dto);

    return {
        ...base,

        createdBy: await Promise.all(
            dto.created_by.map(async (creator) => ({
                id: creator.id,

                creditId: creator.credit_id,

                name: creator.name,

                gender: creator.gender ?? 0,

                profileUrl: await buildUrl(creator.profile_path, 'w500'),
            }))
        ),

        episodeRunTime: dto.episode_run_time,

        genres: dto.genres.map(mapTmdbGenre),

        homepage: dto.homepage,

        inProduction: dto.in_production,

        languages: dto.languages,

        lastAirDate: dto.last_air_date,

        lastEpisodeToAir: dto.last_episode_to_air
            ? await mapTmdbEpisode(dto.last_episode_to_air)
            : null,

        nextEpisodeToAir: dto.next_episode_to_air
            ? await mapTmdbEpisode(dto.next_episode_to_air)
            : null,

        networks: await Promise.all(
            dto.networks.map(async (network) => ({
                id: network.id,

                logoUrl: await buildUrl(network.logo_path, 'w500'),

                name: network.name,

                originCountry: network.origin_country,
            }))
        ),

        productionCompanies: await Promise.all(
            dto.production_companies.map(async (company) => ({
                id: company.id,
                logoUrl: await buildUrl(company.logo_path, 'w500'),
                name: company.name,
                originCountry: company.origin_country,
            }))
        ),

        productionCountries: dto.production_countries.map((country) => ({
            iso_3166_1: country.iso_3166_1,
            name: country.name,
        })),

        spokenLanguages: dto.spoken_languages.map((language) => ({
            englishName: language.english_name,
            iso_639_1: language.iso_639_1,
            name: language.name,
        })),

        numberOfEpisodes: dto.number_of_episodes,

        numberOfSeasons: dto.number_of_seasons,

        seasons: await Promise.all(
            dto.seasons.map((season) => mapTmdbSeason(season, dto.id))
        ),

        status: dto.status,

        tagline: dto.tagline,

        type: dto.type,

        aggregateCredits: {
            cast: await Promise.all(
                dto.aggregate_credits.cast.map(mapTmdbPersonCastAggregateCredit)
            ),

            crew: await Promise.all(
                dto.aggregate_credits.crew.map(mapTmdbPersonCrewAggregateCredit)
            ),
        },

        recommendations: {
            page: dto.recommendations.page,
            totalPages: dto.recommendations.total_pages,
            totalResults: dto.recommendations.total_results,
            results: await Promise.all(
                dto.recommendations.results.map(mapTmdbTvshow)
            ),
        },

        similar: {
            page: dto.similar.page,
            totalPages: dto.similar.total_pages,
            totalResults: dto.similar.total_results,
            results: await Promise.all(dto.similar.results.map(mapTmdbTvshow)),
        },

        videos: dto.videos.results.map(mapTmdbVideo),

        contentRatings: dto.content_ratings.results.map((rating) => ({
            countryCode: rating.iso_3166_1,
            descriptors: rating.descriptors,
            rating: rating.rating,
        })),

        watchProviders: await mapWatchProviders(dto['watch/providers']),
    };
}
