import { MovieSummary, MovieDetail, Movie } from '@/types/movie-interfaces';
import { TvshowSummary, TvshowDetail, Tvshow } from '@/types/tvshow-interfaces';

export interface Element {
    id: number;
    image: string;
    width: number;
    height: number;
    tooltip: string;
    name: string;
    type: string;
    isTooltip: boolean;
    isName: boolean;
    isClickable: boolean;
}

export type ElementType = 'provider' | 'movie' | 'person' | 'tv-show';

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Video {
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

export type CountryCode =
    | 'AE'
    | 'AL'
    | 'AR'
    | 'AT'
    | 'AU'
    | 'BA'
    | 'BB'
    | 'BE'
    | 'BG'
    | 'BH'
    | 'BO'
    | 'BR'
    | 'BS'
    | 'CA'
    | 'CH'
    | 'CL'
    | 'CO'
    | 'CR'
    | 'CV'
    | 'CZ'
    | 'DE'
    | 'DK'
    | 'DO'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'ES'
    | 'FI'
    | 'FJ'
    | 'FR'
    | 'GB'
    | 'GF'
    | 'GI'
    | 'GR'
    | 'GT'
    | 'HK'
    | 'HN'
    | 'HR'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IN'
    | 'IQ'
    | 'IS'
    | 'IT'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KR'
    | 'KW'
    | 'LB'
    | 'LI'
    | 'LT'
    | 'LV'
    | 'MD'
    | 'MK'
    | 'MT'
    | 'MU'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NL'
    | 'NO'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PS'
    | 'PT'
    | 'PY'
    | 'QA'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'SA'
    | 'SE'
    | 'SG'
    | 'SI'
    | 'SK'
    | 'SM'
    | 'SV'
    | 'TH'
    | 'TR'
    | 'TT'
    | 'TW'
    | 'UG'
    | 'US'
    | 'UY'
    | 'VE'
    | 'YE'
    | 'ZA';

export interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

export interface Providers {
    results: {
        display_priorities: Record<CountryCode, number>;
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
    }[];
}

export interface WatchOptions {
    link: string;
    flatrate: Provider[];
    rent: Provider[];
    buy: Provider[];
}

export interface MediaCastCredit {
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
    character: string;
    credit_id: string;
    order: number;
    media_type: string;
}

export interface MediaCrewCredit {
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
    credit_id: string;
    department: string;
    job: string;
    media_type: string;
}

export interface MediaActions {
    showVideo: boolean;
    isFavorite: boolean;
    isWatchlist: boolean;
    isWatched: boolean;
    isTheatreWatched: boolean;
    list: number[] | null;
    comment: string | null;
}

export type MediaPersonCredit = MediaCastCredit | MediaCrewCredit;

export type Media = Movie | Tvshow | MediaPersonCredit;
