import {Genre} from "@/types/global-interfaces";
import {Cast, Crew} from "@/types/person-interfaces";
import {TMDBResponse} from "@/types/tmdb-interfaces";

export interface Movie {
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
    recommendations: TMDBResponse<Movie>;
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

interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
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

interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

type CountryCode =
    | "AE" | "AL" | "AR" | "AT" | "AU" | "BA" | "BB" | "BE" | "BG" | "BH"
    | "BO" | "BR" | "BS" | "CA" | "CH" | "CL" | "CO" | "CR" | "CV" | "CZ"
    | "DE" | "DK" | "DO" | "EC" | "EE" | "EG" | "ES" | "FI" | "FJ" | "FR"
    | "GB" | "GF" | "GI" | "GR" | "GT" | "HK" | "HN" | "HR" | "HU" | "ID"
    | "IE" | "IL" | "IN" | "IQ" | "IS" | "IT" | "JM" | "JO" | "JP" | "KR"
    | "KW" | "LB" | "LI" | "LT" | "LV" | "MD" | "MK" | "MT" | "MU" | "MX"
    | "MY" | "MZ" | "NL" | "NO" | "NZ" | "OM" | "PA" | "PE" | "PH" | "PK"
    | "PL" | "PS" | "PT" | "PY" | "QA" | "RO" | "RS" | "RU" | "SA" | "SE"
    | "SG" | "SI" | "SK" | "SM" | "SV" | "TH" | "TR" | "TT" | "TW" | "UG"
    | "US" | "UY" | "VE" | "YE" | "ZA"

export interface Provider {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
}

export interface WatchOptions {
    link: string
    flatrate: Provider[]
    rent: Provider[]
    buy: Provider[]
}