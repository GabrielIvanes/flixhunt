import MovieCard from '@/entities/movie/components/movie-card';
import { Movie } from '@/entities/movie/types/movie.types';
import { PaginatedResponse } from '@/shared/types/paginated-response.types';

type Props = {
    movies: PaginatedResponse<Movie>;
};

export default function MoviesSection({ movies }: Props) {
    return (
        <section className="flex flex-wrap gap-4 justify-center">
            {movies.results.map((movie) => (
                <div key={movie.id}>
                    <MovieCard
                        movie={movie}
                        href={`/movies/${movie.id}`}
                        info={`${movie.title}${movie.releaseDate ? ` (${movie.releaseDate.split('-')[0]})` : ''}`}
                        width={250}
                    />
                </div>
            ))}
        </section>
    );
}
