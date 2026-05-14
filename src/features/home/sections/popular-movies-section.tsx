import { getPopularMovies } from '@/features/movie/services/get-popular-movies';
import MoviesCarousel from '@/features/media/components/movies-carousel';

export default async function PopularMoviesSection() {
    const popularMovies = await getPopularMovies();

    return (
        <section>
            <MoviesCarousel
                movies={popularMovies.results}
                title="Popular Movies"
                loop={true}
            />
        </section>
    );
}
