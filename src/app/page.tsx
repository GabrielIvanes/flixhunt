import { Configuration, TMDBResponse } from '@/types/tmdb-interfaces';
import { getConfiguration } from '@/lib/tmdb';
import {
    getPopularMovies,
    getTheatreMovies,
    getTrendingMovies,
} from '@/lib/movies';
import { mediaToElement } from '@/lib/utils';
import { Element as ElementInterface } from '@/types/global-interfaces';
import { MovieSummary } from '@/types/movie-interfaces';
import { CarouselList } from '@/components/carousel';
import { TvshowSummary } from '@/types/tvshow-interfaces';
import { getPopularTvshows, getTrendingTvshows } from '@/lib/tvshows';
import Image from 'next/image';
import { H1, MutedP } from '@/components/ui/typography';
import PointSeparator from '@/components/ui/point-separator';

export default async function Home() {
    const configuration: Configuration = await getConfiguration();
    console.log(configuration);
    const popularMovies: TMDBResponse<MovieSummary> = await getPopularMovies();
    const theatreMovies: TMDBResponse<MovieSummary> = await getTheatreMovies();
    const trendingMovies: TMDBResponse<MovieSummary> =
        await getTrendingMovies();
    const popularTvshows: TMDBResponse<TvshowSummary> =
        await getPopularTvshows();
    const trendingTvshows: TMDBResponse<TvshowSummary> =
        await getTrendingTvshows();

    const popularMoviesElements: ElementInterface[] = popularMovies.results.map(
        (movie) =>
            mediaToElement(
                movie.id,
                movie.title,
                movie.poster_path
                    ? `${configuration.images.secure_base_url}w500${movie.poster_path}`
                    : '',
                'movie',
                175,
                175 * 1.5,
                '',
                '',
                true
            )
    );
    const theatreMoviesElements: ElementInterface[] = theatreMovies.results.map(
        (movie) =>
            mediaToElement(
                movie.id,
                movie.title,
                movie.poster_path
                    ? `${configuration.images.secure_base_url}w500${movie.poster_path}`
                    : '',
                'movie',
                175,
                175 * 1.5,
                '',
                '',
                true
            )
    );
    const trendingTvshowsElements: ElementInterface[] =
        trendingTvshows.results.map((tvshow) =>
            mediaToElement(
                tvshow.id,
                tvshow.name,
                tvshow.poster_path
                    ? `${configuration.images.secure_base_url}w500${tvshow.poster_path}`
                    : '',
                'tv',
                175,
                175 * 1.5,
                '',
                '',
                true
            )
        );
    const popularTvshowsElements: ElementInterface[] =
        popularTvshows.results.map((tvshow) =>
            mediaToElement(
                tvshow.id,
                tvshow.name,
                tvshow.poster_path
                    ? `${configuration.images.secure_base_url}w500${tvshow.poster_path}`
                    : '',
                'tv',
                175,
                175 * 1.5,
                '',
                '',
                true
            )
        );
    const trendingMoviesElements: ElementInterface[] =
        trendingMovies.results.map((movie) =>
            mediaToElement(
                movie.id,
                movie.title,
                movie.poster_path
                    ? `${configuration.images.secure_base_url}w500${movie.poster_path}`
                    : '',
                'movie',
                175,
                175 * 1.5,
                '',
                '',
                true
            )
        );

    const randomNumber = Math.floor(
        Math.random() * theatreMovies.results.length
    );
    const randomMovie: MovieSummary = theatreMovies.results[randomNumber];
    const releaseDate = randomMovie.release_date
        ? randomMovie.release_date.split('-')[0]
        : '';
    const voteAverage = randomMovie.vote_average?.toPrecision(2);

    return (
        <div className="flex flex-col gap-10 mt-30 mb-5">
            <div className="h-[50vh] mx-10 flex relative gap-2">
                <div className="relative flex-1">
                    <H1 text={randomMovie.title} classname="text-6xl" />
                    <div className="flex items-center gap-1 mb-2">
                        {releaseDate && (
                            <div className="flex gap-1">
                                <MutedP
                                    text={releaseDate}
                                    classname="text-base!"
                                />
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
            <CarouselList
                elements={theatreMoviesElements}
                title="Theatre Movies"
                loop={true}
            />
            <CarouselList
                elements={trendingTvshowsElements}
                title="Trending TV Shows this week"
                loop={true}
            />
            <CarouselList
                elements={trendingMoviesElements}
                title="Trending Movies this week"
                loop={true}
            />
            <CarouselList
                elements={popularTvshowsElements}
                title="Popular TV Shows"
                loop={true}
            />
            <CarouselList
                elements={popularMoviesElements}
                title="Popular Movies"
                loop={true}
            />
        </div>
    );
}
