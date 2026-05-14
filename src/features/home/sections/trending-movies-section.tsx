import { getTrendingMovies } from '@/features/movie/services/get-trending-movies';
import MoviesCarousel from '@/features/media/components/movies-carousel';

export default async function TrendingMoviesSection() {
    const trendingMovies = await getTrendingMovies();

    return (
        <section>
            <MoviesCarousel
                movies={trendingMovies.results}
                loop={true}
                title="Trending movies this week"
            />
        </section>
    );
}
