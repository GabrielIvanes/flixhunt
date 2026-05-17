import MovieCard from '@/entities/movie/components/movie-card';
import { MovieDetail } from '@/entities/movie/types/movie.types';
import MovieMetadata from '@/features/movie-detail/components/movie-metadata';
import { H1, Lead } from '@/shared/ui/typography';
import {
    getReleaseDate,
    getRuntimeString,
    getVoteAverage,
} from '../movie-detail.utils';
import MovieDirectors from '../components/movie-directors';
import MovieOverview from '@/features/movie/components/movie-overview';
import MovieProviders from '../components/movie-providers';
import MediaActions from '@/features/media/components/media-actions/media-actions';
import { getTrailer } from '@/entities/media/media.utils';

type Props = {
    movie: MovieDetail;
    width: number;
    countryCode: string;
    initialComment: string | null;
    onSaveComment: (comment: string | null) => void;
};
export default function HeroSection({
    movie,
    width,
    countryCode,
    initialComment,
    onSaveComment,
}: Props) {
    return (
        <section className="h-[calc(100vh-7.5rem)] w-full flex gap-2 px-10">
            <div className="flex-1/3 flex justify-center items-center">
                <MovieCard movie={movie} width={width} />
            </div>

            <div className="flex-2/3 flex justify-center items-center">
                <div
                    style={{ height: `${width * 1.5}px` }}
                    className="w-full flex flex-col justify-between"
                >
                    <div className="flex flex-col gap-2">
                        <H1>{movie.title}</H1>
                        <MovieMetadata
                            genres={movie.genres}
                            releaseDate={getReleaseDate(movie, countryCode)}
                            duration={getRuntimeString(movie.runtime)}
                            voteAverage={getVoteAverage(movie.voteAverage)}
                        />
                        <MovieDirectors movie={movie} />
                        <Lead>{movie.tagline}</Lead>
                        <MovieOverview movie={movie} />
                        <MediaActions
                            initialActions={{
                                video: getTrailer(movie.videos),
                                isFavorite: false,
                                isWatchlist: false,
                                isWatched: false,
                                isTheatreWatched: false,
                                listIds: [],
                                comment: initialComment,
                            }}
                            onSaveComment={onSaveComment}
                        />
                    </div>

                    <MovieProviders movie={movie} countryCode={countryCode} />
                </div>
            </div>
        </section>
    );
}
