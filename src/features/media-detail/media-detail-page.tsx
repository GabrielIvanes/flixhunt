import { MovieDetail } from '@/entities/movie/types/movie.types';
import { getMovieDetail } from '../movie/services/get-movie-detail';
import MediaBackdrop from '@/entities/media/components/media-backdrop';
import MovieDetailClient from '../movie-detail/movie-detail-client';
import CastSection from '../movie-detail/sections/cast-section';
import CrewSection from '../movie-detail/sections/crew-section';
import RecommendationSection from '../movie-detail/sections/recommendation-section';
import SimilarSection from '../movie-detail/sections/similar-section';

type Props = {
    media: MovieDetail | TvshowDetail
    movieId: number;
};

export default async function MediaDetailPage({ movieId }: Props) {
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
