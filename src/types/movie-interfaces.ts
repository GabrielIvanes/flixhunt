import {Genre, ProductionCompany, ProductionCountry, SpokenLanguage, Video, CountryCode, Provider, WatchOptions} from "@/types/global-interfaces";
import {Cast, Crew} from "@/types/person-interfaces";
import {TMDBResponse} from "@/types/tmdb-interfaces";

export interface MovieSummary {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    }
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credits: {
        cast: Cast[];
        crew: Crew[];
    }
    recommendations: TMDBResponse<MovieSummary & { media_type: string }>;
    release_dates: {
        results: ReleaseDate[];
    }
    videos: {
        id: number;
        results: Video[];
    }
   'watch/providers': {
        id: number;
        results: Record<CountryCode, WatchOptions>
    }
}

interface ReleaseDate {
    iso_3166_1: string;
    release_dates: {
        certification: string;
        descriptors: string[];
        iso_639_1: string;
        note: string;
        release_date: string;
        type: 1 | 2 | 3 | 4 | 5 | 6;
    }[]
}

export type Movie = MovieDetail | MovieSummary;
