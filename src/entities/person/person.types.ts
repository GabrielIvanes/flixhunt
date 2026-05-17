export type PersonBase = {
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    popularity: number;
    profileUrl: string | null;
};

export type Person = PersonBase & {
    alsoKnownAs: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    homepage: string | null;
    imdbId: string | null;
    placeOfBirth: string | null;
};

export type PersonMovieCastCredit = {
    mediaType: 'movie';
    id: number;
    title: string;
    originalTitle: string;
    overview: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
    character: string;
    creditId: string;
    order: number;
};

export type PersonTvCastCredit = {
    mediaType: 'tv';
    id: number;
    name: string;
    originalName: string;
    overview: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    firstAirDate: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
    originCountry: string[];
    character: string;
    creditId: string;
    episodeCount: number;
};

export type PersonMovieCrewCredit = {
    mediaType: 'movie';
    id: number;
    title: string;
    originalTitle: string;
    overview: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
    creditId: string;
    department: string;
    job: string;
};

export type PersonTvCrewCredit = {
    mediaType: 'tv';
    id: number;
    name: string;
    originalName: string;
    overview: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    firstAirDate: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
    originCountry: string[];
    creditId: string;
    department: string;
    episodeCount: number;
    job: string;
};

export type PersonCombinedCastCredit =
    | PersonMovieCastCredit
    | PersonTvCastCredit;

export type PersonCombinedCrewCredit =
    | PersonMovieCrewCredit
    | PersonTvCrewCredit;

export type PersonDetail = Person & {
    combinedCredits: {
        cast: PersonCombinedCastCredit[];
        crew: PersonCombinedCrewCredit[];
    };
};
