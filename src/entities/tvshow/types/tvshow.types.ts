import { Episode } from '@/entities/episode/episode.types';
import { Genre } from '@/entities/genre/genre.types';
import {
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
    WatchProviderOptions,
} from '@/entities/media/types/media.types';
import {
    PersonCastAggregateCredit,
    PersonCrewAggregateCredit,
} from '@/entities/person/person.types';
import { Season } from '@/entities/season/season.types';
import { Video } from '@/entities/video/video.types';
import { PaginatedResponse } from '@/shared/types/paginated-response.types';

export type TvshowBase = {
    adult: boolean;
    backdropUrl: string | null;
    id: number;
    name: string;
    originCountry: string[];
    originalLanguage: string;
    originalName: string;
    overview: string;
    posterUrl: string | null;
    popularity: number;
    firstAirDate: string;
    voteAverage: number;
    voteCount: number;
};

export type Tvshow = TvshowBase & {
    genreIds: number[];
};

export type TvshowDetail = TvshowBase & {
    createdBy: CreatedBy[];
    episodeRunTime: number[];
    genres: Genre[];
    homepage: string;
    inProduction: boolean;
    languages: string[];
    lastAirDate: string;
    lastEpisodeToAir: Episode | null;
    nextEpisodeToAir: Episode | null;
    networks: Network[];
    numberOfEpisodes: number;
    numberOfSeasons: number;
    productionCompanies: ProductionCompany[];
    productionCountries: ProductionCountry[];
    seasons: Season[];
    spokenLanguages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    voteAverage: number;
    voteCount: number;

    aggregateCredits: {
        cast: PersonCastAggregateCredit[];
        crew: PersonCrewAggregateCredit[];
    };

    recommendations: PaginatedResponse<Tvshow>;
    similar: PaginatedResponse<Tvshow>;

    videos: Video[];

    contentRatings: ContentRating[];

    watchProviders: Record<string, WatchProviderOptions>;
};

type CreatedBy = {
    id: number;
    creditId: string;
    name: string;
    gender: number;
    profileUrl: string | null;
};

type Network = {
    id: number;
    logoUrl: string | null;
    name: string;
    originCountry: string;
};

export type ContentRating = {
    countryCode: string;
    descriptors: string[];
    rating: string;
};
