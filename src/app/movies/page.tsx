
import { getMovieGenres, getTopRatedMovies } from "@/lib/movies";
import { Configuration, TMDBResponse } from "@/types/tmdb-interfaces";
import { MovieSummary } from "@/types/movie-interfaces";
import { Element as ElementInterface, Genre } from "@/types/global-interfaces"
import { mediaToElement } from "@/lib/utils";
import { getConfiguration } from "@/lib/tmdb";
import FiltersMedia from "@/components/filters-media";

export default async function Movies({ searchParams }: { searchParams: Promise<{ page: string, with_genres: string, decade: string, year: string }> }) {

    const { page } = await searchParams || 1;
    const {with_genres} = await searchParams || '';
    const { decade } = await searchParams || '';
    const { year } = await searchParams || '';

    const configuration: Configuration = await getConfiguration();
    const genres: Genre[] = await getMovieGenres();
    const movies: TMDBResponse<MovieSummary> = await getTopRatedMovies('', Number(page), with_genres, decade ? Number(decade) : undefined, year ? Number(year) : undefined);
    const movieElements: ElementInterface[] = movies.results.map((movie) => mediaToElement(movie, 'movie', configuration, 250, 250 * 1.5, true, false, true, `${movie.title} ${movie.release_date.split ? '(' + movie.release_date.split('-')[0] + ')' : ''}`))
    console.log(movies);
    console.log(genres)

    return (
        <div className="pt-12 pb-5">
            <FiltersMedia mediaElements={movieElements} genres={genres} totalPages={movies.total_pages} />
        </div>
    )

}