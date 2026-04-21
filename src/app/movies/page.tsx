import { getMovieGenres, getTopRatedMovies } from '@/lib/movies';
import { Configuration, TMDBResponse } from '@/types/tmdb-interfaces';
import { MovieSummary } from '@/types/movie-interfaces';
import {
    Element as ElementInterface,
    Genre,
    Providers,
} from '@/types/global-interfaces';
import { mediaToElement } from '@/lib/utils';
import { getConfiguration, getProviders } from '@/lib/tmdb';
import FiltersMedia from '@/components/filters-media';

export default async function Movies({
    searchParams,
}: {
    searchParams: Promise<{
        page: string;
        with_genres: string;
        decade: string;
        year: string;
        rate_gte: string;
        rate_lte: string;
        vote_gte: string;
        with_providers: string;
    }>;
}) {
    const { page } = (await searchParams) || 1;
    const { with_genres } = (await searchParams) || '';
    const { decade } = (await searchParams) || '';
    const { year } = (await searchParams) || '';
    const { rate_gte } = (await searchParams) || '';
    const { rate_lte } = (await searchParams) || '';
    const { vote_gte } = (await searchParams) || '';
    const { with_providers } = (await searchParams) || '';

    const configuration: Configuration = await getConfiguration();
    const genres: Genre[] = await getMovieGenres();
    const providers: Providers = await getProviders('movie');
    const movies: TMDBResponse<MovieSummary> = await getTopRatedMovies(
        '',
        Number(page),
        with_genres,
        decade ? Number(decade) : undefined,
        year ? Number(year) : undefined,
        rate_gte,
        rate_lte,
        vote_gte,
        with_providers
    );
    const movieElements: ElementInterface[] = movies.results.map((movie) =>
        mediaToElement(
            movie,
            'movie',
            configuration,
            250,
            250 * 1.5,
            true,
            false,
            true,
            `${movie.title} ${movie.release_date.split ? '(' + movie.release_date.split('-')[0] + ')' : ''}`
        )
    );
    console.log(providers);

    return (
        <div className="pt-12 pb-5">
            <FiltersMedia
                mediaElements={movieElements}
                genres={genres}
                totalPages={movies.total_pages}
                providers={providers}
            />
        </div>
    );
}
