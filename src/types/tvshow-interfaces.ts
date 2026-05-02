import {
    CountryCode,
    Genre,
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
    Video,
    WatchOptions,
} from '@/types/global-interfaces';
import { TMDBResponse } from '@/types/tmdb-interfaces';
import {
    CastAggregateCredit,
    CrewAggregateCredit,
} from '@/types/person-interfaces';
import { MovieSummary } from '@/types/movie-interfaces';

export interface TvshowSummary {
    adult: boolean;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}

export interface TvshowDetail {
    adult: boolean;
    backdrop_path: string;
    created_by: CreatedBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode;
    name: string;
    next_episode_to_air: string;
    networks: Network[];
    number_of_episodes: number[];
    number_of_seasons: number[];
    original_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    aggregate_credits: {
        cast: CastAggregateCredit[];
        crew: CrewAggregateCredit[];
        id: number;
    };
    recommendations: TMDBResponse<
        | (MovieSummary & { media_type: 'movie' })
        | (TvshowSummary & { media_type: 'tv' })
    >;
    similar: TMDBResponse<TvshowSummary>;
    videos: {
        id: number;
        results: Video[];
    };
    content_ratings: {
        id: number;
        results: {
            descriptors: string[];
            iso_3166_1: string;
            rating: string;
        };
    };
    'watch/providers': {
        id: number;
        results: Record<CountryCode, WatchOptions>;
    };
}

interface Episode {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
}

interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

interface Network {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export type Tvshow = TvshowDetail | TvshowSummary;
