import { MovieDetail } from '@/entities/movie/types/movie.types';
import { getMovieDetail } from '../movie/services/get-movie-detail';
import MediaBackdrop from '@/entities/media/components/media-backdrop';
import RecommendationSection from './sections/recommendation-section';
import SimilarSection from './sections/similar-section';
import MovieDetailClient from './movie-detail-client';
import CastSection from './sections/cast-section';
import CrewSection from './sections/crew-section';

type Props = {
    movieId: number;
};

export default async function MovieDetailPage({ movieId }: Props) {
    const movie: MovieDetail = await getMovieDetail(movieId);
    const width: number = 370;
    const countryCode = 'FR';
    console.log(movie);

    return (
        <div>
            <MediaBackdrop src={movie.backdropUrl} alt={movie.title} />
            <MovieDetailClient
                movie={movie}
                width={width}
                countryCode={countryCode}
            />
            <CastSection movie={movie} />
            <CrewSection movie={movie} />
            <RecommendationSection movie={movie} />
            <SimilarSection movie={movie} />
        </div>
    );
}
