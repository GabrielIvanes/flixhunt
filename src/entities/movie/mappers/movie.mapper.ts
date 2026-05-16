import { mapTmdbCast } from '@/entities/cast/cast.mapper';
import { mapTmdbCrew } from '@/entities/crew/crew.mapper';
import { mapTmdbGenre } from '@/entities/genre/genre.mapper';
import { mapTmdbProvider } from '@/entities/provider/provider.mapper';
import type {
    Movie,
    MovieDetail,
    WatchProviderOptions,
} from '@/entities/movie/types/movie.types';
import type {
    TmdbMovieBaseDto,
    TmdbMovieDto,
} from '@/entities/movie/schemas/movie.schema';
import type { TmdbMovieDetailDto } from '@/entities/movie/schemas/movie.detail.schema';
import { buildUrl } from '@/lib/tmdb/tmdb.image';
import { mapTmdbVideo } from '@/entities/video/video.mapper';

async function mapTmdbMovieBase(dto: TmdbMovieBaseDto) {
    return {
        adult: dto.adult,
        backdropUrl: await buildUrl(dto.backdrop_path, 'w1280'),
        id: dto.id,
        originalLanguage: dto.original_language,
        originalTitle: dto.original_title,
        overview: dto.overview,
        popularity: dto.popularity,
        posterUrl: await buildUrl(dto.poster_path, 'w500'),
        releaseDate: dto.release_date,
        title: dto.title,
        video: dto.video,
        voteAverage: dto.vote_average,
        voteCount: dto.vote_count,
    };
}

export async function mapTmdbMovie(dto: TmdbMovieDto): Promise<Movie> {
    const baseMovie = await mapTmdbMovieBase(dto);

    return {
        ...baseMovie,
        genreIds: dto.genre_ids,
    };
}

async function mapWatchProviders(
    providers: TmdbMovieDetailDto['watch/providers']
): Promise<Record<string, WatchProviderOptions>> {
    const entries = await Promise.all(
        Object.entries(providers.results).map(
            async ([countryCode, options]) => {
                return [
                    countryCode,
                    {
                        link: options.link,
                        flatrate: await Promise.all(
                            (options.flatrate ?? []).map(mapTmdbProvider)
                        ),
                        rent: await Promise.all(
                            (options.rent ?? []).map(mapTmdbProvider)
                        ),
                        buy: await Promise.all(
                            (options.buy ?? []).map(mapTmdbProvider)
                        ),
                        ads: await Promise.all(
                            (options.ads ?? []).map(mapTmdbProvider)
                        ),
                        free: await Promise.all(
                            (options.free ?? []).map(mapTmdbProvider)
                        ),
                    },
                ] as const;
            }
        )
    );

    return Object.fromEntries(entries);
}

export async function mapTmdbMovieDetail(
    dto: TmdbMovieDetailDto
): Promise<MovieDetail> {
    const baseMovie = await mapTmdbMovieBase(dto);

    return {
        ...baseMovie,

        belongsToCollection: dto.belongs_to_collection
            ? {
                  id: dto.belongs_to_collection.id,
                  name: dto.belongs_to_collection.name,
                  posterUrl: await buildUrl(
                      dto.belongs_to_collection.poster_path,
                      'w500'
                  ),
                  backdropUrl: await buildUrl(
                      dto.belongs_to_collection.backdrop_path,
                      'w1280'
                  ),
              }
            : null,

        budget: dto.budget,
        genres: dto.genres.map(mapTmdbGenre),
        homepage: dto.homepage,
        imdbId: dto.imdb_id,
        originCountry: dto.origin_country ?? [],

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

        revenue: dto.revenue,
        runtime: dto.runtime,

        spokenLanguages: dto.spoken_languages.map((language) => ({
            englishName: language.english_name,
            iso_639_1: language.iso_639_1,
            name: language.name,
        })),

        status: dto.status,
        tagline: dto.tagline,

        credits: {
            cast: await Promise.all(dto.credits.cast.map(mapTmdbCast)),
            crew: await Promise.all(dto.credits.crew.map(mapTmdbCrew)),
        },

        similar: {
            page: dto.similar.page,
            totalPages: dto.similar.total_pages,
            totalResults: dto.similar.total_results,
            results: await Promise.all(dto.similar.results.map(mapTmdbMovie)),
        },

        recommendations: {
            page: dto.recommendations.page,
            totalPages: dto.recommendations.total_pages,
            totalResults: dto.recommendations.total_results,
            results: await Promise.all(
                dto.recommendations.results.map(mapTmdbMovie)
            ),
        },

        releaseDates: dto.release_dates.results.map((releaseDate) => ({
            iso_3166_1: releaseDate.iso_3166_1,
            releaseDates: releaseDate.release_dates.map((item) => ({
                certification: item.certification,
                descriptors: item.descriptors ?? [],
                iso_639_1: item.iso_639_1 ?? null,
                note: item.note ?? null,
                releaseDate: item.release_date,
                type: item.type,
            })),
        })),

        videos: dto.videos.results.map(mapTmdbVideo),

        watchProviders: await mapWatchProviders(dto['watch/providers']),
    };
}
