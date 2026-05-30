import { MovieDetail } from '@/entities/movie/types/movie.types';
import MoviesCarousel from '@/features/movie-detail/components/movies-carousel';

type Props = {
    movie: MovieDetail;
};

export default function RecommendationSection({ movie }: Props) {
    return (
        <section className="pb-5">
            <MoviesCarousel
                movies={movie.recommendations.results}
                title="Recommendations"
                loop={false}
            />
        </section>
    );
}
