import type { Cast } from '@/entities/cast/cast.types';
import type { Crew } from '@/entities/crew/crew.types';
import type { Genre } from '@/entities/genre/genre.types';
import {
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
    WatchProviderOptions,
} from '@/entities/media/types/media.types';
import { Video } from '@/entities/video/video.types';
import type { PaginatedResponse } from '@/shared/types/paginated-response.types';

export type MovieBase = {
    adult: boolean;
    backdropUrl: string | null;
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterUrl: string | null;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
};

export type Movie = MovieBase & {
    genreIds: number[];
};

export type MovieCollection = {
    id: number;
    name: string;
    posterUrl: string | null;
    backdropUrl: string | null;
};

export type ReleaseDate = {
    iso_3166_1: string;
    releaseDates: {
        certification: string;
        descriptors: string[];
        iso_639_1: string | null;
        note: string | null;
        releaseDate: string;
        type: number;
    }[];
};

export type MovieDetail = MovieBase & {
    belongsToCollection: MovieCollection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdbId: string | null;
    originCountry: string[];
    productionCompanies: ProductionCompany[];
    productionCountries: ProductionCountry[];
    revenue: number;
    runtime: number | null;
    spokenLanguages: SpokenLanguage[];
    status: string;
    tagline: string;

    credits: {
        cast: Cast[];
        crew: Crew[];
    };

    similar: PaginatedResponse<Movie>;
    recommendations: PaginatedResponse<Movie>;

    releaseDates: ReleaseDate[];

    videos: Video[];

    watchProviders: Record<string, WatchProviderOptions>;
};
