import { getTopRatedMovies } from '@/lib/movies';
import { Configuration, TMDBResponse } from '@/types/tmdb-interfaces';
import { MovieSummary } from '@/types/movie-interfaces';
import {
    Element as ElementInterface,
    Genre,
    Providers,
} from '@/types/global-interfaces';
import { mediaToElement } from '@/lib/utils';
import { getConfiguration, getGenres, getProviders } from '@/lib/tmdb';
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
    const genres: Genre[] = await getGenres('movie');
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
            movie.id,
            movie.title,
            movie.poster_path
                ? `${configuration.images.secure_base_url}w500${movie.poster_path}`
                : '',
            'movie',
            250,
            250 * 1.5,
            '',
            `${movie.title} ${movie.release_date ? '(' + movie.release_date.split('-')[0] + ')' : ''}`,
            true
        )
    );
    console.log(genres);
    console.log(movies);
    console.log(providers);

    return (
        <div className="pb-5 mt-30">
            <FiltersMedia
                mediaElements={movieElements}
                mediaType="movie"
                genres={genres}
                defaultVoteGte={8000}
                totalPages={movies.total_pages}
                providers={providers}
                showFilters={true}
            />
        </div>
    );
}
