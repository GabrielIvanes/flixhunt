import { getTopRatedMovies } from './services/get-top-rated-movies';
import MoviesSection from './sections/movies-section';
import PaginationSection from './sections/pagination-section';
import FiltersSection from './sections/filters-section';
import { MoviesPageParams } from './types/params.types';
import { Genre } from '@/entities/genre/genre.types';
import { getGenres } from '../medias/services/get-genres';
import { getProviders } from '../medias/services/get-providers';
import { Providers } from '@/entities/media/types/media.types';
import { H3, Muted } from '@/shared/ui/typography';

type Props = {
    moviesPageParams: MoviesPageParams;
};

export default async function MoviesPage({ moviesPageParams }: Props) {
    const language = 'en-US';

    const movies = await getTopRatedMovies(moviesPageParams, language);
    const genres: Genre[] = await getGenres('movie');
    const providers: Providers = await getProviders('movie');

    return (
        <div>
            <FiltersSection
                defaultVoteGte={8000}
                mediaType="movie"
                moviesPageParams={moviesPageParams}
                maxVoteCount={40000}
                stepVoteCount={500}
                genres={genres}
                providers={providers}
            />

            {movies.totalResults > 0 ? (
                <MoviesSection movies={movies} />
            ) : (
                <section className="mx-auto flex min-h-80 max-w-xl flex-col items-center justify-center px-4 text-center">
                    <H3>No results found</H3>
                    <Muted className="mt-2">
                        No movies match these filters. Try removing some of
                        them.
                    </Muted>
                </section>
            )}

            {movies.totalResults > 0 && movies.totalPages > 1 && (
                <PaginationSection
                    defaultPage={moviesPageParams.page}
                    totalPages={movies.totalPages}
                    mediaType="movie"
                />
            )}
        </div>
    );
}
