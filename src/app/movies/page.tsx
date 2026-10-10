import MoviesPage from '@/features/movies/movies-page';
import { MoviesPageParams } from '@/features/movies/types/params.types';

type SearchParams = {
    page?: string;
    with_genres?: string;
    decade?: string;
    year?: string;
    rate_gte?: string;
    rate_lte?: string;
    vote_gte?: string;
    with_providers?: string;
};

export default async function Movies({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    const moviesPageParams: MoviesPageParams = {
        page: params.page ? parseInt(params.page) : 1,
        withGenres: params.with_genres
            ? params.with_genres.split(',').map(Number).filter(Boolean)
            : [],
        decade: params.decade ? parseInt(params.decade) : null,
        year: params.year ? parseInt(params.year) : null,
        rateGte: params.rate_gte ? parseInt(params.rate_gte) : 1,
        rateLte: params.rate_lte ? parseInt(params.rate_lte) : 10,
        voteGte: params.vote_gte ? parseInt(params.vote_gte) : 8000,
        withProviders: params.with_providers
            ? params.with_providers.split('|').map(Number).filter(Boolean)
            : [],
    };

    return (
        <div className="pb-5">
            <MoviesPage moviesPageParams={moviesPageParams} />
        </div>
    );
}
