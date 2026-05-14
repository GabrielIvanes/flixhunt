import { TMDBResponse } from '@/types/tmdb-interfaces';
import { getRandomNumber } from '@/shared/lib/random';
import { MovieSummary } from '@/types/movie-interfaces';
import { getTheatreMovies } from '@/lib/movies';
import { H1, MutedP } from '@/shared/ui/typography';
import PointSeparator from '@/shared/ui/point-separator';
import Image from 'next/image';

export default async function HeroSection() {
    const theatreMovies: TMDBResponse<MovieSummary> = await getTheatreMovies();
    const randomNumber = getRandomNumber(theatreMovies.results.length);
    const randomMovie: MovieSummary = theatreMovies.results[randomNumber];

    const releaseDate = randomMovie.release_date
        ? randomMovie.release_date.split('-')[0]
        : '';
    const voteAverage = randomMovie.vote_average?.toPrecision(2);

    return (
        <div className="h-[50vh] mx-10 flex relative gap-2">
            <div className="relative flex-1">
                <H1 text={randomMovie.title} classname="text-6xl" />
                <div className="flex items-center gap-1 mb-2">
                    {releaseDate && (
                        <div className="flex gap-1">
                            <MutedP text={releaseDate} classname="text-base!" />
                        </div>
                    )}
                    {voteAverage && (
                        <div className="flex items-center gap-1">
                            {releaseDate && <PointSeparator />}
                            <MutedP
                                text={`${voteAverage}/10`}
                                classname="text-base!"
                            />
                        </div>
                    )}
                </div>
                <div className="text-xl">{randomMovie.overview}</div>
            </div>
            <div className="w-[60%] relative">
                <Image
                    src={`${configuration.images.secure_base_url}w1280${randomMovie.backdrop_path}`}
                    alt={randomMovie.title}
                    fill={true}
                    className="object-cover"
                />
            </div>
        </div>
    );
}
