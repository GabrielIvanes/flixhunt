export type TvshowsPageParams = {
    page: number;
    withGenres: number[];
    decade: number | null;
    year: number | null;
    rateGte: number;
    rateLte: number;
    voteGte: number;
    withProviders: number[];
};
