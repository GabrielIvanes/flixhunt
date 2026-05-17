export type Tvshow = {
    adult: boolean;
    backdropUrl: string | null;
    id: number;
    name: string;
    originCountry: string[];
    originalLanguage: string;
    originalName: string;
    overview: string;
    posterUrl: string | null;
    genreIds: number[];
    popularity: number;
    firstAirDate: string;
    voteAverage: number;
    voteCount: number;
};

export type TvshowCardBase = {
    id: number;
    name: string;
    posterUrl: string | null;
};
