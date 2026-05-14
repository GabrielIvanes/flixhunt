import { getTheatreMovies } from '@/features/movie/services/get-theatre-movies';
import MoviesCarousel from '@/features/media/components/movies-carousel';
import { PaginatedResponse } from '@/shared/types/paginated-response.types';
import { Movie } from '@/entities/movie/movie.types';

export default async function TheatreMoviesSection() {
    const theatreMovies: PaginatedResponse<Movie> = await getTheatreMovies();

    return (
        <section>
            <MoviesCarousel
                movies={theatreMovies.results}
                loop={true}
                title="Theatre movies"
            />
        </section>
    );
}
